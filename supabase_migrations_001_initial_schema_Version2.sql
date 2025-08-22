create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  wallet_balance numeric default 0,
  is_verified boolean default false,
  emergency_contacts jsonb,
  created_at timestamptz default now()
);

create table public.drivers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  license_number text,
  vehicle_info jsonb,
  is_verified boolean default false,
  rating numeric default 5,
  location geography(Point, 4326),
  last_active timestamptz default now()
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  driver_id uuid references public.drivers(id),
  service_type text not null check (service_type in ('ride', 'flight', 'pmv', 'accommodation', 'freight')),
  status text default 'pending',
  pickup_address text,
  pickup_coordinates geography(Point, 4326),
  destination_address text,
  destination_coordinates geography(Point, 4326),
  pickup_time timestamptz,
  passenger_count int,
  vehicle_type text,
  fare numeric,
  payment_status text default 'unpaid',
  created_at timestamptz default now(),
  meta jsonb
);

create table public.pmv_routes (
  id uuid primary key default gen_random_uuid(),
  name text,
  stops jsonb,
  is_active boolean default true
);

create table public.flights (
  id uuid primary key default gen_random_uuid(),
  airline text,
  departure_airport text,
  arrival_airport text,
  departure_time timestamptz,
  arrival_time timestamptz,
  is_active boolean default true
);

create table public.accommodations (
  id uuid primary key default gen_random_uuid(),
  name text,
  location text,
  room_types jsonb,
  is_active boolean default true
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id),
  user_id uuid,
  amount numeric,
  status text default 'pending',
  method text,
  created_at timestamptz default now()
);