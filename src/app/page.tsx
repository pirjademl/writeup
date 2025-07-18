"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/common/header"; // Assuming Header is already styled for themes and contains navigation/logo
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { MoveRight } from "lucide-react"; // For a small icon on the CTA button

export default function LandingPage() {
    return (
        <div className="w-full flex flex-col min-h-screen">
            {/* Header (assumed to handle navigation and theme toggle) */}
            <Header />

            <main className="flex-grow">
                {/* --- Hero Section --- */}
                <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-background via-muted/50 to-background overflow-hidden">
                    {/* Subtle background pattern/texture */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
                    {/* Radial gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>

                    <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center">
                        <h1 className="scroll-m-20 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-balance mb-6 md:mb-8 animate-fade-in-up">
                            Write. Design. Publish.
                            <br className="hidden md:block" /> Your Story,
                            Unleashed.
                        </h1>
                        <p className="max-w-3xl leading-relaxed text-lg sm:text-xl text-muted-foreground mb-10 md:mb-12 animate-fade-in-up delay-200">
                            Create stunning blogs with our intuitive editor and
                            customizable frontend tools. Perfect for creators,
                            developers, and writers.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-lg animate-fade-in-up delay-400">
                            <Input
                                type="email"
                                className="flex-grow h-12 px-5 py-3 text-base rounded-lg shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300"
                                placeholder="Enter your email"
                            />
                            <Button
                                size="lg"
                                className="h-12 px-6 py-3 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                            >
                                Get Started <MoveRight className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Optional: Add a subtle graphic/illustration under the CTA */}
                        <div className="mt-16 md:mt-24 w-full max-w-5xl">
                            <Image
                                src="/hero-dashboard-mockup.png" // Replace with your actual image
                                alt="Dashboard Mockup"
                                width={1200}
                                height={700}
                                className="rounded-xl shadow-2xl border border-border/50 transition-all duration-300 transform hover:scale-[1.01]"
                                priority // Preload hero image
                            />
                        </div>
                    </div>
                </section>

                {/* --- Features Section --- */}
                <section className="w-full py-20 md:py-32 bg-secondary/20 dark:bg-accent/10">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 md:mb-8">
                            Everything You Need to Blog
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-16 md:mb-20">
                            From crafting compelling content to building a
                            unique online presence, our platform provides
                            powerful tools to help you succeed.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                            {/* Feature 1 */}
                            <Card className="flex flex-col h-full p-6 bg-card transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-border/50">
                                <CardHeader className="p-0 mb-4">
                                    <span className="text-4xl mb-3">📝</span>
                                    <CardTitle className="text-2xl font-semibold">
                                        Intuitive Editor
                                    </CardTitle>
                                    <CardDescription>
                                        Craft content effortlessly with a clean,
                                        powerful writing experience.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0 flex-grow">
                                    <p className="text-muted-foreground">
                                        Our modern, distraction-free editor
                                        supports Markdown, rich media embeds,
                                        and collaborative features to bring your
                                        stories to life.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Feature 2 */}
                            <Card className="flex flex-col h-full p-6 bg-card transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-border/50">
                                <CardHeader className="p-0 mb-4">
                                    <span className="text-4xl mb-3">🎨</span>
                                    <CardTitle className="text-2xl font-semibold">
                                        Customizable Frontend
                                    </CardTitle>
                                    <CardDescription>
                                        Design your blog's look and feel without
                                        writing a single line of code.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0 flex-grow">
                                    <p className="text-muted-foreground">
                                        Choose from stunning templates,
                                        customize layouts, fonts, and colors to
                                        match your brand and captivate your
                                        audience.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Feature 3 */}
                            <Card className="flex flex-col h-full p-6 bg-card transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-border/50">
                                <CardHeader className="p-0 mb-4">
                                    <span className="text-4xl mb-3">⚡</span>
                                    <CardTitle className="text-2xl font-semibold">
                                        Blazing Fast Performance
                                    </CardTitle>
                                    <CardDescription>
                                        Your blog will load instantly, keeping
                                        your readers engaged.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0 flex-grow">
                                    <p className="text-muted-foreground">
                                        Built with modern web technologies,
                                        ensuring your content is delivered
                                        quickly and reliably across all devices.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Feature 4 */}
                            <Card className="flex flex-col h-full p-6 bg-card transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-border/50">
                                <CardHeader className="p-0 mb-4">
                                    <span className="text-4xl mb-3">📊</span>
                                    <CardTitle className="text-2xl font-semibold">
                                        Integrated Analytics
                                    </CardTitle>
                                    <CardDescription>
                                        Understand your audience and grow your
                                        reach with ease.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0 flex-grow">
                                    <p className="text-muted-foreground">
                                        Track page views, popular posts, and
                                        reader demographics directly from your
                                        dashboard to optimize your content
                                        strategy.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Feature 5 */}
                            <Card className="flex flex-col h-full p-6 bg-card transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-border/50">
                                <CardHeader className="p-0 mb-4">
                                    <span className="text-4xl mb-3">SEO</span>
                                    <CardTitle className="text-2xl font-semibold">
                                        SEO Optimized
                                    </CardTitle>
                                    <CardDescription>
                                        Get discovered easily by search engines
                                        and expand your audience.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0 flex-grow">
                                    <p className="text-muted-foreground">
                                        Built-in SEO features like meta tag
                                        control, sitemaps, and clean URLs ensure
                                        your content ranks high.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Feature 6 */}
                            <Card className="flex flex-col h-full p-6 bg-card transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-border/50">
                                <CardHeader className="p-0 mb-4">
                                    <span className="text-4xl mb-3">☁️</span>
                                    <CardTitle className="text-2xl font-semibold">
                                        Cloud Hosted
                                    </CardTitle>
                                    <CardDescription>
                                        Focus on writing, we handle the
                                        infrastructure for you.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0 flex-grow">
                                    <p className="text-muted-foreground">
                                        Your blog is securely hosted on a robust
                                        cloud platform, ensuring high
                                        availability and automatic backups.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* --- Call to Action Section --- */}
                <section className="w-full py-20 md:py-28 lg:py-36 bg-primary text-primary-foreground text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                            Ready to Start Your Blog?
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-primary-foreground/90 mb-10">
                            Join thousands of creators already building their
                            online presence with ease.
                        </p>
                        <Button
                            size="lg" // Custom size (see next section for how to add)
                            className="h-14 px-8 py-4 text-lg font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                        >
                            Get Started for Free
                        </Button>
                    </div>
                </section>
            </main>

            {/* Footer (you'll likely have a separate Footer component) */}
            <footer className="w-full py-10 bg-card text-center text-muted-foreground text-sm border-t border-border">
                <div className="container mx-auto px-4">
                    <p>
                        &copy; {new Date().getFullYear()} Your Company. All
                        rights reserved.
                    </p>
                    {/* Add more footer links like privacy, terms, social media */}
                </div>
            </footer>
        </div>
    );
}
