"use client"
import { Sidebar } from "@/sidebar/sidebar";
import { useLoginState } from "../../hooks/useLoginState";
import MobileHeader from "@/components/mobileHeader/mobileHeader";

export function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useLoginState();

    return (
        <>
            {user && 
            <>
            <Sidebar />
            <MobileHeader />
            </>
            }
            {children}
        </>
    );
}
