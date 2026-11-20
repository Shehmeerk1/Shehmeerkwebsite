# Lead capture and delivery

Every form posts to `POST /api/leads`. The server validates the submission, records consent, tags it, and passes it to the store.

## Where leads go

| Situation | Result |
|---|---|
| `LEADS_WEBHOOK_URL` is set | The lead is POSTed as JSON to that URL. The form confirms only if the webhook answers with a 2xx status. |
| Local development, no webhook | Appended to `.data/leads.jsonl` (git-ignored) so you can test. |
| Production, no webhook | The submission is **refused** and the form says it is not connected. Nothing is silently dropped. |

This has been tested locally with the file store. **No webhook, CRM or email service has been connected or tested**, because that needs your accounts.

## Connecting a CRM or email tool

Point `LEADS_WEBHOOK_URL` at any of:

- A Zapier, Make or n8n webhook that creates the contact in your CRM (Follow Up Boss, kvCORE, HubSpot) and adds them to your email tool (Mailchimp, ConvertKit, Resend audiences).
- Your CRM's own inbound webhook, if it accepts JSON.

Set `LEADS_WEBHOOK_SECRET` to have the site send an `x-leads-secret` header your automation can check.

## Payload

```json
{
  "id": "uuid",
  "receivedAt": "2026-11-16T01:14:10.000Z",
  "kind": "investor",
  "pipeline": "investor",
  "tags": ["kind:investor", "pipeline:investor", "interest:multifamily", "newsletter:opted-in"],
  "source": "/invest",
  "name": "…", "email": "…", "phone": null, "message": null,
  "extras": { "investorType": "An individual", "interests": ["Multifamily"] },
  "consent": { "contact": true, "marketing": true, "recordedAt": "…", "wording": "…" }
}
```

## How leads are kept apart

| Form | `kind` | `pipeline` |
|---|---|---|
| Contact: buying or selling | `buy-sell` | `real-estate` |
| Home valuation | `valuation` | `real-estate` |
| Listing question | `property-inquiry` | `real-estate` |
| Showing request | `showing-request` | `real-estate` |
| Investor inquiry (investor page, or contact topic "investing") | `investor` | `investor` |
| Marketing and business | `marketing` | `marketing` |
| General | `general` | `general` |
| Free resource sign-up | `resource` | `audience` |

Tags add detail: `resource:<slug>`, `listing:<id>`, `intent:buy`, `interest:multifamily`, `newsletter:opted-in`. `source` is the page the form was on. Route on `pipeline` in your automation to keep investor leads out of the buyer inbox.

## Consent

- The contact checkbox is required. Its wording and timestamp are stored with the lead.
- The newsletter checkbox is optional and unticked by default. Only send marketing email to leads tagged `newsletter:opted-in`.
- Include an unsubscribe link in every marketing email (CAN-SPAM). If you text or auto-dial leads, get separate written consent (TCPA); this site does not collect it.

## Protection

Server-side validation (zod), a honeypot field, a same-origin check, and a per-instance rate limit. For production traffic add a proper rate limiter or bot check (Vercel WAF, Cloudflare Turnstile).

## Resource downloads

After a resource sign-up is stored, the API returns a link signed with `LEAD_TOKEN_SECRET` that works for 24 hours. Set that secret in production or no download link is issued. The site does not send email; delivery by email is something to add in your automation.
