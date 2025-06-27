import { ReactNode } from "react";

interface ProfileLayoutProps {
    children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <div className="flex flex-col h-screen">
            <header className="px-4 py-2 border-b">
                <div className="container mx-auto">
                    <h3>Profile Area</h3>
                    {/* You might add more profile-related navigation here */}
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                <div className="container mx-auto">{children}</div>
            </main>
        </div>
    );
}
