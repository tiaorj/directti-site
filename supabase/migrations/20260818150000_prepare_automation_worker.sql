alter table public.automation_outbox
  add column if not exists dedupe_key varchar(200),
  add column if not exists locked_at timestamptz,
  add column if not exists lease_token uuid;

alter table public.automation_outbox
  alter column next_attempt_at drop not null;

create unique index if not exists
  automation_outbox_dedupe_key_uidx
  on public.automation_outbox (dedupe_key);


/*
 * Migração dos antigos LEAD_CREATED da Fase 2A
 * para eventos específicos por canal.
 */
insert into public.automation_outbox (
  lead_id,
  event_type,
  dedupe_key,
  payload
)
select
  old_event.lead_id,
  new_event.event_type,
  old_event.lead_id::text
    || ':'
    || new_event.event_type,
  jsonb_build_object(
    'lead_id',
    old_event.lead_id
  )
from public.automation_outbox old_event
cross join (
  values
    ('LEAD_INTERNAL_EMAIL'),
    ('LEAD_INTERNAL_WHATSAPP'),
    ('LEAD_CONFIRMATION_EMAIL')
) as new_event(event_type)
where old_event.event_type = 'LEAD_CREATED'
  and old_event.status in (
    'PENDING',
    'FAILED'
  )
on conflict (dedupe_key)
do nothing;


update public.automation_outbox
set
  status = 'COMPLETED',
  processed_at = now(),
  next_attempt_at = null,
  last_error =
    'Evento legado substituído pelos eventos da Fase 2B.'
where event_type = 'LEAD_CREATED'
  and status in (
    'PENDING',
    'FAILED'
  );


/*
 * Novo comportamento ao criar lead.
 */
create or replace function public.handle_new_lead()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.lead_activities (
    lead_id,
    activity_type,
    to_status,
    description
  )
  values (
    new.id,
    'CREATED',
    new.status,
    'Lead recebido'
  );

  insert into public.automation_outbox (
    lead_id,
    event_type,
    dedupe_key,
    payload
  )
  values
    (
      new.id,
      'LEAD_INTERNAL_EMAIL',
      new.id::text
        || ':LEAD_INTERNAL_EMAIL',
      jsonb_build_object(
        'lead_id',
        new.id
      )
    ),
    (
      new.id,
      'LEAD_INTERNAL_WHATSAPP',
      new.id::text
        || ':LEAD_INTERNAL_WHATSAPP',
      jsonb_build_object(
        'lead_id',
        new.id
      )
    ),
    (
      new.id,
      'LEAD_CONFIRMATION_EMAIL',
      new.id::text
        || ':LEAD_CONFIRMATION_EMAIL',
      jsonb_build_object(
        'lead_id',
        new.id
      )
    )
  on conflict (dedupe_key)
  do nothing;

  return new;
end;
$$;

drop trigger if exists leads_after_insert
  on public.leads;

create trigger leads_after_insert
after insert
  on public.leads
for each row
execute function public.handle_new_lead();

create or replace function public.claim_automation_outbox(
  p_limit integer default 5
)
returns table (
  outbox_id uuid,
  lease_token uuid,
  event_type text,
  attempts integer,

  lead_id uuid,
  name text,
  company text,
  email text,
  interest text,
  message text,

  source_path text,

  utm_source text,
  utm_medium text,
  utm_campaign text
)
language plpgsql
security definer
set search_path = ''
as $$
begin
  return query

  with candidates as (
    select ao.id
    from public.automation_outbox ao
    where
      ao.attempts < 5
      and (
        (
          ao.status in (
            'PENDING',
            'FAILED'
          )
          and ao.next_attempt_at is not null
          and ao.next_attempt_at <= now()
        )
        or
        (
          ao.status = 'PROCESSING'
          and (
            ao.locked_at is null
            or ao.locked_at
              <= now() - interval '10 minutes'
          )
        )
      )
    order by ao.created_at
    for update skip locked
    limit greatest(
      1,
      least(
        coalesce(p_limit, 5),
        10
      )
    )
  ),

  claimed as (
    update public.automation_outbox ao
    set
      status = 'PROCESSING',
      attempts = ao.attempts + 1,
      locked_at = now(),
      lease_token = gen_random_uuid(),
      last_error = null
    from candidates c
    where ao.id = c.id
    returning ao.*
  )

  select
    c.id,
    c.lease_token,
    c.event_type::text,
    c.attempts,

    l.id,
    l.name::text,
    l.company::text,
    l.email::text,
    l.interest::text,
    l.message,

    l.source_path::text,

    l.utm_source::text,
    l.utm_medium::text,
    l.utm_campaign::text

  from claimed c
  join public.leads l
    on l.id = c.lead_id

  order by c.created_at;
