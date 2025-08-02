"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    Mail,
    Lock,
    LogIn,
    Github,
    LoaderCircle,
    Eye,
    EyeOff,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signIn("credentials", {
            redirect: true,
            email,
            password,
        });
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        signIn("google");
        setIsLoading(false);
    };

    const handleGithubLogin = async () => {
        setIsLoading(true);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen w-full  flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
            <div className="relative flex w-full max-w-6xl overflow-hidden rounded-xl shadow-2xl bg-white dark:bg-gray-900">
                <div className="hidden md:flex md:w-1/2 relative items-center justify-center p-8 bg-gray-800 dark:bg-gray-800">
                    <Image
                        src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                            Welcome to{" "}
                            <span className="text-blue-300">Writeup</span>
                        </h1>
                        <p className="text-lg text-gray-300 max-w-md">
                            Unleash your creativity and share your stories with
                            the world.
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        Sign In
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Enter your credentials to access your account.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
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
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                            />
                        </div>

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
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
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
                        </div>

                        <div className="text-right">
                            <Link href="/forgot-password">
                                <p className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                                    Forgot password?
                                </p>
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <LogIn className="mr-2 h-5 w-5" />
                            )}
                            {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="my-8 text-center text-sm text-gray-500 dark:text-gray-400 relative">
                        <div className="absolute left-0 top-1/2 w-full border-t border-gray-200 dark:border-gray-700"></div>
                        <span className="relative px-4 bg-white dark:bg-gray-900 z-10">
                            Or continue with
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            variant="outline"
                            className="w-full h-12 flex items-center justify-center gap-3 border-gray-300 dark:border-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                        >
                            <Image
                                src={"/google.png"}
                                alt="google login icon"
                                width={20}
                                height={20}
                            />
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

                    <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-8">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup">
                            <p className="text-blue-600 hover:underline font-medium dark:text-blue-400 inline-block">
                                Sign Up
                            </p>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
