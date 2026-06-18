-- Remove a refunded buyer from the portal allowlist.
-- Run in the Supabase SQL editor for project tqhfpcdqxylrknwbrqqi (DreamPlay website).
--
-- Context: Elizabeth Medlin (medlinel65@gmail.com), order #1112, was refunded
-- $499.00 on 2026-06-18. Her `Purchased` tag is already removed in the email DB;
-- this removes her /my-reservation portal access. The service role only has
-- INSERT/UPDATE on buyer_emails (no DELETE), so this must run here.

DELETE FROM public.buyer_emails WHERE email = 'medlinel65@gmail.com';

-- Optional: grant DELETE so future refund cleanups can run from the app/service role.
-- GRANT DELETE ON TABLE public.buyer_emails TO service_role;

SELECT count(*) AS buyer_emails_total FROM public.buyer_emails;
