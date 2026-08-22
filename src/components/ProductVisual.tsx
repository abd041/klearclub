import Image from "next/image";
import { cn } from "@/lib/cn";
import { productImage, productImageClass, PRODUCT_IMAGE_BG } from "@/data/media";
import type { Product } from "@/types/catalog";

type ProductVisualProps = {
  product: Pick<Product, "slug" | "form" | "name">;
  className?: string;
  priority?: boolean;
  branded?: boolean;
};

export function ProductVisual({
  product,
  className,
  priority,
  branded = true,
}: ProductVisualProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ backgroundColor: PRODUCT_IMAGE_BG }}>
      <Image
        src={productImage(product)}
        alt={`${product.name} research vial`}
        fill
        sizes="(max-width: 768px) 100vw, 420px"
        className={productImageClass}
        priority={priority}
      />
      {branded ? (
        <Image
          src="/brand/logo.png"
          alt=""
          width={110}
          height={36}
          className="pointer-events-none absolute bottom-4 left-1/2 h-6 w-auto -translate-x-1/2 opacity-90 sm:h-7"
        />
      ) : null}
    </div>
  );
}
