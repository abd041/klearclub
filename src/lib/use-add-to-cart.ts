"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";

const ADD_DELAY_MS = 420;
const ADDED_MS = 2000;

type AddState = "idle" | "loading" | "added";

export function useAddToCart() {
  const { addItem } = useCart();
  const [state, setState] = useState<AddState>("idle");
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const addToCart = useCallback(
    (productSlug: string, variantId: string, quantity = 1) => {
      if (state !== "idle") return;

      setState("loading");
      const loadTimer = window.setTimeout(() => {
        addItem(productSlug, variantId, quantity);
        setState("added");

        const resetTimer = window.setTimeout(() => {
          setState("idle");
        }, ADDED_MS);
        timersRef.current.push(resetTimer);
      }, ADD_DELAY_MS);

      timersRef.current.push(loadTimer);
    },
    [addItem, state],
  );

  return {
    addToCart,
    isAdding: state === "loading",
    justAdded: state === "added",
    isBusy: state !== "idle",
  };
}
