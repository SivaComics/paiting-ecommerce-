"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface CartItem {
  artworkId: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  addItem: (artworkId: string) => void;
  removeItem: (artworkId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "aureline-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Deliberate one-time sync from localStorage after mount: reading it
    // during render would cause a server/client hydration mismatch, since
    // localStorage doesn't exist during SSR.
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore malformed/unavailable storage
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore unavailable storage
    }
  }, [items]);

  // Every work is an original, so adding one that's already in the bag is a
  // no-op rather than a second copy.
  const addItem = useCallback((artworkId: string) => {
    setItems((prev) => (prev.some((i) => i.artworkId === artworkId) ? prev : [...prev, { artworkId, quantity: 1 }]));
  }, []);

  const removeItem = useCallback((artworkId: string) => {
    setItems((prev) => prev.filter((i) => i.artworkId !== artworkId));
  }, []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = useMemo(() => ({ items, count, addItem, removeItem }), [items, count, addItem, removeItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
