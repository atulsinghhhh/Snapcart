
import { CartItem } from "./cartStore";

export const getCartTotal = (items: CartItem[], coupon: any = null, delivery_fee: number = 30) => {
    const subtotal = items.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
    );

    let discount = 0;
    if (coupon) {
        if (coupon.discount_type === 'flat') {
            discount = coupon.discount_value;
        } else if (coupon.discount_type === 'percent') {
            discount = subtotal * (coupon.discount_value / 100);
        }
    }

    const total = subtotal - discount + delivery_fee;

    return {
        subtotal: parseFloat(subtotal.toFixed(2)),
        delivery_fee: parseFloat(delivery_fee.toFixed(2)),
        discount: parseFloat(discount.toFixed(2)),
        total: parseFloat(Math.max(total, 0).toFixed(2)),
        item_count: items.reduce((sum, item) => sum + item.quantity, 0)
    };
};