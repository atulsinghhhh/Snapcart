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
    const searchProducts = async (query: string) => {
        if (!query.trim()) return [];
        setLoading(true);
        try {
            const { error, data } = await supabase.from("products")
                .select("*")
                .eq("is_available", true)
                .ilike("name", `%${query}%`)
                .order("created_at", { ascending: false });

            if (error) {
                Alert.alert("Error searching products", error.message);
                return;
            }
            return data;
        } catch (error) {
            Alert.alert("Error searching products", (error as Error).message);
            return;
        } finally {
            setLoading(false);
        }
    };

    const applyCouponCode = async (code: string, subtotal: number) => {
        setLoading(true);
        try {
            const { error, data } = await supabase.from("coupons")
                .select("*")
                .eq("code", code)
                .eq("is_active", true)
                .gt("expires_at", new Date().toISOString())
                .single();

            if (error) {
                Alert.alert("Invalid Coupon", "This coupon does not exist or has expired.");
                return null;
            }

            if (data && subtotal < data.min_order_value) {
                Alert.alert("Coupon not applicable", `Minimum order value for this coupon is ${data.min_order_value}`);
                return null;
            }

            return data;
        } catch (error) {
            Alert.alert("Error applying coupon", (error as Error).message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        fetchCategory,
        fetchProduct,
        handleCategoryFilter,
        fetchAddress,
        searchProducts,
        applyCouponCode,
    }
}

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

    

    return {
        fetchProduct,
    }
}