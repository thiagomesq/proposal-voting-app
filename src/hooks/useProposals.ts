'use client';

import { useAccount, useReadContract } from "wagmi";
import { useEffect } from "react";
import { useProposalEvents } from "./useProposalEvents";
import { Proposal, ProposalStatus } from "@/interfaces/Proposal";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/constants";
import { timestampToDate } from "@/utils";

export function useProposals() {
    const { address, isConnected } = useAccount();
    const { proposalCreatedEvents, proposalVotedEvents, proposalClosedEvents, onProposalCreated, onProposalVoted, onProposalClosed } = useProposalEvents();
    
    const { 
        data: proposalsData,
        isLoading,
        refetch: refetchProposals,
        error
    } = useReadContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'getProposals',
        account: isConnected === true ? address : undefined,
        query: {
            enabled: isConnected && !!CONTRACT_ADDRESS,
            refetchInterval: 60000, // Reduzido para 60s já que temos eventos
        }
    });

    useEffect(() => {
        const createdCallback = onProposalCreated(() => {
            refetchProposals();
        });
        const votedCallback = onProposalVoted(() => {
            refetchProposals();
        });
        const closedCallback = onProposalClosed(() => {
            refetchProposals();
        });

        return () => {
            createdCallback();
            votedCallback();
            closedCallback();
        };
    }, [proposalCreatedEvents, proposalVotedEvents, proposalClosedEvents, onProposalCreated, onProposalVoted, onProposalClosed, refetchProposals]);

    const VOTE_PERIOD = 7 * 24 * 60 * 60; // 7 dias em segundos

    const proposals: Proposal[] = proposalsData?.map((proposal) => ({
        id: proposal.id.toString(),
        title: proposal.title,
        description: proposal.description,
        creationDate: timestampToDate(Number(proposal.creationDate)),
        closingDate: timestampToDate(Number(proposal.creationDate) + VOTE_PERIOD),
        votesFor: proposal.votesFor.toString(),
        votesAgainst: proposal.votesAgainst.toString(),
        status: ProposalStatus[proposal.status as keyof typeof ProposalStatus],
    })).sort((a, b) => {
        const isPendigingA = a.status === ProposalStatus[0];
        const isPendigingB = b.status === ProposalStatus[0];
        // Retorna pendentes primeiro
        if (isPendigingA && !isPendigingB) return -1;
        if (!isPendigingA && isPendigingB) return 1;
        // Se ambos são pendentes, ordena por data de criação
        return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
    }) || [];

    const pendingProposals = proposals?.filter(proposal => proposal.status === ProposalStatus[0]).length || 0;
    const approvedProposals = proposals?.filter(proposal => proposal.status === ProposalStatus[1]).length || 0;
    const rejectedProposals = proposals?.filter(proposal => proposal.status === ProposalStatus[2]).length || 0;

    return {
        proposals,
        totalProposals: proposals?.length || 0,
        pendingProposals,
        approvedProposals,
        rejectedProposals,
        isLoading,
        error,
        refetchProposals,
    };
}