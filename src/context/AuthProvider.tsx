import { useState } from "react";
import { createContext, useContext } from "react";
import { supabase } from "../lib/supabase/client";
import { Alert } from "react-native";


export interface User {
    email: string;
    name: string;
    phone: string;
    role: 'customer' | 'admin' | 'agent';

}

interface AuthContextType {
    user: User | null;
    signUp: (name: string, phone: string, email: string, password: string) => Promise<void>;
    signIn: (phone: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);


export default function AuthProvider({children}: {children: React.ReactNode}) {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const signUp= async(name: string,phone: string,email: string,password: string)=>{
        setLoading(true);

        try {
            const {data: signUpData, error: signUpError} = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                        phone,
                    }
                }
            });
            if(signUpError) {
                Alert.alert("Error signing up", signUpError.message);
                return;
            }

            const { data,error } = await supabase.from('users').select("*").eq("id", signUpData?.user?.id).single();
            if(error){
                Alert.alert("Error fetching user data", error.message);
                return;
            }

            setUser(data);
            console.log("User signed up successfully", data);
        } catch (error) {
            Alert.alert("Error signing up", (error as Error).message);
        } finally {
            setLoading(false);
        }
    }
    const signIn = async(phone: string) => {

    }
    const signOut = async() =>{

    }

    return (
        <AuthContext.Provider value={{signUp,signIn,signOut,user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}