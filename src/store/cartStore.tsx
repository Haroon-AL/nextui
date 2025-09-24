import create, { SetState, GetState } from "zustand";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartState = {
  items: Record<number, CartItem>;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  del: (id: number) => void;
  listCart: () => CartItem[];
  clear: () => void;
  getTotalItems: () => number;
};

export const useCartStore = create<CartState>(
  (set: SetState<CartState>, get: GetState<CartState>) => ({
    items: {},
    add: (item: Omit<CartItem, "quantity">, quantity = 1) => {
      set((state) => {
        const existing = state.items[item.id];
        const newQuantity = (existing ? existing.quantity : 0) + quantity;
        return {
          items: {
            ...state.items,
            [item.id]: {
              ...item,
              quantity: newQuantity,
            },
          },
        };
      });
    },
    del: (id: number) => {
      set((state) => {
        if (!state.items[id]) return state;
        const next = { ...state.items };
        delete next[id];
        return { items: next };
      });
    },
    listCart: () => {
      const items = get().items;
      return Object.values(items);
    },
    getTotalItems: () => {
      const items = get().items;
      return Object.values(items).reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    clear: () => set({ items: {} }),
  })
);

export default useCartStore;