end;
$$;

revoke all
on function public.claim_automation_outbox(integer)
from public, anon, authenticated;

grant execute
on function public.claim_automation_outbox(integer)
to service_role;

create or replace function public.complete_automation_outbox(
  p_outbox_id uuid,
  p_lease_token uuid,
  p_channel text default null
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_lead_id uuid;
  v_event_type text;
  v_activity_type public.lead_activity_type;
begin
  update public.automation_outbox ao
  set
    status = 'COMPLETED',
    processed_at = now(),
    next_attempt_at = null,
    last_error = null,
    locked_at = null,
    lease_token = null
  where ao.id = p_outbox_id
    and ao.status = 'PROCESSING'
    and ao.lease_token = p_lease_token
  returning
    ao.lead_id,
    ao.event_type
  into
    v_lead_id,
    v_event_type;

  if not found then
    return false;
  end if;

  v_activity_type :=
    case
      when v_event_type =
        'LEAD_INTERNAL_WHATSAPP'
      then 'WHATSAPP_SENT'
        ::public.lead_activity_type

      when v_event_type in (
        'LEAD_INTERNAL_EMAIL',
        'LEAD_CONFIRMATION_EMAIL'
      )
      then 'EMAIL_SENT'
        ::public.lead_activity_type

      else
        'AUTOMATION_COMPLETED'
        ::public.lead_activity_type
    end;

  insert into public.lead_activities (
    lead_id,
    activity_type,
    channel,
    description,
    metadata
  )
  values (
    v_lead_id,
    v_activity_type,
    p_channel,
    'Automação concluída',
    jsonb_build_object(
      'event_type',
      v_event_type
    )
  );

  return true;
end;
$$;

revoke all
on function public.complete_automation_outbox(
  uuid,
  uuid,
  text
)
from public, anon, authenticated;

grant execute
on function public.complete_automation_outbox(
  uuid,
  uuid,
  text
)
to service_role;

create or replace function public.fail_automation_outbox(
  p_outbox_id uuid,
  p_lease_token uuid,
  p_error text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_lead_id uuid;
  v_event_type text;
  v_attempts integer;
  v_next_attempt_at timestamptz;
begin
  update public.automation_outbox ao
  set
    status = 'FAILED',

    next_attempt_at =
      case ao.attempts
        when 1 then
          now() + interval '1 minute'

        when 2 then
          now() + interval '5 minutes'

        when 3 then
          now() + interval '15 minutes'

        when 4 then
          now() + interval '60 minutes'

        else
          null
      end,

    last_error = left(
      coalesce(
        p_error,
        'UNKNOWN_AUTOMATION_ERROR'
      ),
      1000
    ),

    locked_at = null,
    lease_token = null

  where ao.id = p_outbox_id
    and ao.status = 'PROCESSING'
    and ao.lease_token = p_lease_token

  returning
    ao.lead_id,
    ao.event_type,
    ao.attempts,
    ao.next_attempt_at

  into
    v_lead_id,
    v_event_type,
    v_attempts,
    v_next_attempt_at;

  if not found then
    return false;
  end if;

  insert into public.lead_activities (
    lead_id,
    activity_type,
    description,
    metadata
  )
  values (
    v_lead_id,
    'AUTOMATION_FAILED',
    'Falha na automação',
    jsonb_build_object(
      'event_type',
      v_event_type,
      'attempt',
      v_attempts,
      'retry_at',
      v_next_attempt_at
    )
  );

  return true;
end;
$$;

revoke all
on function public.fail_automation_outbox(
  uuid,
  uuid,
  text
)
from public, anon, authenticated;

grant execute
on function public.fail_automation_outbox(
  uuid,
  uuid,
  text
)
to service_role;