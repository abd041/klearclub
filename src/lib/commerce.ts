import type { CheckoutPayload } from "@/types/catalog";

export const FREE_SHIPPING_AT = 100;
export const SALE_OFF = 0.35;

export function salePrice(price: number) {
  return Math.round(price * (1 - SALE_OFF) * 100) / 100;
}

/** Per-unit price after site sale and quantity-tier bundle discounts (matches PDP buy box). */
export function volumeUnitPrice(retail: number, qty: number) {
  if (qty >= 10) return Math.round(retail * 0.6 * 100) / 100;
  const sale = salePrice(retail);
  if (qty >= 3) return Math.round(sale * (1 - 0.053) * 100) / 100;
  if (qty >= 2) return Math.round(sale * (1 - 0.036) * 100) / 100;
  return sale;
}

type CartLineKey = { productSlug: string; variantId: string; quantity: number };

/** Merge duplicate SKU lines so quantity tiers apply to the combined total. */
export function mergeCartLines<T extends CartLineKey>(lines: T[]): T[] {
  const merged = new Map<string, T>();
  for (const line of lines) {
    const key = `${line.productSlug}:${line.variantId}`;
    const existing = merged.get(key);
    if (existing) {
      merged.set(key, { ...existing, quantity: existing.quantity + line.quantity });
    } else {
      merged.set(key, { ...line });
    }
  }
  return Array.from(merged.values());
}

export type CommerceResult = {
  orderId: string;
};

export interface CommerceAdapter {
  createOrder(payload: CheckoutPayload): Promise<CommerceResult>;
}

/**
 * Local placeholder adapter.
 * Remedora can replace this module without touching the UI layer.
 */
export const localCommerceAdapter: CommerceAdapter = {
  async createOrder(_payload: CheckoutPayload) {
    const orderId = `KC-${Date.now().toString(36).toUpperCase()}`;
    return { orderId };
  },
};
