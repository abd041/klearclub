export type FaqLink = {
  href: string;
  label: string;
};

export type FaqItem = {
  question: string;
  answer: string;
  link?: FaqLink;
};

export type FaqSection = {
  title: string;
  items: FaqItem[];
};

export const faqSections: FaqSection[] = [
  {
    title: "Ordering",
    items: [
      {
        question: "How do I place an order?",
        answer:
          "Browse 40+ research compounds, including ready-to-use sprays and blends, add to your cart, and check out. We accept Visa and American Express cards plus Apple Pay and Google Pay, and your order enters processing shortly after payment confirmation.",
        link: { href: "/store", label: "Browse the catalog" },
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Visa and American Express credit cards, plus Apple Pay and Google Pay. All transactions are processed through secure, encrypted payment gateways to protect your information.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "Orders can be modified or cancelled within 1 hour of placement. After this window, orders enter processing and cannot be changed. Contact support@klearclub.com immediately if you need to make changes.",
      },
    ],
  },
  {
    title: "Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Orders are processed within 0-2 business days, and standard shipping typically arrives within 1-4 business days from fulfillment. 2-day and overnight options are available at checkout. Every order ships discreetly and includes free shipment protection.",
      },
      {
        question: "How are peptides packaged for shipping?",
        answer:
          "No cold chain needed: our peptides ship lyophilized (freeze-dried), which makes them highly stable with a long shelf life regardless of shipping conditions or heat. Each vial is securely cushioned in discreet packaging to prevent physical damage in transit.",
      },
    ],
  },
  {
    title: "Products",
    items: [
      {
        question: "What is the purity of your peptides?",
        answer:
          "Every peptide we supply meets a 99%+ purity standard, and every batch is tested 8 separate ways at an independent ISO 17025 accredited lab. Certificates of Analysis (CoA) with the full 8-assay panel are published for every product.",
        link: { href: "/coa", label: "Browse the certificate library" },
      },
      {
        question: "How do I verify the vial in my hand?",
        answer:
          "Every vial label carries a QR code. Scan it and you land on that exact batch's certificate, already highlighted, so you can match the lot number on your label to its published lab results in seconds.",
        link: { href: "/coa", label: "Or search certificates by lot number" },
      },
      {
        question: "Do you carry sprays?",
        answer:
          "Yes. Select compounds are available as ready-to-use liquid spray formats alongside the classic lyophilized vials, with the same third-party testing and published certificates on every batch.",
        link: { href: "/store?category=sprays", label: "Shop spray formats" },
      },
      {
        question: "How should I store my peptides?",
        answer:
          "Sealed lyophilized vials are heat-stable and keep well at room temperature in a cool, dark place. Refrigerating or freezing sealed vials is optional; stability doesn't change much either way as long as the vial stays sealed. Protect from light, and once a vial is reconstituted, refrigerate it at 2-8°C.",
      },
      {
        question: "What is Klear H2O?",
        answer:
          "Klear H2O is sterile water containing 0.9% benzyl alcohol as a preservative. It is a standard laboratory supply used in research settings. We offer Klear H2O in our store as research supply.",
      },
    ],
  },
  {
    title: "Savings & Rewards",
    items: [
      {
        question: "How do loyalty points work?",
        answer:
          "Every order earns points automatically: 2.5 points per $1 on a free account. 100 points equals $1 off at cart or checkout, applied like cash back in 100-point steps. Your balance lives in your account and never needs a code.",
        link: { href: "/account", label: "Check your points balance" },
      },
      {
        question: "What does a membership get me?",
        answer:
          "Paid tiers earn points faster: Insider 3.5, VIP 5, and Founder 10 points per $1, up to 4x the free rate. That means cash back stacks on every order, and members get early access to new compounds.",
        link: { href: "/membership", label: "Compare membership tiers" },
      },
      {
        question: "What is Build-a-Box?",
        answer:
          "Pick any 4 research compounds from the catalog and we pack and ship them monthly at 40% off retail, with a free Klear H2O in every box and free 2-day delivery. Swap items anytime after your first delivery. 3 monthly deliveries to start, then cancel anytime.",
        link: { href: "/build-a-box", label: "Build your box" },
      },
      {
        question: "How do bulk orders work?",
        answer:
          "Order 10+ units of any compound (across its dosages) and every unit is 40% off. Reach 50+ units of that product and the whole line drops to 50% off. One-time orders, no subscription, with free 2-day delivery and an adult signature on delivery. Same CoA-verified vials as every other order.",
        link: { href: "/bulk", label: "See bulk pricing" },
      },
    ],
  },
  {
    title: "Quality & Testing",
    items: [
      {
        question: "Are your peptides third-party tested?",
        answer:
          "Yes, 8x tested: every batch runs an 8-assay panel at an independent ISO 17025 accredited laboratory covering peptide purity (HPLC), net peptide content, identity, appearance, fentanyl screen, heavy metals (ICP-MS), sterility (PCR), and endotoxin. Full results are published as Certificates of Analysis (CoA).",
        link: { href: "/coa", label: "See the full 8-assay panel" },
      },
      {
        question: "How do I access Certificates of Analysis?",
        answer:
          "Three ways: browse the full certificate library on our CoA page, open any product page and scroll to its certificates, or scan the QR code on your vial to jump straight to that batch. You can also request specific CoAs by emailing support@klearclub.com with your order number.",
        link: { href: "/coa", label: "Open the certificate library" },
      },
      {
        question: "Where are your peptides manufactured?",
        answer:
          "Our research peptides are synthesized by vetted, USA-based manufacturing partners operating documented quality procedures. We maintain complete supply chain transparency and never source from overseas manufacturers.",
      },
    ],
  },
  {
    title: "Returns & Support",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We offer damage protection on every order. If your product arrives damaged in transit, contact us with photos for a one-time replacement. All claims require photo evidence and are subject to review. One replacement per customer per order. Reconstituted products are not eligible. We do not offer refunds for change of mind or misuse.",
      },
      {
        question: "Is everything you sell research use only?",
        answer:
          "Yes. Every product is sold strictly for in-vitro research, laboratory experimentation, and educational purposes, and is not intended for human, veterinary, or food use.",
        link: { href: "/disclaimer", label: "Read the research-use terms" },
      },
      {
        question: "How do I contact customer support?",
        answer:
          "Email us at support@klearclub.com for any questions or concerns. We typically respond within 24 hours on business days. A person reads every message.",
      },
    ],
  },
];

/** Flat list kept for any simple consumers */
export const faqs = faqSections.flatMap((section) =>
  section.items.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
);
