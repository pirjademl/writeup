"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ReactNode } from "react";

export const AuthSessionProvider = ({
    children,
    session,
}: {
    children: ReactNode;
    session: Session;
}) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};
