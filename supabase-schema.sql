create table if not exists public.watch_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.watch_progress enable row level security;

create policy "Users can read their own watch progress"
on public.watch_progress for select
using (auth.uid() = user_id);

create policy "Users can insert their own watch progress"
on public.watch_progress for insert
with check (auth.uid() = user_id);

create policy "Users can update their own watch progress"
on public.watch_progress for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
