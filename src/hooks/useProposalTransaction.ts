'use client';

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ProposalCreation } from "@/interfaces/Proposal";
import { TransactionStatus } from "@/interfaces/Transaction";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/constants";
import { formatTransactionError, getErrorCategory } from "@/utils";

export function useProposalTransaction() {
    const [showTransactionModal, setShowTransactionModal] = useState(false);

    const { 
    data: hash,
    error, 
    writeContract,
    reset,
    status 
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        setShowTransactionModal(true);
      },
      onError: (error) => {
        console.error('Transaction error:', error);
        setShowTransactionModal(true);
      }
    }
  });

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: confirmError 
  } = useWaitForTransactionReceipt({ 
    hash 
  });

  function createProposal(proposal: ProposalCreation) {
    const { title, description } = proposal;

    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'createProposal',
      args: [title, description],
    });
  }

  function voteProposal(proposalId: string, vote: boolean) {
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'vote',
      args: [BigInt(proposalId), vote],
    });
  }

  function resetTransaction() {
    reset();
    setShowTransactionModal(false);
  }

  function getTransactionStatus(): TransactionStatus {
    if (status === 'pending') return 'pending';
    if (hash && isConfirming) return 'confirming';
    if (isConfirmed) return 'success';
    if (status === 'error' || confirmError) return 'error';
    return 'idle';
  }

  const isTransactionInProgress = status === 'pending' || isConfirming;
  
  // Formatar mensagem de erro de forma mais amigável
  const currentError = error || confirmError;
  const errorMessage = currentError ? formatTransactionError(currentError) : undefined;
  const errorCategory = currentError ? getErrorCategory(currentError) : undefined;

  return {
    createProposal,
    voteProposal,
    resetTransaction,
    showTransactionModal,
    setShowTransactionModal,
    transactionStatus: getTransactionStatus(),
    hash,
    errorMessage,
    errorCategory,
    isTransactionInProgress
  };
}