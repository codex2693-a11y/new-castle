alter table if exists public.products
  add column if not exists imei text,
  add column if not exists serial_number text;

create index if not exists products_imei_idx on public.products(imei);
create index if not exists products_serial_number_idx on public.products(serial_number);
