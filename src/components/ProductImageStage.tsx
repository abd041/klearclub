import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { productCardStageStyle } from "@/lib/product-palette";

type ProductImageStageProps = {
  slug: string;
  className?: string;
  children: ReactNode;
};

/**
 * Soft studio cyclorama behind catalog product photography.
 * Single-layer background (no stacked overlays) to avoid visible seams.
 */
export function ProductImageStage({ slug, className, children }: ProductImageStageProps) {
  return (
    <div className={cn("relative isolate overflow-hidden", className)} style={productCardStageStyle(slug)}>
      <div className="absolute inset-0 [&_img]:drop-shadow-[0_18px_22px_rgba(15,23,42,0.13)]">{children}</div>
    </div>
  );
}
