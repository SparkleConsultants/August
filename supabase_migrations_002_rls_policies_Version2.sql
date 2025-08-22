alter table public.profiles enable row level security;
alter table public.drivers enable row level security;
alter table public.bookings enable row level security;
alter table public.payments enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can view their own bookings"
  on public.bookings for select using (auth.uid() = user_id);

create policy "Drivers can view assigned bookings"
  on public.bookings for select using (
    exists (
      select 1 from public.drivers d
      where d.id = bookings.driver_id and d.user_id = auth.uid()
    )
  );

create policy "Users can view their own payments"
  on public.payments for select using (auth.uid() = user_id);