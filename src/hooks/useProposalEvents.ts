'use client';

import { useState, useCallback } from "react";
import { useWatchContractEvent } from "wagmi";
import { ProposalCreatedEvent, ProposalVotedEvent, ProposalClosedEvent } from "@/interfaces/ProposalEvents";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/constants";

export function useProposalEvents() {
    
    const [proposalCreatedEvents, setProposalCreatedEvents] = useState<ProposalCreatedEvent[]>([]);
    const [proposalVotedEvents, setProposalVotedEvents] = useState<ProposalVotedEvent[]>([]);
    const [proposalClosedEvents, setProposalClosedEvents] = useState<ProposalClosedEvent[]>([]);

    // Callbacks para outros hooks se inscreverem
    const [onProposalCreatedCallbacks, setOnProposalCreatedCallbacks] = useState<(() => void)[]>([]);
    const [onProposalVotedCallbacks, setOnProposalVotedCallbacks] = useState<(() => void)[]>([]);
    const [onProposalClosedCallbacks, setOnProposalClosedCallbacks] = useState<(() => void)[]>([]);

    // Funções para outros hooks se registrarem
    const onProposalCreated = useCallback((callback: () => void) => {
        setOnProposalCreatedCallbacks(prev => [...prev, callback]);
        
        // Retorna função de cleanup
        return () => {
        setOnProposalCreatedCallbacks(prev => prev.filter(cb => cb !== callback));
        };
    }, []);

    const onProposalVoted = useCallback((callback: () => void) => {
        setOnProposalVotedCallbacks(prev => [...prev, callback]);

        return () => {
        setOnProposalVotedCallbacks(prev => prev.filter(cb => cb !== callback));
        };
    }, []);

    const onProposalClosed = useCallback((callback: () => void) => {
        setOnProposalClosedCallbacks(prev => [...prev, callback]);

        return () => {
        setOnProposalClosedCallbacks(prev => prev.filter(cb => cb !== callback));
        };
    }, []);

    // Watch para ProposalCreated
    useWatchContractEvent({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        eventName: 'ProposalCreated',
        onLogs(logs) {
        logs.forEach((log) => {
            const {
            id,
            title,
            description,
            creationDate,
            } = log.args;

            const eventData: ProposalCreatedEvent = {
            id: id?.toString() || '',
            title: title || '',
            description: description || '',
            creationDate: creationDate ? BigInt(creationDate) : BigInt(0),
            transactionHash: log.transactionHash,
            blockNumber: Number(log.blockNumber),
            };

            console.log('Nova proposta criada:', eventData);
            setProposalCreatedEvents(prev => [eventData, ...prev.slice(0, 9)]); // Mantém só os 10 mais recentes

            // Executa todos os callbacks registrados
            onProposalCreatedCallbacks.forEach(callback => callback());
        });
        },
        enabled: !!CONTRACT_ADDRESS,
    });

    // Watch para ProposalVoted
    useWatchContractEvent({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        eventName: 'VoteRecorded',
        onLogs(logs) {
        logs.forEach((log) => {
            const { proposalId } = log.args;

            const eventData: ProposalVotedEvent = {
            proposalId: proposalId?.toString() || '',
            transactionHash: log.transactionHash,
            blockNumber: Number(log.blockNumber),
            };

            console.log('Novo voto registrado:', eventData);
            setProposalVotedEvents(prev => [eventData, ...prev.slice(0, 9)]); // Mantém só os 10 mais recentes

            // Executa todos os callbacks registrados
            onProposalVotedCallbacks.forEach(callback => callback());
        });
        },
        enabled: !!CONTRACT_ADDRESS,
    });

    // Watch para ProposalClosed
    useWatchContractEvent({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        eventName: 'ProposalClosed',
        onLogs(logs) {
            logs.forEach((log) => {
                const { proposalId, status } = log.args;

                const statusString: { [key: number]: string } = {
                    0: 'Em Votação',
                    1: 'Aprovada',
                    2: 'Rejeitada',
                };

                const eventData: ProposalClosedEvent = {
                proposalId: proposalId?.toString() || '',
                status: statusString[status as number] || '',
                transactionHash: log.transactionHash,
                blockNumber: Number(log.blockNumber),
                };

                console.log('Proposta fechada:', eventData);
                setProposalClosedEvents(prev => [eventData, ...prev.slice(0, 9)]); // Mantém só os 10 mais recentes

                // Executa todos os callbacks registrados
                onProposalClosedCallbacks.forEach(callback => callback());
            });
        },
        enabled: !!CONTRACT_ADDRESS,
    });

    return {
        proposalCreatedEvents,
        proposalVotedEvents,
        proposalClosedEvents,
        onProposalCreated,
        onProposalVoted,
        onProposalClosed,
        clearEvents: () => {
            setProposalCreatedEvents([]);
            setProposalVotedEvents([]);
            setProposalClosedEvents([]);
        }
    };
}
