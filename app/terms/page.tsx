import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Ibis Labs LLC",
  description: "Terms of Service for Ibis Labs LLC products including HOA-hub.cloud, Trainer Notebook Pro, and Thoth's Notebook.",
};

export default function TermsOfService() {
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
          Terms of Service
        </h1>
        <p className="text-cyber-cyan text-xs tracking-widest uppercase mb-16">
          Effective Date: May 2026
        </p>

        <section id="acceptance" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-300 text-sm leading-relaxed">By accessing or using any Ibis Labs product, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services.</p>
        </section>

        <section id="services" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Description of Services</h2>
          <p className="text-gray-300 text-sm leading-relaxed">Ibis Labs LLC offers three distinct platforms: HOA-hub.cloud, a management tool for community associations; Trainer Notebook Pro, a fitness and progress tracking platform; and Thoth&apos;s Notebook, a unique open-source productivity suite. Services are provided on an &ldquo;as-is&rdquo; basis, and Ibis Labs reserves the right to modify or discontinue features as the products evolve. As an exceptionally nimble, user-focused development firm, if there are features that would be useful to you please let us know! We will do our best to accommodate your unique requests.</p>
        </section>

        <section id="accounts" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">User Accounts</h2>
          <p className="text-gray-300 text-sm leading-relaxed">You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate, current information during registration. Please notify us immediately at pete@ibislabs.cloud if you suspect any unauthorized access. Use of our services is restricted to individuals aged 13 and older.</p>
        </section>

        <section id="acceptable-use" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Acceptable Use</h2>
          <p className="text-gray-300 text-sm leading-relaxed">You agree not to use Ibis Labs services for illegal activities, harassment, impersonation, or to upload malware. Any attempt to reverse-engineer, exploit, scrape data, or circumvent security measures is strictly prohibited. We reserve the right to suspend or terminate accounts that violate these standards of conduct.</p>
        </section>

        <section id="intellectual-property" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Intellectual Property and Data Sovereignty</h2>
          <p className="text-gray-300 text-sm leading-relaxed">The software, design, branding, and code provided by Ibis Labs are the exclusive property of Ibis Labs LLC. Your data, however, belongs entirely to you. Ibis Labs LLC does not possess or touch your application data; this information is managed and stored exclusively within the Google Cloud environment and Firebase databases. By using our services, you grant Ibis Labs a limited license to facilitate the storage and processing of this data solely to provide the service. Because our products route data directly between your device and Google/Firebase infrastructure&mdash;bypassing Ibis Labs servers or devices&mdash;your data remains under your exclusive control.</p>
        </section>

        <section id="regulatory" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Regulatory Compliance Disclaimer</h2>
          <p className="text-gray-300 text-sm leading-relaxed">HOA-hub.cloud is designed to assist HOA boards in managing their operations and facilitating transparency. However, Ibis Labs makes no guarantees that our product will ensure your compliance with complex Washington State HOA regulations. It is the sole responsibility of the HOA board to ensure their actions and records align with state law. As with any legal matter, community associations should consult their own qualified legal counsel to ensure their management practices conform to the legal framework regulating community associations.</p>
        </section>

        <section id="disclaimers" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Disclaimers</h2>
          <p className="text-gray-300 text-sm leading-relaxed">Services are provided &ldquo;as-is&rdquo; without warranties of any kind. HOA-hub.cloud is currently in beta; while we strive to create a predictable user experience, features, look, and layout may change. We make no guarantees during beta testing regarding uptime or data preservation beyond commercially reasonable efforts. Refunds are handled on a case-by-case basis at the sole discretion of Ibis Labs LLC.</p>
        </section>

        <section id="liability" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Limitation of Liability</h2>
          <p className="text-gray-300 text-sm leading-relaxed">To the maximum extent permitted by Washington law, Ibis Labs LLC&apos;s total liability for any claim arising out of these terms is limited to the greater of the fees you paid in the 12 months prior to the claim, or $50. Ibis Labs shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the platform.</p>
        </section>

        <section id="governing-law" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Governing Law</h2>
          <p className="text-gray-300 text-sm leading-relaxed">These terms are governed by the laws of Washington State. Any disputes arising from these services shall be resolved exclusively in the courts located in King County, Washington.</p>
        </section>

        <section id="changes" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Changes to These Terms</h2>
          <p className="text-gray-300 text-sm leading-relaxed">Ibis Labs LLC may update these terms occasionally. Material changes will be communicated via email or site notice. Continued use of the platform after the effective date of the changes constitutes your acceptance of the new terms.</p>
        </section>

        <section id="contact" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Contact</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            <a href="mailto:pete@ibislabs.cloud" className="text-cyber-cyan hover:underline">pete@ibislabs.cloud</a>
            {" · "}127 SW 154th St, Suite 307, Burien, WA 98166
          </p>
        </section>

        <div className="mt-16 pt-8 border-t border-gray-800 flex items-center justify-between text-xs">
          <Link href="/" className="text-gray-500 hover:text-cyber-cyan tracking-widest uppercase transition-colors">
            ← Back to Ibis Labs
          </Link>
          <div className="flex gap-4 text-gray-500">
            <Link href="/privacy" className="hover:text-cyber-cyan tracking-widest uppercase transition-colors">Privacy</Link>
            <Link href="/security" className="hover:text-cyber-cyan tracking-widest uppercase transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
