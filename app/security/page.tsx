import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security | Ibis Labs LLC",
  description: "Security stance and practices at Ibis Labs LLC — zero-knowledge architecture, end-to-end encryption, and responsible disclosure.",
};

export default function SecurityStance() {
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
          Security Stance
        </h1>
        <p className="text-cyber-cyan text-xs tracking-widest uppercase mb-16">
          Last Updated: May 2026
        </p>

        <section id="philosophy" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Our Security Philosophy</h2>
          <p className="text-gray-300 text-sm leading-relaxed">Data security and privacy are not afterthoughts; they are the bedrock upon which Ibis Labs is constructed. We believe that being a boutique software provider is a distinct advantage: we make no pretense of being a global data security conglomerate. Instead, Ibis Labs LLC takes a &ldquo;best-in-class&rdquo; approach by offloading data storage and infrastructure security to the true industry experts&mdash;Google Cloud and Firebase. Our philosophy is simple: if we would not trust a platform with our own personal data, we will not ask you to trust it with yours. By leveraging the world-class, SOC 2 Type II, and ISO 27001-certified infrastructure provided by Google, we ensure your information is protected by the same technological standards used by major financial institutions.</p>
        </section>

        <section id="zero-knowledge" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Zero-Knowledge Architecture &amp; End-to-End Encryption</h2>
          <p className="text-gray-300 text-sm leading-relaxed">For Thoth&apos;s Notebook and Trainer Notebook Pro, we employ zero-knowledge architecture. This means the heavy lifting of encryption occurs entirely on your device, and only the resulting unintelligible ciphertext is stored on the Firebase infrastructure. Neither Ibis Labs, nor Google/Firestore hold your decryption keys. This means we cannot access unencrypted versions of your workout logs, personal notes, or private messages. Direct messaging and writing on group &ldquo;walls&rdquo; among users who elect to participate in such groups are additionally protected by end-to-end encryption, ensuring that messages are readable only by the intended recipient. To be clear about the trade-off: because we never possess your keys, if you lose your 24-word (Thoth&apos;s Notebook) or 12-word (Trainer Notebook Pro) backup, we have no &ldquo;backdoor&rdquo; to recover your data. In this architecture, security means placing the power of privacy&mdash;and the responsibility of access&mdash;directly into your hands.</p>
          <p className="text-gray-300 text-sm leading-relaxed mt-4">
            <span className="text-white font-semibold">NOTE:</span> Because communications on HOA-hub are potentially legally discoverable, they are not encrypted. Users should be aware that messages are not private: everything they write on the platform is data owned by their association and could be subject to legal discovery and/or association review. The messaging platform on HOA-hub includes a warning to this effect.
          </p>
          
        </section>

        <section id="infrastructure" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Infrastructure Security</h2>
          <p className="text-gray-300 text-sm leading-relaxed">Ibis Labs has no physical servers of its own. We utilize Google Cloud and Firebase, which provides us&mdash;and you&mdash;with world-class, SOC 2 Type II and ISO 27001-certified physical and network security. We leverage Firebase&apos;s Encryption at Rest for all data, ensuring that your information is protected by the same technological standards used by major financial institutions.</p>
        </section>

        <section id="authentication" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Authentication</h2>
          <p className="text-gray-300 text-sm leading-relaxed">We use Firebase Authentication to handle logins. Your password is never stored on any Ibis Labs LLC equipment. Firebase uses industry-standard hashing algorithms to keep your password safe. We encourage all users to implement strong, unique passwords. Ibis Labs LLC does not have access to your password, nor would we want it.</p>
        </section>

        <section id="access-controls" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Access Controls</h2>
          <p className="text-gray-300 text-sm leading-relaxed">We operate under a strict least-privilege access model. There is no large team of contractors or third parties with access to your data. While we may retain assistance as needed to improve operational efficiency or security, at no time will any individual or third party be granted direct access to user data without thorough vetting and signed, legally binding privacy agreements. Our own access to the production environment is utilized only when necessary to perform essential maintenance or improvements. In this case we will limit our access to the minimum amount of production data required to perform such maintenance. We may also access data to assist with a support request initiated by a user.</p>
        </section>

        <section id="incident-response" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Incident Response</h2>
          <p className="text-gray-300 text-sm leading-relaxed">In the unlikely event of a security incident affecting your data, Ibis Labs LLC will not hide behind corporate legal counsel. We will notify you directly via email within 72 hours of confirming a breach, clearly detailing what happened, what data was potentially affected, and the exact steps we are taking to mitigate the situation.</p>
        </section>

        <section id="disclosure" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Responsible Disclosure</h2>
          <p className="text-gray-300 text-sm leading-relaxed">If you are a security researcher and you believe you have found a vulnerability in an Ibis Labs product, we want to hear from you. Please email <a href="mailto:pete@ibislabs.cloud?subject=Security%20Disclosure" className="text-cyber-cyan hover:underline">pete@ibislabs.cloud</a> with the subject line &ldquo;Security Disclosure.&rdquo; Include a description of the issue and steps to reproduce it. We promise to acknowledge receipt within 48 hours and work to address confirmed issues. We value the security community and will not take legal action against individuals who report vulnerabilities in good faith.</p>
        </section>

        <section id="contact" className="mb-10">
          <h2 className="text-cyber-cyan uppercase tracking-widest text-sm border-b border-gray-800 pb-2 mb-4">Security Contact</h2>
          <p className="text-gray-300 text-sm leading-relaxed">Please direct all security-related communications to <a href="mailto:pete@ibislabs.cloud?subject=Security%20Disclosure" className="text-cyber-cyan hover:underline">pete@ibislabs.cloud</a> with the subject line &ldquo;Security Disclosure.&rdquo;</p>
        </section>

        <div className="mt-16 pt-8 border-t border-gray-800 flex items-center justify-between text-xs">
          <Link href="/" className="text-gray-500 hover:text-cyber-cyan tracking-widest uppercase transition-colors">
            ← Back to Ibis Labs
          </Link>
          <div className="flex gap-4 text-gray-500">
            <Link href="/privacy" className="hover:text-cyber-cyan tracking-widest uppercase transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-cyber-cyan tracking-widest uppercase transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
