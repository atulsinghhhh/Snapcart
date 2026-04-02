import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Alert } from "react-native";

export const useCustomer = () => {

    const [loading,setLoading] = useState(false);

    const fetchCategory = async()=>{
        setLoading(true);
        try {
            const { error,data } = await supabase.from("categories").select("*").eq("is_active",true)
            if(error){
                Alert.alert("Error fetching categories", error.message);
                return;
            }
            console.log("Categories fetched successfully", data);
            return data;
        } catch (error) {
            Alert.alert("Error fetching categories", (error as Error).message);
            return;
        } finally {
            setLoading(false);
        }
    }

    const fetchProduct = async() => {
        setLoading(true);
        try {
            const { error,data } = await supabase.from("products")
                .select("*")
                .eq("is_available",true)
                .order("created_at",{ascending:false})
                .limit(10);
        
            if(error){
                Alert.alert("Error fetching products", error.message);
                return;
            }

            console.log("Products fetched successfully", data);
            return data;
        } catch (error) {
            Alert.alert("Error fetching products", (error as Error).message);
            return;
        } finally {
            setLoading(false);
        }
    }

    const fetchAddress = async() => {
        setLoading(true);
        try {
            const { data: {user}} = await supabase.auth.getUser();
            if(!user){
                Alert.alert("Error fetching user", "No user logged in");
                return;
            }
            const { data,error } = await supabase.from("addresses")
                .select("*")
                .eq("user_id",user.id)
                .eq('is_default',true)
                .single();
            if(error){
                Alert.alert("Error fetching addresses", error.message);
                return;
            }
            console.log("Addresses fetched successfully", data);
            return data;
        } catch (error) {
            Alert.alert("Error fetching addresses", (error as Error).message);
            return;
        } finally {
            setLoading(false);
        }
    }

    const handleCategoryFilter = async(category_id: string)=>{
        setLoading(true);
        try {
            const { error,data } = await supabase.from("products")
                .select("*")
                .eq("is_available",true)
                .eq("category_id",category_id)
                .order("created_at",{ascending:false})
                .limit(10);
        
            if(error){
                Alert.alert("Error fetching products", error.message);
                return;
            }

            console.log("Products fetched successfully", data);
            return data;
        } catch (error) {
            Alert.alert("Error fetching products", (error as Error).message);
            return;
        } finally {
            setLoading(false);
        }
    }
    return {
        fetchCategory,
        fetchProduct,
        handleCategoryFilter,
        fetchAddress,
    }
}


/*

    Product Detail → Add to Cart
    Product Detail Screen

    Receive product_id from navigation
    Fetch single product from products table by id
    Show image, name, price, description, stock qty
    Quantity selector starts at 1, max = stock_qty

    Add to Cart

    Cart is stored in local state / AsyncStorage (not database) until checkout
    On tap 'Add to Cart' → save { product_id, name, image, price, quantity } to local cart store
    Show toast 'Added to cart'
    Cart icon in tab bar shows item count badge


*/

export const useProduct = () =>{
    const [loading,setLoading] = useState(false);
    const [product,setProduct] = useState(null);
    const [cart,setCart] = useState([]);

    const fetchProduct = async(product_id: string) => {
        setLoading(true);
        try {
            const { error,data } = await supabase.from("products")
                .select("*")
                .eq("id",product_id)
                .single();
            if(error){
                Alert.alert("Error fetching product", error.message);
                return;
            }
            console.log("Product fetched successfully", data);
            setProduct(data);
        } catch (error) {
            Alert.alert("Error fetching product", (error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    const addToCart = async(product: any) => {
        setLoading(true);
        try {
            const { error,data } = await supabase.from("cart")
                .insert({
                    product_id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity: product.quantity,
                });
            if(error){
                Alert.alert("Error adding to cart", error.message);
                return;
            }
            console.log("Product added to cart successfully", data);
            // setCart(data);
        } catch (error) {
            Alert.alert("Error adding to cart", (error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return {
        fetchProduct,
        // addToCart,
        loading,
        product,
        cart
    }
}