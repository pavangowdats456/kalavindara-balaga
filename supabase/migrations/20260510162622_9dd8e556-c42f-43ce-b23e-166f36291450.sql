-- Role enum
create type public.app_role as enum ('artist', 'customer');

-- user_roles table
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

-- Security definer role check
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view their own roles"
  on public.user_roles for select
  using (auth.uid() = user_id);

-- profiles table
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  role app_role not null default 'customer',
  full_name text,
  led_by text,
  category text,
  city text,
  bio text,
  hourly_rate numeric,
  years_experience int,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = user_id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = user_id);

-- event_photos table
create table public.event_photos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  photo_url text not null,
  caption text,
  created_at timestamptz not null default now()
);
alter table public.event_photos enable row level security;

create policy "Event photos are viewable by everyone"
  on public.event_photos for select using (true);

create policy "Users can insert their own event photos"
  on public.event_photos for insert with check (auth.uid() = user_id);

create policy "Users can update their own event photos"
  on public.event_photos for update using (auth.uid() = user_id);

create policy "Users can delete their own event photos"
  on public.event_photos for delete using (auth.uid() = user_id);

-- updated_at trigger function
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

-- handle_new_user trigger: create profile and role on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  _role app_role;
begin
  _role := coalesce((new.raw_user_meta_data ->> 'role')::app_role, 'customer');

  insert into public.profiles (user_id, role, full_name)
  values (
    new.id,
    _role,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email)
  );

  insert into public.user_roles (user_id, role)
  values (new.id, _role)
  on conflict do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Storage buckets
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
insert into storage.buckets (id, name, public) values ('event-photos', 'event-photos', true);

create policy "Avatars are publicly accessible"
  on storage.objects for select using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can update their own avatar"
  on storage.objects for update
  using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Event photos are publicly accessible"
  on storage.objects for select using (bucket_id = 'event-photos');

create policy "Users can upload their own event photos"
  on storage.objects for insert
  with check (bucket_id = 'event-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can update their own event photos"
  on storage.objects for update
  using (bucket_id = 'event-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete their own event photos"
  on storage.objects for delete
  using (bucket_id = 'event-photos' and auth.uid()::text = (storage.foldername(name))[1]);