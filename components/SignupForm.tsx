//https://react-hook-form.com/get-started
"use client"

import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { z } from "zod";

import { signupSchema } from "@/schemas/signup_schema";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const router = useRouter();
    const [verificationerror , setverificationerror] = useState<string | null>(null);
    const [verifying, setverifying] = useState(false);
    const { signUp, isLoaded, setActive } = useSignUp();
    const [issubmitting, setissubmitting] = useState(false);
    const [autherror, setautherror] = useState<string | null>(null);
    const [verificationcode, setverificationcode] = useState("")
    
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    const onsubmit = async (data: z.infer<typeof signupSchema>) => { 
        if (!isLoaded) return;
        setissubmitting(true);
        setautherror(null);

        try {
            await signUp.create({
                emailAddress: data.email,
                password: data.password,
            })
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            });
            setverifying(true);
        } catch (error) {
            console.error("Error during sign up:", error);
            setautherror("An error occurred during sign up. Please try again.");
        }
        finally {
            setissubmitting(false);
        }
    }
    const verificationsubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        if (!isLoaded || !signUp) return;
        setissubmitting(true);
        setautherror(null);
        try {
            
        
            const result = await signUp.attemptEmailAddressVerification({
                code: verificationcode
            
            })
            console.log(result);
            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId })
                router.push("/dashboard")
            }
            else {
                console.log("verification incomplete", result)
                setverificationerror("verification could not be complete")
            }

        } catch (error) {
            console.log("verification incomplete", error)
            setverificationerror("An error an occurred during signup")
        } finally {
            setissubmitting(false)
        }
    }

    if (verifying) {
        return <div>This is OTP field</div>
    }
    
    return <div>
        signup form with email and password
    </div>
}
