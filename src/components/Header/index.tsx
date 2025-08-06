"use client"

import ThemeSwitch from "./ThemeSwitch"
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-[0] w-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Votação de Propostas</h1>
                <h2 className="text-sm text-muted-foreground">Crie e vote em propostas usando blockchain</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <ThemeSwitch />
                <ConnectButton />
            </div>
        </header>
    )
}