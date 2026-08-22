import Link from "next/link";

/**
 * Live: aminoclub.com/us/affiliate-terms
 * Clean legal doc layout (no vial hero) — Partner Program Terms v1.3
 */
export function AffiliateTermsPageContent() {
  return (
    <main className="bg-white">
      <div className="site-container py-12 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
              Partner Program · Version v1.3 · Effective May 25, 2026
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-black md:text-4xl">
              Referral Partner Program Terms
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              These Terms govern your participation in the Klear Club Referral Partner Program (the &quot;Program&quot;). By
              creating a partner code, clicking any acknowledgement, or otherwise participating in the Program, you agree
              to be bound by these Terms and all linked policies.{" "}
              <strong className="font-semibold text-black">
                Please read carefully — Section 14 contains an arbitration agreement and class-action waiver.
              </strong>
            </p>
          </div>

          <div className="max-w-none space-y-0 text-gray-700">
            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">1. Eligibility and Authority</h2>
              <p>
                You must be at least 21 years of age and legally able to enter into contracts in your jurisdiction. You
                represent and warrant that all information you provide is accurate and that you have full power and
                authority to enter into and perform under these Terms. You may not participate if Klear Club has previously
                terminated your partner account, unless we expressly reinstate you in writing.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">
                2. Independent Relationship — No Authority to Bind
              </h2>
              <p>
                You are an independent referrer, not an employee, agent, contractor, joint venturer, partner, or franchisee
                of Klear Club. You have{" "}
                <strong className="font-semibold text-black">no authority</strong> to bind Klear Club, accept payments on
                its behalf, negotiate on its behalf, make representations about Klear Club, or hold yourself out as a
                representative, spokesperson, or official source of Klear Club. You may not register domain names, social
                media handles, email addresses, or any other identifiers that could reasonably be confused with Klear
                Club&apos;s own properties.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">3. License to Use Brand Assets</h2>
              <p>
                Subject to these Terms, Klear Club grants you a limited, revocable, non-exclusive, non-transferable,
                non-sublicensable license to share your referral link and to mention Klear Club&apos;s product names in
                accurate, non-disparaging contexts. You may not modify our logos, marks, or trade dress, create derivative
                branding, or use any Klear Club asset in a way that suggests endorsement, sponsorship, or official
                representation. This license terminates automatically upon any suspension or termination of your account,
                or at any time at Klear Club&apos;s sole discretion upon notice.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">
                4. Content Responsibilities and Restrictions
              </h2>
              <p className="mb-4">
                You are <strong className="font-semibold text-black">solely and personally responsible</strong> for the
                truth, legality, accuracy, and consequences of every statement, post, video, message, livestream,
                advertisement, or other communication you publish in connection with your referral activity. Klear Club
                does not control, dictate, supervise, edit, or pre-approve your content and shall not be deemed a
                publisher, sponsor, or endorser of any of your content.
              </p>
              <p className="mb-3 font-semibold text-black">You will not:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Describe Klear Club products as suitable, safe, or intended for human use, human consumption, ingestion,
                  injection, self-administration, dietary or supplement use, cosmetic use, veterinary use, or any medical
                  or therapeutic application;
                </li>
                <li>
                  Provide dosing, administration, cycling, or usage instructions of any kind directed at humans or animals;
                </li>
                <li>
                  Claim or imply that any Klear Club product treats, cures, mitigates, diagnoses, prevents, or alleviates
                  any disease, illness, condition, symptom, or biological function;
                </li>
                <li>
                  Make any health, performance, hormonal, anti-aging, recovery, weight, fitness, or aesthetic claims;
                </li>
                <li>
                  Misrepresent the discount amount, fabricate discount percentages or limited-time offers, or otherwise
                  mislead customers about pricing, savings, or program terms;
                </li>
                <li>
                  Make false, misleading, deceptive, exaggerated, or unsubstantiated claims about Klear Club, its products,
                  pricing, discounts, or business practices;
                </li>
                <li>
                  Use Klear Club&apos;s name, trademarks, or marks in paid search campaigns, in domain names, or in any
                  manner that would mislead consumers about the source of the offer;
                </li>
                <li>
                  Promote Klear Club on platforms that prohibit such promotion or that primarily host content directed to
                  minors;
                </li>
                <li>
                  Engage in negative SEO, brand bidding, cookie stuffing, self-referrals, fake clicks, or any practice
                  designed to inflate or manipulate commissions.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">
                5. Required Disclosures (FTC and Equivalent)
              </h2>
              <p>
                You must clearly and conspicuously disclose your material connection to Klear Club in every piece of
                content where you include your referral code, your referral link, or any reference to Klear Club&apos;s
                products. Acceptable disclosures include &quot;#ad&quot;, &quot;#affiliate&quot;, or plain-language
                statements such as &quot;I earn a commission from this link.&quot; Disclosures must not be buried,
                abbreviated to ambiguous shorthand, or relegated to fine print. You are responsible for complying with the
                FTC Endorsement Guides and any equivalent rules in every jurisdiction where your audience is located.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">6. Lawful Conduct; Anti-Fraud</h2>
              <p>
                You will comply with all applicable federal, state, local, and international laws and regulations,
                including (without limitation) anti-spam laws (CAN-SPAM, CASL, GDPR, ePrivacy), consumer protection
                statutes, advertising disclosure rules, securities laws, export controls, sanctions laws, and intellectual
                property rights. You will not engage in spam, unsolicited bulk messaging, scraping, account takeover,
                fraudulent clicks, cookie stuffing, self-referrals, identity misuse, AI-generated impersonation, deepfakes
                purporting to show Klear Club personnel or products, or any other practice designed to deceive, inflate, or
                manipulate Program metrics.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">
                7. Commissions, Payouts, and Withholding Rights
              </h2>
              <p className="mb-4">
                Commission rates and the payout schedule are as posted on the{" "}
                <Link href="/partners" className="text-black underline">
                  Partner Program page
                </Link>{" "}
                and may be updated at any time at Klear Club&apos;s sole discretion. Earned commissions are subject to
                chargebacks, returns, refunds, and fraud reviews.{" "}
                <strong className="font-semibold text-black">
                  Klear Club may withhold, delay, offset, claw back, forfeit, or refuse to pay
                </strong>{" "}
                any earned but unpaid commission, in whole or in part, at its sole discretion, including (but not limited
                to) cases where Klear Club has a good-faith belief that you have breached these Terms, manipulated the
                Program, engaged in fraud, generated suspicious activity, or where withholding is necessary to comply with
                law, tax obligations, court order, or third-party demand. Withheld commissions may be permanently
                forfeited. You waive any right to demand payment on a fixed schedule and acknowledge that Klear Club&apos;s
                payment obligations are conditional on ongoing program compliance.
              </p>
              <p className="mb-4">
                <strong className="font-semibold text-black">Tax responsibility.</strong> You are solely responsible for all
                federal, state, local, and foreign taxes, duties, levies, withholdings, social-security contributions, and
                similar charges arising from any commission or other amount paid to you under the Program. Klear Club has
                no obligation to advise you on tax matters, no obligation to gross-up or reimburse you for any tax
                liability, and no obligation to file or pay taxes on your behalf except as expressly required by law (for
                example, issuing IRS Form 1099-NEC or equivalent informational filings). You will keep your tax forms (W-9,
                W-8BEN, W-8BEN-E, or equivalent) accurate and current.
              </p>
              <p>
                <strong className="font-semibold text-black">
                  KYC, sanctions, and AML processing are a federal legal requirement.
                </strong>{" "}
                Before any payout can be released, our third-party payment processor is required by U.S. federal law
                (including the Bank Secrecy Act, USA PATRIOT Act, OFAC sanctions regulations, and IRS reporting rules) and
                applicable foreign law to verify your identity (KYC), screen you against sanctions lists (OFAC SDN, U.S.
                Treasury, and equivalent international watchlists), perform anti-money-laundering (AML) review, and collect
                and validate an applicable tax form. If you fail any portion of this processing — for any reason, including
                inaccurate submitted information, identity verification failure, sanctions-list hits, incomplete or invalid
                tax forms, prohibited jurisdiction, or processor decision —{" "}
                <strong className="font-semibold text-black">Klear Club is legally prohibited from paying you,</strong> and
                your unpaid commissions will be held until the issue is resolved or, if not resolved within a reasonable
                time as determined by Klear Club, may be forfeited. Klear Club has no liability for any delay, denial,
                withholding, forfeiture, or non-payment of commissions arising from your failure to pass processing or from
                any compliance action our payment processor takes. This processing requirement cannot be waived,
                overridden, or worked around.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">8. Strike System and Fairness</h2>
              <p className="mb-4">
                Klear Club may issue strikes for violations of these Terms. Each strike has a stated reason, a category, a
                severity (warning, strike, or final), and a status (active, appealed, or resolved). The default thresholds
                and protections are:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6">
                <li>
                  <strong className="font-semibold text-black">Notification.</strong> Klear Club will use commercially
                  reasonable efforts to notify you by email of any strike within 24 hours of issuance, including the reason
                  and appeal instructions.{" "}
                  <strong className="font-semibold text-black">
                    By participating in the Partner Program, you also consent to receive transactional SMS messages
                  </strong>{" "}
                  at the mobile number associated with your account regarding compliance actions (strikes, suspensions,
                  appeal status) and payout events (payout submitted, completed, or failed). Message and data rates may
                  apply. SMS frequency is event-driven and low (typically less than one per month). Reply STOP to opt out of
                  SMS; you will continue to receive equivalent notices by email. Opting out of SMS does not exempt you from
                  compliance with the Partner Program Terms.
                </li>
                <li>
                  <strong className="font-semibold text-black">Warning vs. Strike vs. Final.</strong> For minor, first-time,
                  cureable violations, Klear Club may issue a &quot;warning&quot; that does NOT count toward the suspension
                  threshold. &quot;Strike&quot; severity counts toward the threshold. &quot;Final&quot; severity triggers
                  immediate suspension regardless of count and is reserved for serious violations such as fraud, repeated
                  medical claims, or willful misconduct.
                </li>
                <li>
                  <strong className="font-semibold text-black">Rolling expiry.</strong> Active strikes older than 365 days
                  from issuance automatically stop counting toward the suspension threshold (the underlying record is
                  retained for audit).
                </li>
                <li>
                  <strong className="font-semibold text-black">Appeals.</strong> You may appeal any strike within 30 days of
                  issuance by contacting{" "}
                  <a href="mailto:support@klearclub.com" className="text-black underline">
                    support@klearclub.com
                  </a>{" "}
                  with the strike ID and your written response. Appealed strikes pause counting toward the threshold while
                  under review.
                </li>
                <li>
                  <strong className="font-semibold text-black">Threshold.</strong> Three (3) counting strikes automatically
                  suspend your account.
                </li>
              </ul>
              <p>
                <strong className="font-semibold text-black">The above are non-binding guidelines.</strong> You acknowledge
                and agree that Klear Club retains sole discretion under Section 9 to issue, classify, skip, or escalate
                strikes, to deviate from these defaults, and to suspend or terminate your account immediately without prior
                notice, without opportunity to cure, and without observing the strike sequence. Nothing in this Section
                creates a contractual right to a specific enforcement process.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">
                9. Sole-Discretion Enforcement; At-Will Termination
              </h2>
              <p className="mb-4">
                You expressly acknowledge and agree that{" "}
                <strong className="font-semibold text-black">
                  Klear Club may, at its sole and absolute discretion, at any time, with or without cause, and with or
                  without prior notice:
                </strong>
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6">
                <li>Terminate this agreement and your participation in the Program for any reason or no reason;</li>
                <li>Suspend, restrict, modify, or close your partner account;</li>
                <li>
                  Deactivate your referral code, revoke your license to use Klear Club&apos;s brand assets, and require
                  removal of any content referencing Klear Club;
                </li>
                <li>
                  Withhold, delay, offset, claw back, forfeit, or refuse to pay any earned but unpaid commissions, in whole
                  or in part, with or without explanation;
                </li>
                <li>
                  Choose the type, severity, sequence, combination, and timing of any enforcement action, including
                  warnings, strikes, payout holds, account suspension, or termination;
                </li>
                <li>Interpret and apply these Terms in the manner Klear Club determines is appropriate;</li>
                <li>
                  Decline to enter into or renew the Program relationship with any person, with or without reason.
                </li>
              </ul>
              <p>
                You waive any claim that Klear Club must follow a specific process, sequence, standard of proof, or notice
                period before exercising any of the foregoing rights, except as required by applicable non-waivable law.{" "}
                <strong className="font-semibold text-black">
                  No course of dealing, custom, or prior leniency by Klear Club shall constitute a waiver of these rights.
                </strong>{" "}
                Termination by Klear Club shall not give rise to any liability or damages of any kind, and you release
                Klear Club from any such claim.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">
                10. Audit, Investigation, and Cooperation
              </h2>
              <p>
                Klear Club may, at any time and at its discretion, review, audit, monitor, archive, or investigate your
                content, communications, click sources, referred orders, payment behavior, identity, and tax information
                for compliance with these Terms or applicable law. You agree to cooperate in good faith with any such
                review, including providing records, taking down content within 24 hours of request, and responding to
                written inquiries. Failure to cooperate is itself a material breach and grounds for immediate suspension or
                termination.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">11. Confidentiality</h2>
              <p>
                Non-public information you receive about the Program (including commission structures, payout volumes,
                conversion data, roadmaps, business plans, internal communications, this T&amp;C version history, and any
                beta features) is <strong className="font-semibold text-black">Confidential Information</strong>. You will
                not disclose Confidential Information to any third party or use it other than to perform under these Terms,
                both during and after your participation. This obligation survives termination indefinitely.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">12. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless Klear Club, its affiliates, parents, subsidiaries,
                officers, directors, employees, agents, and contractors from and against all third-party claims, regulatory
                actions, damages, losses, liabilities, fines, costs, and expenses (including reasonable attorneys&apos; fees
                and costs of defense) arising out of or relating to: (a) your content; (b) your acts or omissions; (c) your
                breach of these Terms or any representation, warranty, or covenant herein; (d) your violation of any law or
                third-party right (including IP, privacy, publicity, or contract rights); or (e) your relationship with any
                referred customer. Klear Club may elect to assume the defense of any matter, in which case you will
                cooperate at your expense and will not settle any claim without Klear Club&apos;s prior written consent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">
                13. Disclaimers; Limitation of Liability
              </h2>
              <p className="mb-4">
                The Program is provided{" "}
                <strong className="font-semibold text-black">&quot;AS IS&quot; and &quot;AS AVAILABLE.&quot;</strong> Klear
                Club disclaims all warranties, express, implied, statutory, or otherwise, including any warranties of
                merchantability, fitness for a particular purpose, non-infringement, accuracy, uptime, or that the Program
                will be uninterrupted, error-free, or profitable.
              </p>
              <p>
                <strong className="font-semibold text-black">
                  To the maximum extent permitted by law, in no event shall Klear Club be liable for any indirect,
                  incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenues,
                  data, business opportunities, or goodwill,
                </strong>{" "}
                whether arising from contract, tort (including negligence), strict liability, statute, or otherwise, even if
                Klear Club has been advised of the possibility of such damages.{" "}
                <strong className="font-semibold text-black">
                  Klear Club&apos;s aggregate liability under or relating to these Terms is limited to the lesser of (a) the
                  total commissions actually paid to you by Klear Club in the six (6) months preceding the claim, or (b) one
                  thousand U.S. dollars ($1,000).
                </strong>
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">
                14. Arbitration; Class-Action Waiver
              </h2>
              <p className="mb-4">
                <strong className="font-semibold text-black">
                  READ THIS SECTION CAREFULLY — IT AFFECTS YOUR RIGHTS.
                </strong>{" "}
                Any dispute, claim, or controversy arising out of or relating to these Terms or the Program (a
                &quot;Dispute&quot;), other than a Dispute concerning intellectual property or injunctive relief, shall be
                resolved exclusively through{" "}
                <strong className="font-semibold text-black">final and binding individual arbitration</strong> administered
                by the American Arbitration Association (&quot;AAA&quot;) under its Consumer Arbitration Rules, in
                Wilmington, Delaware or by video conference. The arbitrator&apos;s decision is final and judgment may be
                entered in any court of competent jurisdiction.
              </p>
              <p className="mb-4">
                <strong className="font-semibold text-black">
                  You waive any right to participate in any class action, class-wide arbitration, private attorney general
                  action, or other representative proceeding
                </strong>{" "}
                with respect to a Dispute. The arbitrator may not consolidate claims or preside over any form of class
                proceeding. If this class-action waiver is found unenforceable, the entirety of this Section 14 shall be
                null and void, and the Dispute shall be litigated in the state or federal courts located in Wilmington,
                Delaware, and you irrevocably consent to personal jurisdiction there.
              </p>
              <p>
                You may opt out of arbitration within 30 days of first accepting these Terms by sending written notice to{" "}
                <a href="mailto:support@klearclub.com" className="text-black underline">
                  support@klearclub.com
                </a>{" "}
                including your full name and account email.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">15. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of Delaware, without regard to its conflict-of-laws
                principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">
                16. Future Modifications; Electronic Acceptance
              </h2>
              <p className="mb-4">
                <strong className="font-semibold text-black">Klear Club may modify these Terms at any time.</strong>{" "}
                Modifications take effect upon posting an updated version with a new effective date. Material modifications
                will be flagged in your partner dashboard and may require a fresh click-wrap acknowledgement before
                continued payouts. Your continued participation in the Program after the effective date of any update
                constitutes <strong className="font-semibold text-black">binding acceptance</strong> of the update,
                regardless of whether you have re-acknowledged the specific revision. Failure to acknowledge a required
                revision does not give rise to any claim against Klear Club; it only pauses your participation and payouts
                until you act.
              </p>
              <p>
                You consent to electronic records and signatures pursuant to the U.S. Electronic Signatures in Global and
                National Commerce Act (E-SIGN), the Uniform Electronic Transactions Act (UETA), and any equivalent local
                law. You agree that click-wrap acceptance through your partner dashboard, including any future
                re-acknowledgement prompt, constitutes a legally binding signature with the same force as a handwritten
                signature.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">17. Notice</h2>
              <p>
                All notices to you under these Terms may be delivered by Klear Club via email to your address of record, by
                posting in your partner dashboard, or by any other reasonable means. Notice is deemed received within 24
                hours of being sent or posted. Notices to Klear Club must be sent to{" "}
                <a href="mailto:support@klearclub.com" className="text-black underline">
                  support@klearclub.com
                </a>
                .
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">
                18. Survival; Severability; Waiver; Assignment
              </h2>
              <p className="mb-3">
                <strong className="font-semibold text-black">Survival.</strong> Sections 2, 4, 6, 7, 9–14, 16, and 18 survive
                any termination or expiration.
              </p>
              <p className="mb-3">
                <strong className="font-semibold text-black">Severability.</strong> If any provision of these Terms is held
                invalid or unenforceable, the remaining provisions remain in full force and effect.
              </p>
              <p className="mb-3">
                <strong className="font-semibold text-black">Waiver.</strong> No failure or delay by Klear Club in exercising
                any right or remedy shall operate as a waiver.
              </p>
              <p className="mb-3">
                <strong className="font-semibold text-black">Assignment.</strong> Klear Club may freely assign these Terms,
                in whole or in part, to any affiliate or successor in interest. You may not assign these Terms without
                Klear Club&apos;s prior written consent; any prohibited assignment is void.
              </p>
              <p className="mb-3">
                <strong className="font-semibold text-black">Force Majeure.</strong> Klear Club is not liable for any delay
                or failure to perform caused by events outside its reasonable control, including acts of God, war,
                terrorism, pandemic, civil unrest, labor disputes, internet outages, payment processor failures, or
                government action.
              </p>
              <p className="mb-3">
                <strong className="font-semibold text-black">No Third-Party Beneficiaries.</strong> These Terms do not confer
                any rights on any person other than the parties.
              </p>
              <p className="mb-3">
                <strong className="font-semibold text-black">Headings.</strong> Section headings are for convenience only and
                do not affect interpretation.
              </p>
              <p>
                <strong className="font-semibold text-black">Entire Agreement.</strong> These Terms (together with the
                on-file acknowledgements and any policies linked from here) constitute the entire agreement between you and
                Klear Club regarding the Program and supersede all prior oral or written agreements, representations, or
                understandings.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="mb-3 text-xl font-semibold text-black md:text-2xl">19. Contact</h2>
              <p>
                Questions about these Terms or the Program:{" "}
                <a href="mailto:support@klearclub.com" className="text-black underline">
                  support@klearclub.com
                </a>
                .
              </p>
            </section>

            <div data-terms-end="true" className="pt-4 text-center text-xs text-gray-400">
              — End of Partner Program Terms · Version v1.3 · Effective May 25, 2026 —
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
