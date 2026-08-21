import { BulkOrdersSection } from "@/components/BulkOrdersSection";
import { CatalogGateSection } from "@/components/CatalogGateSection";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { HomeCtaSubscribeSection } from "@/components/HomeCtaSubscribeSection";
import { HomeFaqSection } from "@/components/HomeFaqSection";
import { HomeHero } from "@/components/HomeHero";
import { QualityVerifySection } from "@/components/QualityVerifySection";
import { ResearchBundlesSection } from "@/components/ResearchBundlesSection";
import { SucceedSection } from "@/components/SucceedSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { SubscriptionBoxSection } from "@/components/SubscriptionBoxSection";

export default function HomePage() {
  return (
    <div>
      <section className="grid bg-white lg:grid-cols-2">
        <HomeHero />
        <GuaranteeSection />
      </section>
      <SubscriptionBoxSection />
      <BulkOrdersSection />
      <ResearchBundlesSection />
      <CatalogGateSection />
      <SucceedSection />
      <QualityVerifySection />
      <WhyChooseSection />
      <HomeFaqSection />
      <HomeCtaSubscribeSection />
    </div>
  );
}
