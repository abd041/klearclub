"use client";

import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";

type QuantityStepperProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  size = "md",
}: QuantityStepperProps) {
  const compact = size === "sm";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-hair bg-white",
        compact ? "h-9" : "h-11",
      )}
    >
      <button
        type="button"
        className={cn(
          "text-mute hover:text-ink",
          compact ? "w-9" : "w-11",
        )}
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={cn("min-w-6 text-center text-sm font-medium", compact ? "text-sm" : "text-[15px]")}>
        {value}
      </span>
      <button
        type="button"
        className={cn(
          "text-mute hover:text-ink",
          compact ? "w-9" : "w-11",
        )}
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export function CartQty({
  productSlug,
  variantId,
  quantity,
}: {
  productSlug: string;
  variantId: string;
  quantity: number;
}) {
  const { setQuantity } = useCart();
  return (
    <QuantityStepper
      size="sm"
      value={quantity}
      onChange={(next) => setQuantity(productSlug, variantId, next)}
    />
  );
}
