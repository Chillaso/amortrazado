// Sends a contact request. There is no backend yet, so this is mocked.
//
// To connect a real backend, set PUBLIC_CONTACT_ENDPOINT at build time (for example in .env or in the
// GitHub Actions workflow). The form data is then POSTed there as JSON and the endpoint should
// answer 2xx on success. Without it, the request is simulated and logged to the console.

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

export async function sendContactRequest(data: ContactRequest): Promise<ContactResult> {
  if (ENDPOINT) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.ok ? { ok: true } : { ok: false, error: `HTTP ${res.status}` };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'network' };
    }
  }

  // Mock: wait like a real request would. An email ending in @fallo.test simulates a failure,
  // so the error state can be checked without a backend.
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
  if (data.email.toLowerCase().endsWith('@fallo.test')) return { ok: false, error: 'mock failure' };
  console.info('[contact mock] Solicitud que se enviaría por email:', data);
  return { ok: true };
}
