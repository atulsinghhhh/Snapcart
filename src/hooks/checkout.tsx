import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Alert } from "react-native";
import { useCartStore, CartItem, Coupon } from "@/store/cartStore";

export const useCheckout = () => {
    const [loading, setLoading] = useState(false);
    const clearCart = useCartStore(state => state.clearCart);

    const placeOrder = async ({
        customerId,
        deliveryAddressId,
        paymentMethod,
        subtotal,
        deliveryFee,
        discount,
        total,
        cartItems,
        coupon
    }: {
        customerId: string;
        deliveryAddressId: string;
        paymentMethod: string;
        subtotal: number;
        deliveryFee: number;
        discount: number;
        total: number;
        cartItems: CartItem[];
        coupon: Coupon | null;
    }) => {
        setLoading(true);
        try {
            // Step 1: Insert into orders table
            const { data: orderData, error: orderError } = await supabase.from("orders").insert({
                customer_id: customerId,
                delivery_address_id: deliveryAddressId,
                status: 'pending',
                payment_method: paymentMethod,
                payment_status: paymentMethod === 'online' ? 'paid' : 'pending', // Depending on implementation
                subtotal,
                delivery_fee: deliveryFee,
                discount,
                total
            }).select().single();

            if (orderError) {
                console.error("Order Insert Error:", orderError);
                Alert.alert("Order Error", "Failed to place order.");
                return null;
            }

            const orderId = orderData.id;

            // Step 2: Insert into order_items
            const orderItemsPayload = cartItems.map(item => ({
                order_id: orderId,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.price
            }));

            const { error: itemsError } = await supabase.from("order_items").insert(orderItemsPayload);

            if (itemsError) {
                console.error("Order Items Insert Error:", itemsError);
                Alert.alert("Order Error", "Failed to insert order items.");
                return null;
            }

            // Step 3: Check and update coupon logic
            if (coupon) {
                const { error: couponError } = await supabase.from("coupon_usages").insert({
                    coupon_id: coupon.id,
                    user_id: customerId,
                    order_id: orderId
                });

                if (couponError) {
                    console.error("Coupon Usage Insert Error:", couponError);
                    // Non-fatal, proceed
                }
                
                // Technically there's a trigger or we'd increment used_count manually,
                // but schema says it's trigger enabled or just relies on counts.
            }

            // Step 4: Clear cart
            clearCart();

            return orderId;

        } catch (error) {
            console.error("Checkout Error:", error);
            Alert.alert("Checkout Error", (error as Error).message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        placeOrder
    };
};
