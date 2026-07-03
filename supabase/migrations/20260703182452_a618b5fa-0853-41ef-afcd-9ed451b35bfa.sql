
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;

-- Rewrite the public insert policy with sensible length caps to prevent abuse
DROP POLICY "anyone can submit lead" ON public.leads;
CREATE POLICY "anyone can submit lead" ON public.leads
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 200
  AND char_length(message) BETWEEN 1 AND 4000
  AND (company IS NULL OR char_length(company) <= 200)
  AND (phone IS NULL OR char_length(phone) <= 40)
);
