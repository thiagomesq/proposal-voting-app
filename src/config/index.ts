import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygonAmoy } from 'wagmi/chains';
import { QueryClient } from "@tanstack/react-query";

const defaultRpcUrl = polygonAmoy.rpcUrls.default.http[0];

export const config = getDefaultConfig({
    appName: '',
    chains: [
        {
            ...polygonAmoy,
            rpcUrls: {
                default: {
                    http: [process.env.NEXT_PUBLIC_AMOY_RPC_URL || defaultRpcUrl],
                },
            },
        }
    ],
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    ssr: true,
});

export const queryClient = new QueryClient();