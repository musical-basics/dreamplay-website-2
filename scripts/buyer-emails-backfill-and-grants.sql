-- buyer_emails: backfill + write grants
-- Run in the Supabase SQL editor for project tqhfpcdqxylrknwbrqqi (DreamPlay website).
--
-- WHY: the buyer_emails allowlist gates the /my-reservation buyer portal.
--   1. 14 active DreamPlay buyers (tagged "Purchased" in the email DB) were
--      missing from this allowlist, so they'd be bounced to /vip on login.
--   2. Writes to buyer_emails are currently denied to the service role
--      ("permission denied for table buyer_emails"), which blocks both this
--      backfill and the new Shopify order webhook
--      (src/app/api/webhooks/shopify/orders/route.ts) from auto-adding buyers.
--
-- Safe to re-run: the INSERT uses ON CONFLICT DO NOTHING.

-- 1) Allow the service role (used by the webhook + server actions) to write.
GRANT INSERT, UPDATE ON TABLE public.buyer_emails TO service_role;

-- 2) Backfill the 14 missing active buyers (deduped on email).
INSERT INTO public.buyer_emails (email, notes) VALUES
  ('jhounds99@gmail.com',        'Nicholas Lujan — backfill from Purchased tag 2026-06-17'),
  ('jetammo@gmail.com',          'Jay Toma — backfill from Purchased tag 2026-06-17'),
  ('rebecca.koebbe@gmail.com',   'Rebecca Koebbe — backfill from Purchased tag 2026-06-17'),
  ('paulhuang@mindspring.com',   'Paul Huang — backfill from Purchased tag 2026-06-17'),
  ('andrew.kerr52@gmail.com',    'Andrew Kerr — backfill from Purchased tag 2026-06-17'),
  ('do21507@comcast.net',        'Jin Do — backfill from Purchased tag 2026-06-17'),
  ('frannielcl@hotmail.com',     'Frances Chamberlain — backfill from Purchased tag 2026-06-17'),
  ('kludwisz@gmail.com',         'Krzysztof Ludwiszewski — backfill from Purchased tag 2026-06-17'),
  ('rongcnye@gmail.com',         'Rong Ye — backfill from Purchased tag 2026-06-17'),
  ('kylixir2011@gmail.com',      'Sonata Bravura — backfill from Purchased tag 2026-06-17'),
  ('mrogow62@gmail.com',         'Moira Rogow — backfill from Purchased tag 2026-06-17'),
  ('cthornber@gmail.com',        'Collin Thornber — backfill from Purchased tag 2026-06-17'),
  ('medlinel65@gmail.com',       'Elizabeth Medlin — backfill from Purchased tag 2026-06-17'),
  ('jrtill@internode.on.net',    'Jon Robin Till — backfill from Purchased tag 2026-06-17')
ON CONFLICT (email) DO NOTHING;

-- 3) Verify.
SELECT count(*) AS buyer_emails_total FROM public.buyer_emails;
