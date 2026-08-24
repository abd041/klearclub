import Image from "next/image";
import { HomeCtaSubscribeSection } from "@/components/HomeCtaSubscribeSection";
import { productImage } from "@/data/media";

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

/**
 * Privacy hero:
 * LEFT 1 = BPC · RIGHT 2 = TB (top) + H2O (bottom)
 * Positions mirrored from live HTML (inline CSS so layout never collapses).
 */
export function PrivacyPageContent() {
  return (
    <div className="bg-white">
      <style>{`
        .privacy-hero {
          position: relative;
          width: 100%;
          min-height: 45vh;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .privacy-hero { min-height: 50vh; }
        }
        .privacy-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(237, 233, 254, 0.7) 0%, rgba(221, 214, 254, 0.5) 100%);
        }
        .privacy-hero-vials {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .privacy-vial {
          position: absolute;
          aspect-ratio: 1 / 1.5;
          pointer-events: none;
          user-select: none;
        }
        .privacy-vial-inner {
          position: relative;
          width: 100%;
          height: 100%;
        }
        /* LEFT — 1 vial (BPC) */
        .privacy-vial-bpc {
          left: 3%;
          top: 20%;
          width: 16%;
          z-index: 1;
        }
        .privacy-vial-bpc .privacy-vial-inner {
          transform: rotate(-12deg);
        }
        /* RIGHT — TB (outer/top) */
        .privacy-vial-tb {
          right: 6%;
          top: 8%;
          width: 17%;
          z-index: 2;
        }
        .privacy-vial-tb .privacy-vial-inner {
          transform: rotate(10deg);
        }
        /* RIGHT — H2O (inner/bottom) */
        .privacy-vial-h2o {
          right: 12%;
          bottom: 8%;
          width: 18%;
          z-index: 1;
        }
        .privacy-vial-h2o .privacy-vial-inner {
          transform: rotate(8deg);
        }
        @media (min-width: 1024px) {
          .privacy-vial-bpc { left: 6%; width: 11%; }
          .privacy-vial-tb { right: 10%; width: 13%; }
          .privacy-vial-h2o { right: 18%; width: 14%; }
        }
        .privacy-hero-copy {
          position: relative;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 45vh;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        @media (min-width: 1024px) {
          .privacy-hero-copy { min-height: 50vh; }
        }
      `}</style>

      <section className="privacy-hero" aria-label="Privacy Policy">
        <div className="privacy-hero-bg" aria-hidden="true" />

        <div className="privacy-hero-vials" aria-hidden="true">
          <div className="privacy-vial privacy-vial-bpc animate-float">
            <div className="privacy-vial-inner">
              <Image
                src={productImage({ slug: "bpc-157", form: "vial" })}
                alt="BPC-157 Peptide vial"
                fill
                unoptimized
                priority
                className="object-contain drop-shadow-[0_24px_32px_rgba(15,23,42,0.18)]"
                sizes="20vw"
              />
            </div>
          </div>
          <div className="privacy-vial privacy-vial-tb animate-float-slow">
            <div className="privacy-vial-inner">
              <Image
                src={productImage({ slug: "tb-500", form: "vial" })}
                alt="TB-500 Peptide vial"
                fill
                unoptimized
                priority
                className="object-contain drop-shadow-[0_24px_32px_rgba(15,23,42,0.18)]"
                sizes="20vw"
              />
            </div>
          </div>
          <div className="privacy-vial privacy-vial-h2o animate-float-delayed">
            <div className="privacy-vial-inner">
              <Image
                src={productImage({ slug: "klear-h2o", form: "vial" })}
                alt="Klear H2O"
                fill
                unoptimized
                priority
                className="object-contain drop-shadow-[0_24px_32px_rgba(15,23,42,0.18)]"
                sizes="20vw"
              />
            </div>
          </div>
        </div>

        <div className="privacy-hero-copy">
          <div className="mx-auto max-w-3xl py-16 text-center lg:py-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-2 backdrop-blur-sm">
              <ShieldCheckIcon className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Your Privacy Matters</span>
            </div>
            <h1 className="mb-4 text-4xl leading-[1.05] font-semibold tracking-tight text-black sm:text-5xl lg:mb-6 lg:text-6xl xl:text-7xl">
              Privacy Policy
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-black/70 sm:text-xl lg:text-2xl">
              How we collect, use, and protect your personal information.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24" aria-label="Privacy policy details">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-sm text-gray-500">Last Updated: January 1, 2026</p>

            <div className="max-w-none">
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                At Klear Club (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your
                privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
                you visit our website or make a purchase from us.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">1. Information We Collect</h2>
              <p className="mb-4 text-gray-600">We collect information you provide directly to us, including:</p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-600">
                <li>
                  <strong>Contact Information:</strong> Name, email address, phone number, and shipping/billing addresses
                </li>
                <li>
                  <strong>Payment Information:</strong> Credit card details and billing information (processed securely
                  through our payment providers)
                </li>
                <li>
                  <strong>Order Information:</strong> Products purchased, order history, and transaction details
                </li>
                <li>
                  <strong>Communication Data:</strong> Messages, emails, and support requests you send us
                </li>
                <li>
                  <strong>Account Information:</strong> Username and password if you create an account
                </li>
              </ul>

              <h3 className="mb-3 mt-8 text-xl font-semibold text-black">Automatically Collected Information</h3>
              <p className="mb-4 text-gray-600">When you visit our website, we automatically collect:</p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-600">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages viewed and time spent on our site</li>
                <li>Referring website and exit pages</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">2. How We Use Your Information</h2>
              <p className="mb-4 text-gray-600">We use the information we collect to:</p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-600">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and our products</li>
                <li>Send promotional emails (with your consent)</li>
                <li>Improve our website and customer experience</li>
                <li>Prevent fraud and enhance security</li>
                <li>Comply with legal obligations</li>
                <li>Respond to your questions and support requests</li>
              </ul>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">3. Information Sharing</h2>
              <p className="mb-4 text-gray-600">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-600">
                <li>
                  <strong>Service Providers:</strong> Payment processors, shipping carriers, and email service providers
                  who help us operate our business
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
                </li>
              </ul>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">4. Data Security</h2>
              <p className="mb-6 text-gray-600">
                We implement appropriate technical and organizational measures to protect your personal information,
                including:
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-600">
                <li>SSL/TLS encryption for all data transmission</li>
                <li>Secure payment processing through PCI-compliant providers</li>
                <li>Regular security audits and monitoring</li>
                <li>Limited access to personal information by employees</li>
                <li>Secure data storage with encryption at rest</li>
              </ul>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">5. Cookies and Tracking</h2>
              <p className="mb-4 text-gray-600">We use cookies and similar technologies to:</p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-600">
                <li>Remember your preferences and cart contents</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Personalize your experience</li>
                <li>Serve relevant advertisements</li>
              </ul>
              <p className="mb-6 text-gray-600">
                You can control cookies through your browser settings. Disabling cookies may affect your ability to use
                certain features of our website.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">6. Your Rights</h2>
              <p className="mb-4 text-gray-600">You have the right to:</p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-600">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              <p className="mb-6 text-gray-600">
                To exercise these rights, contact us at{" "}
                <a href="mailto:support@klearclub.com" className="text-black underline">
                  support@klearclub.com
                </a>
                .
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">7. California Privacy Rights (CCPA)</h2>
              <p className="mb-6 text-gray-600">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act
                (CCPA), including the right to know what personal information we collect and how it is used, the right to
                delete your information, and the right to opt out of the sale of your information. We do not sell
                personal information.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">8. Children&apos;s Privacy</h2>
              <p className="mb-6 text-gray-600">
                Our website is not intended for individuals under 21 years of age. We do not knowingly collect personal
                information from children. If we learn we have collected information from a child, we will promptly
                delete it.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">9. Third-Party Links</h2>
              <p className="mb-6 text-gray-600">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices
                of these sites. We encourage you to review their privacy policies before providing any personal
                information.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">10. Changes to This Policy</h2>
              <p className="mb-6 text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by
                posting the new policy on this page and updating the &quot;Last Updated&quot; date. Your continued use of
                our website after changes constitutes acceptance of the updated policy.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">11. Contact Us</h2>
              <p className="mb-6 text-gray-600">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="mb-6 rounded-xl bg-gray-50 p-6">
                <p className="text-gray-700">
                  <strong>Klear Club</strong>
                  <br />
                  Email:{" "}
                  <a href="mailto:support@klearclub.com" className="text-black underline">
                    support@klearclub.com
                  </a>
                  <br />
                  Support:{" "}
                  <a href="mailto:support@klearclub.com" className="text-black underline">
                    support@klearclub.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeCtaSubscribeSection />
    </div>
  );
}
