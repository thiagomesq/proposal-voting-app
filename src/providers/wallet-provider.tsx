'use client';

import { lightTheme, midnightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { useTheme } from "next-themes";
import '@rainbow-me/rainbowkit/styles.css';

export default function WalletProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    return (
        <RainbowKitProvider
            modalSize="compact"
            showRecentTransactions={true}
            theme={theme === "dark" ? midnightTheme() : lightTheme()}
        >
            {children}
        </RainbowKitProvider>
    );
}