'use client';

import { ProposalCard } from "@/components/ui";
import { useProposalTransaction } from "@/hooks";
import { TransactionModal, DEFAULT_CONTENTS } from "@/components/ui";
import { Proposal } from "@/interfaces/Proposal";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

interface ProposalListProps {
    proposals: Proposal[];
    isConnected: boolean;
    isLoading: boolean;
}

export function ProposalList({ proposals, isConnected, isLoading }: ProposalListProps) {
    const {
        voteProposal,
        isTransactionInProgress,
        showTransactionModal,
        setShowTransactionModal,
        transactionStatus,
        resetTransaction,
        hash,
        errorMessage,
        errorCategory,
    } = useProposalTransaction();

    const handleVote = (id: string, vote: boolean) => {
        voteProposal(id, vote);
        
    }

    const addRecentTransaction = useAddRecentTransaction();
    const handleVoteSuccess = (title: string) => {
        addRecentTransaction({
            hash: hash!,
            description: `Voto registrado na proposta: ${title}`,
        });
    };

    const handleCloseModal = () => {
        setShowTransactionModal(false);
        if (transactionStatus === 'success') {
            resetTransaction();
        }
    };

    return (
        <>
            <div className={`flex flex-col gap-4 mt-10 mb-10 border p-3 rounded-lg ${proposals.length >= 4 ? 'max-h-140 overflow-y-auto' : ''}`}>
                {
                    !isConnected ? (
                        <div className="flex justify-center items-center h-full">
                            <h1 className="text-2xl font-bold">Conecte sua carteira para ver/criar as propostas</h1>
                        </div>
                    ) : isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-3 border-t-3 border-grey-200"></div>
                                <h1 className="text-2xl font-bold">Carregando propostas...</h1>
                            </div>
                        </div>
                    ) : proposals.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <h1 className="text-2xl font-bold">Nenhuma proposta encontrada</h1>
                        </div>
                    ) : (
                        proposals
                        .map((proposal) => (
                            <ProposalCard
                                key={proposal.id.toString()}
                                id={proposal.id}
                                title={proposal.title}
                                description={proposal.description}
                                creationDate={proposal.creationDate}
                                closingDate={proposal.closingDate}
                                votesFor={proposal.votesFor}
                                votesAgainst={proposal.votesAgainst}
                                status={proposal.status}
                                isTransactionInProgress={isTransactionInProgress}
                                transactionStatus={transactionStatus}
                                onProposalVote={handleVote}
                                onVoteSuccess={handleVoteSuccess}
                            />
                        ))
                    )
                }
            </div>

            {/* Modal de transação personalizado para completar tarefa */}
            <TransactionModal
                isOpen={showTransactionModal}
                onClose={handleCloseModal}
                status={transactionStatus}
                hash={hash}
                error={errorMessage}
                errorCategory={errorCategory}
                onReset={resetTransaction}
                content={DEFAULT_CONTENTS.voteProposal}
            />
        </>
    )
}