-- Add equipment column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS equipment text;

-- Create phone_otp table
CREATE TABLE IF NOT EXISTS public.phone_otp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  code_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  attempts int NOT NULL DEFAULT 0,
  consumed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_phone_otp_phone ON public.phone_otp(phone);
CREATE INDEX IF NOT EXISTS idx_phone_otp_expires ON public.phone_otp(expires_at);

ALTER TABLE public.phone_otp ENABLE ROW LEVEL SECURITY;

-- No public policies: only service role (edge functions) can access
