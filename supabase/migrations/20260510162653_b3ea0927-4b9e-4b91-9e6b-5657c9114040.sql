-- Tighten storage SELECT: only allow direct file access by name, not listing all
drop policy if exists "Avatars are publicly accessible" on storage.objects;
drop policy if exists "Event photos are publicly accessible" on storage.objects;

create policy "Avatars accessible by direct path"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'avatars' and name is not null);

create policy "Event photos accessible by direct path"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'event-photos' and name is not null);

-- Revoke public/anon execute on security definer functions
revoke execute on function public.has_role(uuid, app_role) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.update_updated_at_column() from public, anon, authenticated;