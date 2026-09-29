create table public.post_views (
  slug text primary key,
  view_count bigint not null default 0 check (view_count >= 0),
  updated_at timestamptz not null default now(),
  constraint post_views_slug_format check (
    char_length(slug) between 1 and 120
    and slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
  )
);

alter table public.post_views enable row level security;

revoke all on table public.post_views from anon, authenticated;
grant select on table public.post_views to anon, authenticated;

create policy "View counts are publicly readable"
on public.post_views
for select
to anon, authenticated
using (true);

create or replace function public.increment_post_view(post_slug text)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_count bigint;
begin
  if post_slug is null
    or char_length(post_slug) not between 1 and 120
    or post_slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$'
  then
    raise exception 'Invalid post slug' using errcode = '22023';
  end if;

  insert into public.post_views (slug, view_count)
  values (post_slug, 1)
  on conflict (slug)
  do update set
    view_count = public.post_views.view_count + 1,
    updated_at = now()
  returning view_count into new_count;

  return new_count;
end;
$$;

revoke all on function public.increment_post_view(text) from public;
grant execute on function public.increment_post_view(text) to anon, authenticated;
