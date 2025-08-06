'use client';

import { Dashboard } from "./Dashboard";
import { NewProposalForm } from "./NewProposalForm";
import { ProposalList } from "./ProposalList";
import { useProposals } from "@/hooks";
import { useAccount } from "wagmi";

export default function Main() {
  const { isConnected } = useAccount();
  const {
    totalProposals,
    pendingProposals,
    approvedProposals,
    rejectedProposals,
    isLoading,
    proposals
  } = useProposals();

  return (
    <main className="mt-10">
      <Dashboard
        totalProposals={totalProposals}
        pendingProposals={pendingProposals}
        approvedProposals={approvedProposals}
        rejectedProposals={rejectedProposals}
        isLoading={isLoading}
      />
      <NewProposalForm />
      <ProposalList
        proposals={proposals}
        isConnected={isConnected}
        isLoading={isLoading}
      />
    </main>
  );
}