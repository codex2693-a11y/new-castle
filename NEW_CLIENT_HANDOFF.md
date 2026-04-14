# New Castle Client Handoff

## Client identity
- Owner: شريف الفسخاني
- Brand Arabic: نيو كاسل
- Brand English: New Castle
- Business type: محل موبايلا
- Folder: E:\projects\شريف الفسخاني

## Branding and app config
- client.config.json updated for New Castle
- Mobile app id: com.newcastle.mobilya
- Desktop app id: com.newcastle.mobilya.desktop
- Build completed successfully in the client copy

## Supabase status
Configured in .env.local:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

Executed successfully on Supabase:
1. supabase_migration.sql
2. supabase_orders_compat_fix.sql
3. supabase_branch_isolation.sql
4. supabase_profiles_timeout_fix.sql
5. supabase_security_hardening.sql

Not executed successfully:
- import_products.sql
Reason: it references legacy columns that do not exist in the current products schema.

## Test accounts created and verified
- Admin: admin@newcastle.local
- Seller: seller@newcastle.local
- Cashier: cashier@newcastle.local
- Login verified successfully for all three accounts

## Remaining task before deployment
Update these values in .env.local when the final public URL is ready:
- VITE_APP_URL
- APP_URL

## Suggested next step
- Replace the placeholder app URL with the final deployed domain and rebuild if needed