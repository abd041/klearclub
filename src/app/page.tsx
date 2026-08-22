import { BulkOrdersSection } from "@/components/BulkOrdersSection";
import { GuaranteeSection } from "@/components/GuaranteeSection";
import { HomeCtaSubscribeSection } from "@/components/HomeCtaSubscribeSection";
import { HomeFaqSection } from "@/components/HomeFaqSection";
import { HomeFeaturedProducts } from "@/components/HomeFeaturedProducts";
import { HomeHero } from "@/components/HomeHero";
import { QualityVerifySection } from "@/components/QualityVerifySection";
import { ResearchBundlesSection } from "@/components/ResearchBundlesSection";
import { SucceedSection } from "@/components/SucceedSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { SubscriptionBoxSection } from "@/components/SubscriptionBoxSection";

export default function HomePage() {
  return (
    <div>
      <HomeHero />
      <GuaranteeSection />
      <HomeFeaturedProducts />
      <SubscriptionBoxSection />
      <BulkOrdersSection />
      <ResearchBundlesSection />
      <SucceedSection />
      <QualityVerifySection />
      <WhyChooseSection />
      <HomeFaqSection />
      <HomeCtaSubscribeSection />
    </div>
  );
}
