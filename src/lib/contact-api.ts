// Sends a contact request to the contact Lambda (repository bck-contact-lambda).
//
// PUBLIC_CONTACT_ENDPOINT is read at build time (from .env locally, or from the repository variable
// in the GitHub Actions workflow). The form data is POSTed there as JSON and any 2xx counts as sent.
// Without it, `npm run dev` simulates the request and logs it to the console, and a production build
// reports an error, so a message is never silently lost.

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  services: string[];
  eventDate?: string;
  location?: string;
  guests?: string;
  message: string;
  consent: boolean;
}

export type ContactResult = { ok: true } | { ok: false; error: string };

const ENDPOINT = import.meta.env.PUBLIC_CONTACT_ENDPOINT as string | undefined;
const MOCK_DELAY_MS = 900;
const TIMEOUT_MS = 15_000;

export async function sendContactRequest(data: ContactRequest): Promise<ContactResult> {
  if (ENDPOINT) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        // Nothing of the visitor's goes along but the form: no cookies, no page address
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      return res.ok ? { ok: true } : { ok: false, error: `HTTP ${res.status}` };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'network' };
    }
  }

  if (import.meta.env.PROD) return { ok: false, error: 'PUBLIC_CONTACT_ENDPOINT is not set' };

  // Mock: wait like a real request would. An email ending in @fallo.test simulates a failure,
  // so the error state can be checked without a backend.
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  if (data.email.toLowerCase().endsWith('@fallo.test')) return { ok: false, error: 'mock failure' };
  console.info('[contact mock] Solicitud que se enviaría por email:', data);
  return { ok: true };
}
