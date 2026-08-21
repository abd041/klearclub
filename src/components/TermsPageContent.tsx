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

/**
 * Live aminoclub.com/us/terms — LEFT 1 BPC · RIGHT 2 TB + H2O
 * Soft blue hero gradient + indigo "Legal Agreement" badge.
 */
export function TermsPageContent() {
  return (
    <div className="bg-white">
      <style>{`
        .terms-hero {
          position: relative;
          width: 100%;
          min-height: 45vh;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .terms-hero { min-height: 50vh; }
        }
        .terms-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(219, 234, 254, 0.7) 0%, rgba(191, 219, 254, 0.5) 100%);
        }
        .terms-hero-vials {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .terms-vial {
          position: absolute;
          aspect-ratio: 1 / 1.5;
          pointer-events: none;
          user-select: none;
        }
        .terms-vial-inner {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .terms-vial-bpc {
          left: 3%;
          top: 20%;
          width: 16%;
          z-index: 1;
        }
        .terms-vial-bpc .terms-vial-inner { transform: rotate(-12deg); }
        .terms-vial-tb {
          right: 6%;
          top: 8%;
          width: 17%;
          z-index: 2;
        }
        .terms-vial-tb .terms-vial-inner { transform: rotate(10deg); }
        .terms-vial-h2o {
          right: 12%;
          bottom: 8%;
          width: 18%;
          z-index: 1;
        }
        .terms-vial-h2o .terms-vial-inner { transform: rotate(8deg); }
        @media (min-width: 1024px) {
          .terms-vial-bpc { left: 6%; width: 11%; }
          .terms-vial-tb { right: 10%; width: 13%; }
          .terms-vial-h2o { right: 18%; width: 14%; }
        }
        .terms-hero-copy {
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
          .terms-hero-copy { min-height: 50vh; }
        }
      `}</style>

      <section className="terms-hero" aria-label="Terms of Service">
        <div className="terms-hero-bg" aria-hidden="true" />

        <div className="terms-hero-vials" aria-hidden="true">
          <div className="terms-vial terms-vial-bpc animate-float">
            <div className="terms-vial-inner">
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
          <div className="terms-vial terms-vial-tb animate-float-slow">
            <div className="terms-vial-inner">
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
          <div className="terms-vial terms-vial-h2o animate-float-delayed">
            <div className="terms-vial-inner">
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

        <div className="terms-hero-copy">
          <div className="mx-auto max-w-3xl py-16 text-center lg:py-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-2 backdrop-blur-sm">
              <InfoIcon className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">Legal Agreement</span>
            </div>
            <h1 className="mb-4 text-4xl leading-[1.05] font-semibold tracking-tight text-black sm:text-5xl lg:mb-6 lg:text-6xl xl:text-7xl">
              Terms of Service
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-black/70 sm:text-xl lg:text-2xl">
              Please read these terms carefully before using our website or making a purchase.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24" aria-label="Terms of service details">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-sm text-gray-500">Last Updated: February 20, 2026</p>

            <div className="max-w-none">
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Welcome to Klear Club. By accessing our website at klearclub.com (&quot;Website&quot;) or purchasing
                products from us, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree
                to these Terms, please do not use our Website or services.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">1. Acceptance of Terms</h2>
              <p className="mb-6 text-gray-600">
                By accessing or using the Website, you confirm that you are at least 21 years old and have the legal
                capacity to enter into these Terms. If you are using the Website on behalf of an organization, you
                represent that you have the authority to bind that organization to these Terms.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">2. Eligibility</h2>
              <p className="mb-6 text-gray-600">
                Access to Klear Club products and services is limited to qualified researchers, laboratory professionals,
                and organizations engaged in legitimate scientific research. Klear Club reserves the right to approve or
                deny any customer or order at its sole discretion. We may request verification of research credentials or
                institutional affiliation at any time. Failure to provide satisfactory verification may result in order
                cancellation or account termination.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">3. Products and Intended Use</h2>
              <p className="mb-4 text-gray-600">
                All products sold by Klear Club are intended for laboratory research purposes only. None of our products
                or statements have been evaluated by the Food and Drug Administration (FDA). By purchasing from us, you
                acknowledge and agree that:
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-600">
                <li>Products are sold strictly for in-vitro research and laboratory use</li>
                <li>Products are not for human or animal consumption, diagnostic, or therapeutic use</li>
                <li>Products are not intended to diagnose, treat, cure, or prevent any disease</li>
                <li>
                  No product information on this Website constitutes medical advice, dosing guidance, or a recommendation
                  for human or animal use
                </li>
                <li>
                  You will comply with all applicable local, state, and federal laws and regulations related to the
                  purchase, possession, and use of research chemicals
                </li>
                <li>You are a qualified researcher or purchasing for legitimate research purposes</li>
              </ul>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">4. Account Registration</h2>
              <p className="mb-6 text-gray-600">
                You may create an account to make purchases and track orders. You are responsible for maintaining the
                confidentiality of your account credentials and for all activities under your account. You agree to provide
                accurate and complete information and to update it as needed.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">5. Orders and Payment</h2>
              <p className="mb-4 text-gray-600">When you place an order:</p>
              <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-600">
                <li>You agree to pay all charges at the prices in effect when incurred</li>
                <li>You authorize us to charge your payment method for the total amount</li>
                <li>All orders are subject to acceptance and availability</li>
                <li>We reserve the right to refuse or cancel any order for any reason</li>
                <li>Prices are subject to change without notice</li>
              </ul>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">6. Shipping and Delivery</h2>
              <p className="mb-6 text-gray-600">
                We ship to addresses within the United States. Shipping times are estimates and not guaranteed. Risk of
                loss and title pass to you upon delivery to the carrier. We are not responsible for delays caused by
                carriers, customs, or circumstances beyond our control.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">7. Returns and Refunds</h2>
              <p className="mb-6 text-gray-600">
                Our return policy is detailed on our{" "}
                <Link href="/returns" className="text-black underline">
                  Returns &amp; Refunds
                </Link>{" "}
                page. We offer one-time replacements for products damaged in transit only. All damage claims must include
                photographic evidence and are subject to review. One replacement per customer per order. Reconstituted
                products are not eligible for replacement. We do not offer refunds for change of mind, dissatisfaction, or
                misuse. Klear Club is not responsible for improper storage, handling, or reconstitution of products after
                delivery.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">8. Intellectual Property</h2>
              <p className="mb-6 text-gray-600">
                All content on the Website, including text, graphics, logos, images, and software, is the property of
                Klear Club or its licensors and is protected by intellectual property laws. You may not reproduce,
                distribute, modify, or create derivative works without our express written permission.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">9. Prohibited Conduct</h2>
              <p className="mb-4 text-gray-600">You agree not to:</p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-600">
                <li>Use the Website for any unlawful purpose</li>
                <li>Misrepresent your identity or affiliation</li>
                <li>Interfere with or disrupt the Website or its servers</li>
                <li>Attempt to gain unauthorized access to any part of the Website</li>
                <li>Use automated means to access or scrape the Website</li>
                <li>Resell products without our written authorization</li>
                <li>Use products in a manner inconsistent with their intended research use</li>
                <li>
                  Discuss, promote, or engage in any practice of human or animal dosing of products purchased from Klear
                  Club, whether through our Website, customer communications, or any other channel
                </li>
                <li>
                  Market, label, or represent any product purchased from Klear Club as suitable for human consumption,
                  therapeutic use, or veterinary application
                </li>
              </ul>
              <p className="mb-6 text-gray-600">
                Violation of any of the above prohibited conduct, in particular any discussion or practice of human or
                animal dosing, may result in immediate termination of your account, cancellation of pending orders, and a
                permanent ban from Klear Club services, at our sole discretion.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">10. Termination</h2>
              <p className="mb-6 text-gray-600">
                Klear Club reserves the right to suspend or terminate your account and refuse any current or future use of
                the Website at any time, for any reason, at our sole discretion. This includes, without limitation,
                termination for violation of these Terms, suspected misuse of products, failure to provide satisfactory
                research credentials upon request, or any conduct that we determine to be harmful to our business, other
                customers, or the integrity of our operations. Termination of your account does not relieve you of any
                obligations under these Terms, including indemnification.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">11. Affiliate &amp; Referral Program</h2>
              <p className="mb-4 text-gray-600">
                Klear Club may offer an affiliate or referral program (&quot;Program&quot;) that allows eligible members to
                earn commissions on qualifying purchases made through their referral links. By participating in the
                Program, you agree to the following:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-600">
                <li>
                  <strong>Commission Eligibility:</strong> Eligibility for commissions, including commission rates,
                  qualifying purchases, and payout thresholds, is determined by Klear Club at its sole discretion and may
                  be modified or revoked at any time without prior notice.
                </li>
                <li>
                  <strong>Payout Schedule:</strong> Klear Club reserves the right to determine when and whether affiliate
                  payouts are issued. Payouts may be withheld, delayed, or forfeited if Klear Club determines, at its sole
                  discretion, that any Program terms have been violated or that referral activity is fraudulent,
                  misleading, or otherwise inconsistent with these Terms.
                </li>
                <li>
                  <strong>Termination of Affiliate Status:</strong> Klear Club may suspend or terminate your participation
                  in the Program at any time, for any reason, at its sole discretion. Upon termination, any unpaid
                  commissions may be forfeited.
                </li>
                <li>
                  <strong>Affiliate Advertising &amp; Content:</strong> You are solely responsible for all content,
                  advertising, claims, and representations you make in connection with the Program. Klear Club is not
                  responsible for, and does not endorse, any statements, marketing materials, social media posts, or other
                  content created by affiliates. All affiliate content must comply with these Terms, including but not
                  limited to the prohibitions on health claims, dosing information, and representations of human or animal
                  use.
                </li>
                <li>
                  <strong>Compliance:</strong> Affiliates must comply with all applicable laws, including FTC disclosure
                  requirements. Affiliate links and promotions must not imply that products are intended for human
                  consumption, therapeutic use, or any purpose other than laboratory research.
                </li>
                <li>
                  <strong>Indemnification:</strong> You agree to indemnify and hold harmless Klear Club from any claims,
                  damages, or liabilities arising from your affiliate activities, including any content, advertising, or
                  representations you make.
                </li>
              </ul>
              <p className="mb-6 text-gray-600">
                Klear Club reserves the right to modify, suspend, or discontinue the Program at any time without notice.
                Continued participation in the Program constitutes acceptance of any such changes.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">12. Assumption of Risk</h2>
              <p className="mb-6 text-gray-600 uppercase">
                YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT YOUR PURCHASE, POSSESSION, HANDLING, STORAGE, AND USE OF ANY
                PRODUCTS FROM KLEAR CLUB IS AT YOUR SOLE AND EXCLUSIVE RISK. KLEAR CLUB SELLS RESEARCH CHEMICALS INTENDED
                SOLELY FOR IN-VITRO LABORATORY USE. BY PURCHASING ANY PRODUCT, YOU VOLUNTARILY ASSUME ALL RISKS ASSOCIATED
                WITH THE PRODUCT, INCLUDING BUT NOT LIMITED TO RISKS ARISING FROM IMPROPER STORAGE, HANDLING,
                CONTAMINATION, DEGRADATION, MISUSE, OR ANY APPLICATION OF THE PRODUCT TO ANY HUMAN OR ANIMAL. YOU WAIVE
                ANY AND ALL CLAIMS AGAINST KLEAR CLUB ARISING FROM YOUR USE OR MISUSE OF PRODUCTS TO THE FULLEST EXTENT
                PERMITTED BY LAW.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">13. Disclaimer of Warranties</h2>
              <p className="mb-6 text-gray-600 uppercase">
                THE WEBSITE AND ALL PRODUCTS ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES
                OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, KLEAR CLUB DISCLAIMS ALL
                WARRANTIES, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE. WITHOUT LIMITING THE
                FOREGOING, KLEAR CLUB MAKES NO WARRANTY THAT: (A) PRODUCTS WILL MEET YOUR SPECIFIC RESEARCH REQUIREMENTS OR
                PRODUCE ANY PARTICULAR RESULTS; (B) PRODUCT QUALITY, PURITY, OR COMPOSITION WILL REMAIN UNCHANGED AFTER
                DELIVERY; (C) ANY INFORMATION, RESEARCH DATA, OR SCIENTIFIC REFERENCES ON THE WEBSITE ARE COMPLETE,
                ACCURATE, OR CURRENT; OR (D) THE WEBSITE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. CERTIFICATES OF
                ANALYSIS (COA) REFLECT TESTING RESULTS AT THE TIME OF ANALYSIS AND DO NOT CONSTITUTE A WARRANTY OF FITNESS
                FOR ANY SPECIFIC APPLICATION.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">14. Limitation of Liability</h2>
              <p className="mb-6 text-gray-600 uppercase">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, KLEAR CLUB AND ITS OWNERS, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS,
                AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR
                PUNITIVE DAMAGES ARISING FROM OR RELATED TO YOUR USE OF THE WEBSITE, PURCHASE OF PRODUCTS, OR ANY ACTIONS
                TAKEN BASED ON INFORMATION PROVIDED ON THE WEBSITE, INCLUDING BUT NOT LIMITED TO DAMAGES FOR PERSONAL
                INJURY, ILLNESS, DEATH, PROPERTY DAMAGE, LOSS OF PROFITS, LOSS OF DATA, BUSINESS INTERRUPTION, OR ANY OTHER
                COMMERCIAL OR PERSONAL DAMAGES OR LOSSES. OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING UNDER OR
                RELATED TO THESE TERMS SHALL NOT EXCEED THE AMOUNT YOU PAID TO KLEAR CLUB FOR THE SPECIFIC PRODUCT(S)
                GIVING RISE TO THE CLAIM. THIS LIMITATION APPLIES REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT, TORT,
                STRICT LIABILITY, OR OTHERWISE) AND EVEN IF KLEAR CLUB HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">15. Indemnification</h2>
              <p className="mb-4 text-gray-600">
                You agree to indemnify, defend, and hold harmless Klear Club, its owners, officers, directors, employees,
                agents, and affiliates (collectively, the &quot;Indemnified Parties&quot;) from and against any and all
                claims, demands, actions, suits, proceedings, damages, losses, liabilities, judgments, settlements, fines,
                penalties, costs, and expenses (including reasonable attorneys&apos; fees and legal costs) arising out of or
                related to:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-600">
                <li>
                  Your use, misuse, or handling of any products purchased from Klear Club, including but not limited to any
                  personal injury, illness, death, or property damage resulting from the administration, injection,
                  ingestion, or application of products to any human or animal
                </li>
                <li>
                  Any statements, claims, representations, or advice you make or provide to any third party regarding Klear
                  Club products, including but not limited to health claims, weight loss claims, therapeutic benefits,
                  dosing recommendations, or instructions for human or animal use
                </li>
                <li>
                  Any advertising, marketing, social media content, reviews, testimonials, or promotional materials you
                  create, publish, or distribute that reference Klear Club products, whether as a customer, affiliate, or
                  in any other capacity
                </li>
                <li>Any violation of these Terms, including the prohibited conduct outlined in Section 9</li>
                <li>
                  Any violation of applicable laws, regulations, or third-party rights in connection with your purchase,
                  possession, use, or distribution of products
                </li>
                <li>
                  Any regulatory action, investigation, or enforcement proceeding brought against Klear Club as a result of
                  your actions, statements, or use of products
                </li>
              </ul>
              <p className="mb-6 text-gray-600">
                This indemnification obligation survives the termination of your account and these Terms. Klear Club
                reserves the right to assume the exclusive defense and control of any matter subject to indemnification by
                you, at your expense. You agree not to settle any such matter without the prior written consent of Klear
                Club.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">16. Dispute Resolution &amp; Arbitration</h2>
              <p className="mb-4 font-semibold text-gray-700 uppercase">
                PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-600">
                <li>
                  <strong>Binding Arbitration:</strong> Any dispute, claim, or controversy arising out of or relating to
                  these Terms, your use of the Website, or any products purchased from Klear Club shall be resolved
                  exclusively through final and binding arbitration administered by the American Arbitration Association
                  (AAA) under its Commercial Arbitration Rules. The arbitration shall be conducted by a single arbitrator
                  in the State of New Jersey.
                </li>
                <li>
                  <strong>Class Action Waiver:</strong>{" "}
                  <span className="uppercase">
                    YOU AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT
                    IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. YOU WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION
                    LAWSUIT OR CLASS-WIDE ARBITRATION AGAINST KLEAR CLUB.
                  </span>
                </li>
                <li>
                  <strong>Small Claims Exception:</strong> Notwithstanding the above, either party may bring an individual
                  action in small claims court for disputes within the court&apos;s jurisdictional limits.
                </li>
                <li>
                  <strong>Injunctive Relief:</strong> Nothing in this section shall prevent Klear Club from seeking
                  injunctive or other equitable relief in any court of competent jurisdiction to protect its intellectual
                  property rights or to prevent irreparable harm.
                </li>
              </ul>
              <p className="mb-6 text-gray-600">
                By agreeing to these Terms, you acknowledge that you are waiving your right to a trial by jury and your
                right to participate in a class action.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">17. Governing Law</h2>
              <p className="mb-6 text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of the State of New Jersey,
                without regard to its conflict of law provisions. To the extent that litigation is permitted under these
                Terms, any legal proceedings shall be brought exclusively in the state or federal courts located in the
                State of New Jersey, and you consent to the personal jurisdiction of such courts.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">18. Changes to Terms</h2>
              <p className="mb-6 text-gray-600">
                We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the
                Website. Your continued use of the Website after changes constitutes acceptance of the modified Terms. It
                is your responsibility to review these Terms periodically for updates.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">19. Severability</h2>
              <p className="mb-6 text-gray-600">
                If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent
                jurisdiction, such finding shall not affect the validity of the remaining provisions, which shall continue
                in full force and effect.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">20. Waiver</h2>
              <p className="mb-6 text-gray-600">
                The failure of Klear Club to enforce any right or provision of these Terms shall not constitute a waiver of
                such right or provision. Any waiver of any provision of these Terms will be effective only if in writing
                and signed by Klear Club. No single or partial exercise of any right or remedy shall preclude any further
                exercise of such right or remedy or the exercise of any other right or remedy.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">21. Entire Agreement</h2>
              <p className="mb-6 text-gray-600">
                These Terms, together with our{" "}
                <Link href="/privacy" className="text-black underline">
                  Privacy Policy
                </Link>
                ,{" "}
                <Link href="/disclaimer" className="text-black underline">
                  Disclaimer
                </Link>
                , and any other policies referenced herein, constitute the entire agreement between you and Klear Club
                regarding your use of the Website and purchase of products. These Terms supersede all prior or
                contemporaneous communications, representations, or agreements, whether oral or written, between you and
                Klear Club. No statement, representation, or promise made by any Klear Club employee, agent, or
                representative, whether through customer support, email, social media, or any other channel, shall modify
                or supplement these Terms unless expressly set forth in a written amendment signed by an authorized officer
                of Klear Club.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">
                22. Information You Provide; Our Rights to Use, Share, and Transfer
              </h2>
              <p className="mb-4 text-gray-600">
                By creating an account, placing an order, signing up for communications, or otherwise interacting with the
                Website, you provide information about yourself and your activity (collectively, &quot;Your
                Information&quot;), which may include identifiers (such as name, email address, mailing address, and phone
                number), order and purchase history, payment metadata (excluding full card numbers), device and browsing
                data, IP address, location data derived from your IP address or shipping address, communications with us,
                affiliate referral data, loyalty and membership data, and inferences drawn from any of the foregoing.
              </p>
              <p className="mb-4 text-gray-600">
                You grant Klear Club a perpetual, irrevocable, worldwide, royalty-free, fully paid-up, sublicensable, and
                transferable license to collect, store, use, process, analyze, combine, disclose, share, transfer, license,
                monetize, and otherwise exploit Your Information for any lawful purpose, including without limitation:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-600">
                <li>operating, securing, improving, and personalizing the Website, products, and services;</li>
                <li>
                  fulfilling orders, processing payments, providing customer support, and complying with legal obligations;
                </li>
                <li>
                  sending you transactional, account, service, marketing, and promotional communications regarding products
                  or services offered by Klear Club, our Affiliates (as defined below), our successors and assigns, and any
                  related research, laboratory supply, wellness, consumer-health, pharmacy, telehealth, or
                  practitioner-facing enterprise now operated by, or hereafter formed, acquired, or partnered with, any of
                  the foregoing;
                </li>
                <li>
                  creating aggregated, de-identified, anonymized, pseudonymized, or otherwise derived data sets, which
                  Klear Club shall own outright and may use, license, transfer, or commercialize without restriction and
                  without further obligation to you;
                </li>
                <li>
                  training, evaluating, and improving statistical, analytical, machine-learning, and artificial-intelligence
                  models, whether operated by Klear Club, our Affiliates, or our service providers;
                </li>
                <li>
                  conducting research, analytics, market analysis, forecasting, segmentation, fraud prevention, and
                  risk-scoring;
                </li>
                <li>
                  sharing Your Information with Affiliates, successors and assigns, service providers, processors, payment
                  providers, carriers, advertising and analytics partners, professional advisors, and other parties acting
                  on our behalf or in connection with the purposes described above; and
                </li>
                <li>
                  transferring or assigning Your Information, together with your rights and obligations under these Terms,
                  to any acquirer, investor, lender, successor, or other party in connection with any merger, acquisition,
                  reorganization, sale of assets, financing, bankruptcy, or similar transaction or proceeding.
                </li>
              </ul>
              <p className="mb-4 text-gray-600">
                For purposes of these Terms, &quot;Affiliates&quot; means any entity, brand, product line, or business that
                is now or hereafter directly or indirectly controlling, controlled by, or under common ownership, control,
                or management with Klear Club, regardless of legal form, jurisdiction, industry, or operating name, and
                includes parents, subsidiaries, sister entities, joint ventures, and successor entities of any of the
                foregoing. Sharing Your Information with an Affiliate for the purposes described in these Terms is an
                internal use within a common enterprise and is not a sale of personal information for purposes of
                applicable consumer-privacy law.
              </p>
              <p className="mb-4 text-gray-600">
                You expressly consent to receive marketing and promotional communications from Klear Club, our Affiliates,
                and our successors and assigns, by email, SMS (subject to Section 23), push notification, postal mail,
                in-app message, or any other channel for which you have provided contact information. Consent to marketing
                is not a condition of purchase. You may opt out of marketing communications at any time using the
                unsubscribe link in any marketing email or by replying STOP to any marketing text message; transactional
                and service messages will continue.
              </p>
              <p className="mb-4 text-gray-600">
                Depending on your state of residence, you may have additional rights under applicable consumer-privacy
                laws, including the right to know, access, correct, delete, limit, or opt out of certain uses, sales,
                sharing, or targeted advertising of your personal information. The scope of those rights and how to
                exercise them are described in our{" "}
                <Link href="/privacy" className="text-black underline">
                  Privacy Policy
                </Link>
                . Nothing in these Terms limits or waives any right that applicable law makes non-waivable.
              </p>
              <p className="mb-6 text-gray-600">
                The licenses, consents, and authorizations in this Section survive the termination of your account and
                these Terms. If any portion of this Section is found to be unenforceable in any jurisdiction, the remaining
                portions shall continue in full force and effect to the maximum extent permitted by law.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">23. SMS/Messaging Terms &amp; Conditions</h2>
              <div className="mb-6 rounded-xl bg-gray-50 p-6 text-gray-700">
                <p>
                  <strong>Klear Club</strong>
                  <br />
                  Email:{" "}
                  <a href="mailto:support@klearclub.com" className="text-black underline">
                    support@klearclub.com
                  </a>
                </p>
              </div>

              <h3 className="mb-3 mt-8 text-xl font-semibold text-black">General</h3>
              <p className="mb-4 text-gray-600">When you opt-in to the service, we will send you a message to confirm your signup.</p>
              <p className="mb-4 text-gray-600">
                By opting into messages, you agree to receive recurring automated marketing and informational text messages
                from Klear Club. Automated messages may be sent using an automatic telephone dialing system to the mobile
                telephone number you provided when signing up or any other number that you designate.
              </p>
              <p className="mb-4 text-gray-600">
                Message frequency varies, and additional mobile messages may be sent periodically based on your interaction
                with Klear Club. Klear Club reserves the right to alter the frequency of messages sent at any time to
                increase or decrease the total number of sent messages. Klear Club also reserves the right to change the
                short code or phone number or alphanumeric sender where messages are sent.
              </p>
              <p className="mb-4 text-gray-600">
                Your usual message and data rates may apply. If you have any questions about your text plan or data plan, it
                is best to contact your mobile provider. Your mobile provider is not liable for delayed or undelivered
                messages.
              </p>
              <p className="mb-6 text-gray-600">Your consent to receive marketing messages is not a condition of purchase.</p>

              <h3 className="mb-3 mt-8 text-xl font-semibold text-black">Carriers</h3>
              <p className="mb-6 text-gray-600">Carriers are not liable for delayed or undelivered messages.</p>

              <h3 className="mb-3 mt-8 text-xl font-semibold text-black">Cancellation</h3>
              <p className="mb-6 text-gray-600">
                Messages will provide instructions to unsubscribe either by texting STOP or through an included link. After
                you unsubscribe, we will send you a message to confirm that you have been unsubscribed and no more messages
                will be sent. If you would like to receive messages from Klear Club again, just sign up as you did the first
                time and Klear Club will start sending messages to you again.
              </p>

              <h3 className="mb-3 mt-8 text-xl font-semibold text-black">Info</h3>
              <p className="mb-6 text-gray-600">
                For support regarding our services, email us at{" "}
                <a href="mailto:support@klearclub.com" className="text-black underline">
                  support@klearclub.com
                </a>{" "}
                or, if supported, text &quot;HELP&quot; to our messages at any time and we will respond with instructions on
                how to unsubscribe. If we include a link in messages we send you from Klear Club, you may also access
                instructions on how to unsubscribe and our company information by following that link.
              </p>

              <h3 className="mb-3 mt-8 text-xl font-semibold text-black">Transfer of Number</h3>
              <p className="mb-6 text-gray-600">
                You agree that before changing your mobile number or transferring your mobile number to another individual,
                you will either reply &quot;STOP&quot; from the original number, unsubscribe using the link included in our
                messages (if one is provided), or notify us of your old number at{" "}
                <a href="mailto:support@klearclub.com" className="text-black underline">
                  support@klearclub.com
                </a>
                . The duty to inform us based on the above events is a condition of using this service to receive messages.
              </p>

              <h3 className="mb-3 mt-8 text-xl font-semibold text-black">Privacy</h3>
              <p className="mb-6 text-gray-600">
                If you have any questions about your data or our privacy practices, please visit our{" "}
                <Link href="/privacy" className="text-black underline">
                  Privacy Policy
                </Link>
                .
              </p>

              <h3 className="mb-3 mt-8 text-xl font-semibold text-black">Messaging Terms Changes</h3>
              <p className="mb-6 text-gray-600">
                We reserve the right to change or terminate our messaging program at any time. We also reserve the right to
                update these Messaging Terms at any time. Such changes will be effective immediately upon posting. If you
                do not agree to a change to these Messaging Terms, you should cancel your enrollment with our messaging
                program. Your continued enrollment following such changes shall constitute your acceptance of such changes.
              </p>

              <h2 className="mb-4 mt-12 text-2xl font-semibold text-black">24. Contact Information</h2>
              <p className="mb-6 text-gray-600">For questions about these Terms, please contact us:</p>
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
