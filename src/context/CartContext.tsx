"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/data/products";
import { FREE_SHIPPING_AT, mergeCartLines, volumeUnitPrice } from "@/lib/commerce";
import type { CartLine } from "@/types/catalog";

const STORAGE_KEY = "klearclub.cart.v1";

type ResolvedLine = CartLine & {
  name: string;
  variantLabel: string;
  unitPrice: number;
  saleUnitPrice: number;
  lineTotal: number;
  form: "vial" | "spray" | "supply";
};

type CartContextValue = {
  lines: CartLine[];
  resolved: ResolvedLine[];
  count: number;
  subtotal: number;
  remainingForFreeShipping: number;
  isOpen: boolean;
  addItem: (productSlug: string, variantId: string, quantity?: number) => void;
  addItems: (items: CartLine[]) => void;
  setQuantity: (productSlug: string, variantId: string, quantity: number) => void;
  removeItem: (productSlug: string, variantId: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return mergeCartLines(Array.isArray(parsed) ? parsed : []);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const commitLines = useCallback((updater: (current: CartLine[]) => CartLine[]) => {
    setLines((current) => mergeCartLines(updater(current)));
  }, []);

  useEffect(() => {
    setLines(readStoredLines());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const addItem = useCallback(
    (productSlug: string, variantId: string, quantity = 1) => {
      commitLines((current) => [...current, { productSlug, variantId, quantity }]);
    },
    [commitLines],
  );

  const addItems = useCallback(
    (items: CartLine[]) => {
      if (items.length === 0) return;
      commitLines((current) => [...current, ...items]);
    },
    [commitLines],
  );

  const setQuantity = useCallback(
    (productSlug: string, variantId: string, quantity: number) => {
      commitLines((current) => {
        if (quantity <= 0) {
          return current.filter(
            (line) =>
              !(line.productSlug === productSlug && line.variantId === variantId),
          );
        }
        return current.map((line) =>
          line.productSlug === productSlug && line.variantId === variantId
            ? { ...line, quantity }
            : line,
        );
      });
    },
    [commitLines],
  );

  const removeItem = useCallback(
    (productSlug: string, variantId: string) => {
      commitLines((current) =>
        current.filter(
          (line) =>
            !(line.productSlug === productSlug && line.variantId === variantId),
        ),
      );
    },
    [commitLines],
  );

  const clear = useCallback(() => setLines([]), []);

  const resolved = useMemo(() => {
    return lines.flatMap((line) => {
      const product = getProduct(line.productSlug);
      const variant = product?.variants.find((item) => item.id === line.variantId);
      if (!product || !variant) return [];
      const saleUnitPrice = volumeUnitPrice(variant.price, line.quantity);
      return [
        {
          ...line,
          name: product.name,
          variantLabel: variant.label,
          unitPrice: variant.price,
          saleUnitPrice,
          lineTotal: saleUnitPrice * line.quantity,
          form: product.form,
        },
      ];
    });
  }, [lines]);

  const subtotal = resolved.reduce((sum, line) => sum + line.lineTotal, 0);
  const count = resolved.reduce((sum, line) => sum + line.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_AT - subtotal);

  const value: CartContextValue = {
    lines,
    resolved,
    count,
    subtotal,
    remainingForFreeShipping,
    isOpen,
    addItem,
    addItems,
    setQuantity,
    removeItem,
    clear,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
