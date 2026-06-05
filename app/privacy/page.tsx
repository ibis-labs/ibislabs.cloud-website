import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Ibis Labs LLC",
  description: "Privacy Policy for Ibis Labs LLC products including HOA-hub.cloud, Trainer Notebook Pro, and Thoth's Notebook.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen flex flex-col items-center p-6 md:p-24 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      <div className="w-full max-w-3xl">
        <Link
          href="/"
          className="text-cyber-cyan text-xs tracking-widest uppercase hover:drop-shadow-[0_0_6px_rgba(0,255,255,0.9)] transition-all mb-12 inline-block"
        >
          ← Ibis Labs
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-[0.15em] uppercase text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-cyber-cyan text-xs tracking-widest uppercase mb-16">
          Effective Date: May 2026
        </p>

        <section id="introduction" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Introduction</h2>
          <p className="text-gray-300 text-sm leading-relaxed">Ibis Labs LLC is a boutique software company committed to the idea that the digital tools we provide should serve and protect you, the customer, and your data. This Privacy Policy applies to ibislabs.cloud and all products offered by Ibis Labs LLC, including HOA-hub.cloud, Trainer Notebook Pro, and Thoth&apos;s Notebook. By using our services, you entrust us with your business and personal data, and we take that responsibility seriously.</p>
        </section>

        <section id="information-collected" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Information We Collect</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">Ibis Labs LLC collects only the information necessary to provide and support our services. When you correspond with us, we collect the contact details you provide, such as your name and email address. When you create accounts for our products, the following standards apply:</p>
          <ul className="flex flex-col gap-4 text-sm text-gray-300">
            <li className="flex gap-3">
              <span className="text-cyber-cyan mt-0.5 shrink-0">▹</span>
              <span><span className="text-white font-semibold">Account Information:</span> Your email address is stored securely within Google Cloud/Firebase and is not accessed by Ibis Labs LLC for any purpose other than account management. Passwords are never stored in plaintext and are handled exclusively through industry-standard secure hashing.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyber-cyan mt-0.5 shrink-0">▹</span>
              <span><span className="text-white font-semibold">Product-Specific Data:</span> Ibis Labs LLC does not access or process your application data. HOA community records, financial summaries, workout logs, session data, and personal notes are stored securely within your designated Google Cloud infrastructure, where they remain under your exclusive control.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyber-cyan mt-0.5 shrink-0">▹</span>
              <span><span className="text-white font-semibold">Usage Data:</span> We utilize standard platform logs provided by Google Cloud and Firebase solely to monitor system health and feature performance. We do not create advertising profiles, track user behavior across the web, or sell personal information to third parties.</span>
            </li>
          </ul>
        </section>

        <section id="zero-knowledge" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Zero-Knowledge Architecture</h2>
          <p className="text-gray-300 text-sm leading-relaxed">For Trainer Notebook Pro and Thoth&apos;s Notebook, we utilize a zero-knowledge architecture. This means your sensitive content is encrypted on your device before it is ever sent to the database hosted in the Google Cloud. Ibis Labs LLC never possesses the data and does not hold the keys to decrypt the data, and cannot access readable versions of your workout content, personal notes, or private messages. Your privacy is protected by the strength of your own encryption keys.</p>
        </section>

        <section id="how-we-use" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">How We Use Your Information</h2>
          <p className="text-gray-300 text-sm leading-relaxed">Your data is used solely to deliver the services you signed up for. This includes managing your account, providing technical support, and ensuring the platform remains performant. We do not use your information for targeted advertising, and it is never shared with third parties for marketing purposes.</p>
        </section>

        <section id="third-parties" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Third-Party Services</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">Ibis Labs relies on Google Cloud and Firebase for all infrastructure, data storage, and authentication. These platforms are industry standards that provide secure, managed environments.</p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">To ensure application stability and rapidly identify software bugs, we also utilize Sentry (Functional Software, Inc.) to collect anonymous diagnostic and error telemetry data.</p>
          <p className="text-gray-300 text-sm leading-relaxed">While these third parties process data on our behalf, they are bound by strict contractual obligations and their own privacy policies (policies.google.com/privacy, sentry.io/privacy). Ibis Labs does not use any other third-party tracking networks or advertising analytics.</p>
        </section>

        <section id="data-retention" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Data Retention</h2>
          <p className="text-gray-300 text-sm leading-relaxed"> Your data is only maintained as long as your account is active, plus a 90-day grace period to allow for account restoration or in accordance with applicable state laws. You may request the deletion of your account and associated data at any time by contacting us directly. For HOA-hub, this request must come from an authorized HOA representative. We reserve the right to require signed confirmation for all HOA-hub data deletion requests.</p>
        </section>

        <section id="your-rights" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Your Rights</h2>
          <p className="text-gray-300 text-sm leading-relaxed">As a user, you have the right to access, correct, or delete your personal information. Under the California Consumer Privacy Act (CCPA) and consistent with the spirit of the Washington My Health My Data Act, we strive to provide full transparency regarding how your data is handled. Submit access or deletion requests to pete@ibislabs.cloud, and we will respond within 5 business days.</p>
        </section>

        <section id="security" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Security</h2>
          <p className="text-gray-300 text-sm leading-relaxed">Ibis Labs LLC principal Peter Blunk personally oversees and takes final responsibility for all security protocols for Ibis Labs LLC. Our approach to security is architectural, focusing on robust data isolation and leveraging the proven infrastructure of Google Cloud. We are committed to maintaining a secure environment and will notify you promptly if any unauthorized access to your account data is discovered. Please see our <Link href="/security" className="text-cyber-cyan hover:underline">Security Stance</Link> for details.</p>
        </section>

        <section id="childrens-privacy" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Children&apos;s Privacy</h2>
          <p className="text-gray-300 text-sm leading-relaxed">Ibis Labs services are not directed at children under the age of 13. We do not knowingly collect personal information from minors. If you believe a child has provided data through our platform, please contact us immediately so that it can be removed.</p>
        </section>

        <section id="changes" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Changes to This Policy</h2>
          <p className="text-gray-300 text-sm leading-relaxed">As Ibis Labs grows, this policy may be updated. Material changes will be communicated via email or through a notice on the website. Continued use of our services after such changes constitutes your acceptance of the updated policy.</p>
        </section>

        <section id="contact" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Contact Us</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            <a href="mailto:pete@ibislabs.cloud" className="text-cyber-cyan hover:underline">pete@ibislabs.cloud</a>
            {" · "}
            <a href="tel:+12063533981" className="text-cyber-cyan hover:underline">206-353-3981</a>
            {" · "}127 SW 154th St, Suite 307, Burien, WA 98166
          </p>
        </section>

        <div className="mt-16 pt-8 border-t border-gray-800 flex items-center justify-between text-xs">
          <Link href="/" className="text-gray-500 hover:text-cyber-cyan tracking-widest uppercase transition-colors">
            ← Back to Ibis Labs
          </Link>
          <div className="flex gap-4 text-gray-500">
            <Link href="/terms" className="hover:text-cyber-cyan tracking-widest uppercase transition-colors">Terms</Link>
            <Link href="/security" className="hover:text-cyber-cyan tracking-widest uppercase transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
