import type { CheckoutPayload } from "@/types/catalog";

export const FREE_SHIPPING_AT = 100;
export const SALE_OFF = 0.35;

export function salePrice(price: number) {
  return Math.round(price * (1 - SALE_OFF) * 100) / 100;
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
