"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import ThemeProvider from "./theme-provider";
import { config, queryClient } from "@/config";
import { ReactNode } from "react";
import WalletProvider from "./wallet-provider";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <WagmiProvider config={config}>
                <ThemeProvider attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <WalletProvider>
                        {children}
                    </WalletProvider>
                </ThemeProvider>
            </WagmiProvider>
        </QueryClientProvider>
    );
}