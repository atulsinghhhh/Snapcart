import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CartItem {
    product_id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    stock_qty: number;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    image_url: string;
    stock_qty: number;
}

export interface Coupon {
    id: string;
    code: string;
    discount_type: 'flat' | 'percent';
    discount_value: number;
    min_order_value: number;
}

interface CartState {
    items: CartItem[];
    coupons: Coupon | null;
    addItems: (product: Product) => void;
    removeItem: (product_id: string) => void;
    deleteItem: (product_id: string) => void;
    clearCart: () => void;
    applyCoupon: (coupon: Coupon) => void;
    removeCoupon: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            coupons: null,

            addItems: (product: Product) => {
                set((state) => {
                    const existingItem = state.items.find(i => i.product_id === product.id);

                    if (existingItem) {
                        if (existingItem.quantity >= product.stock_qty) return state;

                        return {
                            items: state.items.map(i => i.product_id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
                        };
                    } else {
                        return {
                            items: [
                                ...state.items,
                                {
                                    product_id: product.id,
                                    name: product.name,
                                    price: Number(product.price),
                                    quantity: 1,
                                    image: product.image_url,
                                    stock_qty: product.stock_qty,
                                }
                            ]
                        };
                    }
                });
            },

            removeItem: (product_id: string) => {
                set((state) => {
                    const existing = state.items.find(i => i.product_id === product_id);

                    if (!existing) return state;

                    if (existing.quantity === 1) {
                        return {
                            items: state.items.filter(i => i.product_id !== product_id)
                        };
                    } else {
                        return {
                            items: state.items.map(i => i.product_id === product_id ? { ...i, quantity: i.quantity - 1 } : i)
                        };
                    }
                });
            },

            deleteItem: (product_id: string) => {
                set((state) => ({
                    items: state.items.filter(i => i.product_id !== product_id)
                }));
            },

            clearCart: () => {
                set({
                    items: []
                });
            },

            applyCoupon: (coupon: Coupon) => {
                set({
                    coupons: coupon
                });
            },

            removeCoupon: () => {
                set({
                    coupons: null
                });
            },
        }),
        {
            name: "cart",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
