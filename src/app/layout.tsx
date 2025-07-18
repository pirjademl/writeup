import { Montserrat } from "next/font/google";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme.provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { AuthSessionProvider } from "@/providers/session.provider";
import { getServerSession } from "next-auth";
import { AuthOption } from "./lib/auth";

const montserrat = Montserrat({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Write your blogs with mulithreading with multiplayer features",
    description: "write your blogs and content",
};
type props = { children: React.ReactNode };
export default async function RootLayout({ children }: props) {
    const session = await getServerSession(AuthOption);
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${montserrat.className} ${montserrat.className} antialiased`}
            >
                <AuthSessionProvider session={session}>
                    <Toaster />
                    <SidebarProvider>
                        <ThemeProvider>{children}</ThemeProvider>
                    </SidebarProvider>
                </AuthSessionProvider>
            </body>
        </html>
    );
}
