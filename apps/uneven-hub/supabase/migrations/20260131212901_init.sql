create table if not exists public.apps (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  url text not null,
  description text not null,
  thumbnail_path text not null,
  tags text[] default '{}',
  created_at timestamptz not null default now()
);

alter table public.apps
  add constraint apps_owner_fk
  foreign key (owner_id) references auth.users (id) on delete cascade;

alter table public.apps enable row level security;

create policy "public read apps"
on public.apps
for select
to public
using (true);

create policy "authenticated insert apps"
on public.apps
for insert
to authenticated
with check (auth.uid() = owner_id);

create policy "owner update apps"
on public.apps
for update
to authenticated
using (auth.uid() = owner_id);

create policy "owner delete apps"
on public.apps
for delete
to authenticated
using (auth.uid() = owner_id);

create policy "public read thumbnails"
on storage.objects
for select
to public
using (bucket_id = 'app-thumbnails');

create policy "authenticated upload thumbnails"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'app-thumbnails');
