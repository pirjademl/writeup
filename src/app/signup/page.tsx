"use client";
import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    LoaderCircle,
    Square, // For Google, maintaining lucide-react only
    Github,
    UserPlus, // For the main signup icon
    Zap, // For branding
} from "lucide-react";
import Link from "next/link";
import { SignUp } from "../actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError(""); // Reset error message

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }
        setIsLoading(true);
        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Signup attempt with:", { name, email, password });
        // In a real app, integrate with your authentication service here (e.g., NextAuth.js)
        // If successful, redirect user to login or dashboard
        setIsLoading(false);
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        // Integrate Google OAuth signup here
        signIn("google");

        setIsLoading(false);
    };

    const handleGithubLogin = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Signing up with GitHub...");
        // Integrate GitHub OAuth signup here
        setIsLoading(false);
    };
    // @ts-ignore
    const [state, action, pending] = useActionState(SignUp, undefined);
    console.log(state);

    // @ts-ignore
    if (state?.success) {
        toast.success("Account created successfully", {
            description: "Login to access your account",
        });
        router.push("/login");
    }
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
            <div className="relative flex w-full max-w-6xl overflow-hidden rounded-xl shadow-2xl bg-white dark:bg-gray-900">
                {/* Left Section: Image (Hidden on small screens) */}
                <div className="hidden md:flex md:w-1/2 relative items-center justify-center p-8 bg-gray-800 dark:bg-gray-800">
                    <Image
                        src="https://images.unsplash.com/photo-1507207617557-ca7c6d6c6d56?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // New image for signup
                        alt="Creative writing process"
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        priority
                        sizes="(max-width: 768px) 0vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900 opacity-70"></div>
                    <div className="relative z-10 text-white text-center p-6 flex flex-col items-center">
                        <Zap className="w-16 h-16 text-blue-400 mb-4 animate-pulse" />
                        <h1 className="text-4xl font-extrabold mb-3 leading-tight">
                            Join <span className="text-blue-300">Writeup</span>{" "}
                            Today!
                        </h1>
                        <p className="text-lg text-gray-300 max-w-md">
                            Start your writing journey and connect with a
                            community of creators.
                        </p>
                    </div>
                </div>

                {/* Right Section: Sign Up Form */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        Create Account
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Sign up to get started with your writing.
                    </p>

                    <form action={action} className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <Label
                                htmlFor="firstName"
                                className="text-gray-700 dark:text-gray-300 mb-2 block"
                            >
                                <User className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                                first Name
                            </Label>
                            <Input
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="John "
                                className="h-12 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                            />
                        </div>
                        {state?.errors?.firstName && (
                            <p className="text-red-500 font-normal">
                                {state.errors.firstName}
                            </p>
                        )}
                        <div>
                            <Label
                                htmlFor="lastName"
                                className="text-gray-700 dark:text-gray-300 mb-2 block"
                            >
                                <User className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder=" Doe"
                                className="h-12 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                            />
                        </div>
                        {state?.errors?.lastName && (
                            <p className="text-red-500 ">
                                {state.errors.lastName}
                            </p>
                        )}

                        <div>
                            <Label
                                htmlFor="email"
                                className="text-gray-700 dark:text-gray-300 mb-2 block"
                            >
                                <Mail className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                className="h-12 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                            />
                        </div>
                        {state?.errors?.email && (
                            <p className="text-red-500">{state.errors.email}</p>
                        )}

                        <div>
                            <Label
                                htmlFor="password"
                                className="text-gray-700 dark:text-gray-300 mb-2 block"
                            >
                                <Lock className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="h-12 pr-10 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:bg-transparent"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">
                                        {showPassword
                                            ? "Hide password"
                                            : "Show password"}
                                    </span>
                                </Button>
                            </div>
                            {state?.errors?.password && (
                                <p className="text-red-500">
                                    {state.errors.password}
                                </p>
                            )}
                        </div>

                        {/* Sign Up Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <UserPlus className="mr-2 h-5 w-5" />
                            )}
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="my-8 text-center text-sm text-gray-500 dark:text-gray-400 relative">
                        <div className="absolute left-0 top-1/2 w-full border-t border-gray-200 dark:border-gray-700"></div>
                        <span className="relative px-4 bg-white dark:bg-gray-900 z-10">
                            Or register with
                        </span>
                    </div>

                    {/* Social Sign Up */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            variant="outline"
                            className="w-full h-12 flex items-center justify-center gap-3 border-gray-300 dark:border-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                        >
                            <Square className="w-5 h-5 text-blue-600 fill-blue-500 stroke-blue-600" />
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full h-12 flex items-center justify-center gap-3 border-gray-300 dark:border-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                            onClick={handleGithubLogin}
                            disabled={isLoading}
                        >
                            <Github className="w-5 h-5" />
                            GitHub
                        </Button>
                    </div>

                    {/* Login Link */}
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-8">
                        Already have an account?{" "}
                        <Link href="/login">
                            <p className="text-blue-600 hover:underline font-medium dark:text-blue-400 inline-block">
                                Log In
                            </p>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
