create type public.lead_status as enum (
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'PROPOSAL',
  'WON',
  'LOST',
  'SPAM'
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  status public.lead_status not null default 'NEW',

  name varchar(120) not null,
  company varchar(160),
  email varchar(254) not null,

  interest varchar(120) not null,
  message text not null,

  source_type varchar(50) not null default 'contact_form',
  source_path varchar(500),
  referrer varchar(1000),

  utm_source varchar(200),
  utm_medium varchar(200),
  utm_campaign varchar(200),
  utm_content varchar(200),
  utm_term varchar(200),

  constraint leads_name_length_check
    check (
      char_length(btrim(name))
      between 2 and 120
    ),

  constraint leads_email_length_check
    check (
      char_length(btrim(email))
      between 5 and 254
    ),

  constraint leads_interest_length_check
    check (
      char_length(btrim(interest))
      between 2 and 120
    ),

  constraint leads_message_length_check
    check (
      char_length(btrim(message))
      between 10 and 5000
    )
);

create index leads_created_at_idx
  on public.leads (created_at desc);

create index leads_status_created_at_idx
  on public.leads (status, created_at desc);

create index leads_email_lower_idx
  on public.leads (lower(email));

alter table public.leads
  enable row level security;

revoke all
  on table public.leads
  from anon, authenticated;

grant select, insert, update, delete
  on table public.leads
  to service_role;

comment on table public.leads is
  'Leads comerciais captados pelos canais digitais da DIRECT TI.';