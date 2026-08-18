create type public.lead_activity_type as enum (
  'CREATED',
  'STATUS_CHANGED',
  'NOTE_ADDED',
  'EMAIL_SENT',
  'WHATSAPP_SENT',
  'AUTOMATION_STARTED',
  'AUTOMATION_COMPLETED',
  'AUTOMATION_FAILED'
);

create type public.automation_status as enum (
  'PENDING',
  'PROCESSING',
  'COMPLETED',
  'FAILED'
);

alter table public.leads
  add column first_contact_at timestamptz,
  add column qualified_at timestamptz,
  add column proposal_at timestamptz,
  add column closed_at timestamptz,
  add column lost_reason varchar(500);

create index leads_first_contact_at_idx
  on public.leads (first_contact_at);

create table public.lead_activities (
  id uuid primary key default gen_random_uuid(),

  lead_id uuid not null
    references public.leads(id)
    on delete cascade,

  created_at timestamptz not null
    default now(),

  activity_type public.lead_activity_type
    not null,

  from_status public.lead_status,
  to_status public.lead_status,

  channel varchar(50),

  description text,

  metadata jsonb not null
    default '{}'::jsonb
);

create index lead_activities_lead_created_idx
  on public.lead_activities (
    lead_id,
    created_at desc
  );

create table public.automation_outbox (
  id uuid primary key default gen_random_uuid(),

  lead_id uuid
    references public.leads(id)
    on delete cascade,

  created_at timestamptz not null
    default now(),

  updated_at timestamptz not null
    default now(),

  event_type varchar(100) not null,

  status public.automation_status
    not null
    default 'PENDING',

  attempts integer not null
    default 0,

  next_attempt_at timestamptz
    not null
    default now(),

  processed_at timestamptz,

  last_error text,

  payload jsonb not null
    default '{}'::jsonb,

  constraint automation_outbox_attempts_check
    check (attempts >= 0)
);

create index automation_outbox_pending_idx
  on public.automation_outbox (
    status,
    next_attempt_at
  );

create index automation_outbox_lead_idx
  on public.automation_outbox (
    lead_id,
    created_at desc
  );

alter table public.lead_activities
  enable row level security;

alter table public.automation_outbox
  enable row level security;

revoke all
  on table public.lead_activities
  from anon, authenticated;

revoke all
  on table public.automation_outbox
  from anon, authenticated;

grant select, insert, update, delete
  on table public.lead_activities
  to service_role;

grant select, insert, update, delete
  on table public.automation_outbox
  to service_role;

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
    payload
  )
  values (
    new.id,
    'LEAD_CREATED',
    jsonb_build_object(
      'lead_id',
      new.id
    )
  );

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

create or replace function public.set_automation_outbox_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();

  return new;
end;
$$;

drop trigger if exists automation_outbox_set_updated_at
  on public.automation_outbox;

create trigger automation_outbox_set_updated_at
before update
  on public.automation_outbox
for each row
execute function public.set_automation_outbox_updated_at();