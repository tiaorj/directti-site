create or replace function public.set_leads_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at
  on public.leads;

create trigger leads_set_updated_at
before update
  on public.leads
for each row
execute function public.set_leads_updated_at();