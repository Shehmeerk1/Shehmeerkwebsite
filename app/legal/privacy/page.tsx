import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = { title: "Privacy notice", alternates: { canonical: "/legal/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice" updated="November 2026">
      <p>This notice explains what this website collects, why, and what you can ask for.</p>
      <h2>What is collected</h2>
      <ul>
        <li><strong>What you send through a form:</strong> your name, email, phone number if you give one, your message, and your answers to the form&rsquo;s questions.</li>
        <li><strong>Which form you used and which page you were on,</strong> so your request reaches the right place.</li>
        <li><strong>Your consent choices</strong> and the time you made them.</li>
      </ul>
      <p>Homes you save are stored in your own browser and are not sent to this site. The site sets no advertising or analytics cookies.</p>
      <h2>How it is used</h2>
      <p>To reply to your request. If you tick the box for articles and market notes, your email is also used to send those. You can unsubscribe at any time.</p>
      <h2>Who it is shared with</h2>
      <p>Your details are not sold. They are held by the service providers that run this site&rsquo;s hosting and contact management, and shared with the brokerage and transaction partners only as needed to act on your request.</p>
      <h2>Your choices</h2>
      <p>You can ask to see, correct or delete what is held about you. Send the request through the <Link href="/contact?topic=general">contact page</Link>.</p>
      <h2>Video</h2>
      <p>Articles may include video hosted by YouTube or Vimeo. Nothing loads from those services until you press play.</p>
    </LegalPage>
  );
}
