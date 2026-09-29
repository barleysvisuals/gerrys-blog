revoke select on table public.post_views from authenticated;
revoke execute on function public.increment_post_view(text) from authenticated;

drop policy if exists "View counts are publicly readable" on public.post_views;

create policy "View counts are publicly readable"
on public.post_views
for select
to anon
using (true);
