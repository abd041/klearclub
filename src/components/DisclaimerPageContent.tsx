import Image from "next/image";
import Link from "next/link";
import { HomeCtaSubscribeSection } from "@/components/HomeCtaSubscribeSection";

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );
}

/**
 * Live aminoclub.com/us/disclaimer — LEFT 1 BPC · RIGHT 2 TB + H2O
 * Soft amber hero + indigo "Important Notice" badge + Research Use Only callout.
 */
export function DisclaimerPageContent() {
  return (
    <div className="bg-white">
      <style>{`
        .disclaimer-hero {
          position: relative;
          width: 100%;
          min-height: 45vh;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .disclaimer-hero { min-height: 50vh; }
        }
        .disclaimer-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(254, 243, 199, 0.6) 0%, rgba(253, 230, 138, 0.4) 100%);
        }
        .disclaimer-hero-vials {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .disclaimer-vial {
          position: absolute;
          aspect-ratio: 1 / 1.5;
          pointer-events: none;
          user-select: none;
        }
        .disclaimer-vial-inner {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .disclaimer-vial-bpc {
          left: 3%;
          top: 20%;
          width: 16%;
          z-index: 1;
        }
        .disclaimer-vial-bpc .disclaimer-vial-inner { transform: rotate(-12deg); }
        .disclaimer-vial-tb {
          right: 6%;
          top: 8%;
          width: 17%;
          z-index: 2;
        }
        .disclaimer-vial-tb .disclaimer-vial-inner { transform: rotate(10deg); }
        .disclaimer-vial-h2o {
          right: 12%;
          bottom: 8%;
          width: 18%;
          z-index: 1;
        }
        .disclaimer-vial-h2o .disclaimer-vial-inner { transform: rotate(8deg); }
        @media (min-width: 1024px) {
          .disclaimer-vial-bpc { left: 6%; width: 11%; }
          .disclaimer-vial-tb { right: 10%; width: 13%; }
          .disclaimer-vial-h2o { right: 18%; width: 14%; }
        }
        .disclaimer-hero-copy {
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
          .disclaimer-hero-copy { min-height: 50vh; }
        }
      `}</style>

      <section className="disclaimer-hero" aria-label="Disclaimer">
        <div className="disclaimer-hero-bg" aria-hidden="true" />

        <div className="disclaimer-hero-vials" aria-hidden="true">
          <div className="disclaimer-vial disclaimer-vial-bpc animate-float">
            <div className="disclaimer-vial-inner">
              <Image
                src="/hero/bpc.png"
                alt="BPC-157 Peptide vial"
                fill
                unoptimized
                priority
                className="object-contain drop-shadow-[0_24px_32px_rgba(15,23,42,0.18)]"
                sizes="20vw"
              />
            </div>
          </div>
          <div className="disclaimer-vial disclaimer-vial-tb animate-float-slow">
            <div className="disclaimer-vial-inner">
              <Image
                src="/hero/tb.png"
                alt="TB-500 Peptide vial"
                fill
                unoptimized
                priority
                className="object-contain drop-shadow-[0_24px_32px_rgba(15,23,42,0.18)]"
                sizes="20vw"
              />
            </div>
          </div>
          <div className="disclaimer-vial disclaimer-vial-h2o animate-float-delayed">
            <div className="disclaimer-vial-inner">
              <Image
                src="/hero/h2o.png"
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

        <div className="disclaimer-hero-copy">
          <div className="mx-auto max-w-3xl py-16 text-center lg:py-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-2 backdrop-blur-sm">
              <InfoIcon className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">Important Notice</span>
            </div>
            <h1 className="mb-4 text-4xl leading-[1.05] font-semibold tracking-tight text-black sm:text-5xl lg:mb-6 lg:text-6xl xl:text-7xl">
              Disclaimer
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-black/70 sm:text-xl lg:text-2xl">
              Please read this important information before purchasing from Klear Club.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24" aria-label="Disclaimer details">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-sm text-gray-500">Last Updated: January 1, 2026</p>

            <div className="mb-12 rounded-2xl border border-amber-200 bg-amber-50 p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <WarningIcon className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="mb-2 text-lg font-semibold text-amber-800">Research Use Only</h2>
                  <p className="text-amber-700">
                    All products sold by Klear Club are intended for research and laboratory use only. They are not
                    intended for human or veterinary use, and are not to be used for food additives, drugs, or household
                    chemicals.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-none">
              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">General Disclaimer</h2>
              <p className="mb-6 text-gray-600">
                The information provided on this website is for general informational purposes only. While we strive to
                provide accurate and up-to-date information, we make no representations or warranties of any kind, express
                or implied, about the completeness, accuracy, reliability, suitability, or availability of the information,
                products, or services contained on this website.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">Product Use Disclaimer</h2>
              <p className="mb-4 text-gray-600">All products sold by Klear Club:</p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-600">
                <li>Are sold strictly for in-vitro research and laboratory use only</li>
                <li>Are not intended for human or veterinary use</li>
                <li>Are not intended for use as food additives, drugs, cosmetics, or household chemicals</li>
                <li>Are not intended to diagnose, treat, cure, or prevent any disease</li>
                <li>Should only be handled by qualified and licensed professionals</li>
              </ul>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">No Medical Advice</h2>
              <p className="mb-6 text-gray-600">
                Nothing on this website should be construed as providing medical advice. The content is not intended to be
                a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your
                physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">Research Information</h2>
              <p className="mb-6 text-gray-600">
                Any research information, scientific data, or study references provided on this website are for educational
                and informational purposes only. Such information does not constitute endorsement of any particular use of
                our products. Researchers are responsible for verifying all information and conducting their own due
                diligence before using any products.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">Buyer Responsibility</h2>
              <p className="mb-4 text-gray-600">By purchasing products from Klear Club, you represent and warrant that:</p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-600">
                <li>You are at least 21 years of age</li>
                <li>You are purchasing products for legitimate research purposes only</li>
                <li>
                  You will comply with all applicable laws and regulations regarding the purchase, possession, and use of
                  our products
                </li>
                <li>You will not use products in any manner inconsistent with their intended research use</li>
                <li>You accept full responsibility for the proper handling, storage, and use of products</li>
              </ul>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">Product Quality Disclaimer</h2>
              <p className="mb-6 text-gray-600">
                While we strive to provide the highest quality research-grade peptides with 99%+ purity as verified by
                third-party testing, results may vary based on research conditions, storage, handling, and other factors
                beyond our control. Certificate of Analysis (CoA) documents reflect the quality at the time of testing and
                do not guarantee outcomes in specific research applications.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">Limitation of Liability</h2>
              <p className="mb-6 text-gray-600">
                In no event shall Klear Club, its owners, employees, or affiliates be liable for any direct, indirect,
                incidental, special, consequential, or punitive damages arising out of or related to your use of our
                products or the information provided on this website. This includes, but is not limited to, damages for
                loss of profits, data, or other intangible losses.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">Indemnification</h2>
              <p className="mb-6 text-gray-600">
                You agree to indemnify, defend, and hold harmless Klear Club, its owners, officers, directors, employees,
                agents, and affiliates from and against any and all claims, damages, losses, liabilities, and expenses
                (including reasonable attorneys&apos; fees) arising from: (a) your use, misuse, or handling of our products,
                including any injury, illness, or damage resulting from administration to any human or animal; (b) any
                statements, health claims, dosing recommendations, or representations you make to third parties regarding
                our products; (c) any advertising, marketing, or promotional content you create referencing our products;
                (d) any violation of this disclaimer or our{" "}
                <Link href="/terms" className="text-black underline">
                  Terms of Service
                </Link>
                ; or (e) any regulatory action brought against Klear Club as a result of your actions or statements. This
                indemnification survives the termination of your account.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">External Links</h2>
              <p className="mb-6 text-gray-600">
                This website may contain links to external websites. We have no control over the content and nature of
                these sites and are not responsible for their content or privacy practices. The inclusion of any links does
                not imply endorsement or recommendation.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">Changes to This Disclaimer</h2>
              <p className="mb-6 text-gray-600">
                We reserve the right to modify this disclaimer at any time without prior notice. Changes will be effective
                immediately upon posting to this page. Your continued use of our website and products after any changes
                constitutes acceptance of the modified disclaimer.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">Contact</h2>
              <p className="mb-6 text-gray-600">If you have questions about this disclaimer, please contact us:</p>
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
