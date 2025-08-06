'use client';

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogTitle, 
  DialogTrigger, 
  Button, 
  Input, 
  Textarea, 
  Label,
  TransactionModal,
  DEFAULT_CONTENTS
} from "@/components/ui";
import { PlusIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useProposalTransaction } from "@/hooks"
import { useAccount } from "wagmi";
import { ProposalCreation } from "@/interfaces/Proposal";
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';

export function NewProposalForm() {
    const { isConnected } = useAccount();
    const [newProposal, setNewProposal] = useState<ProposalCreation>({
        title: 'Nova Proposta',
        description: 'Esta é uma descrição padrão da proposta.',
    });

    const [isFormOpen, setIsFormOpen] = useState(false);

    const {
        createProposal,
        resetTransaction,
        showTransactionModal,
        setShowTransactionModal,
        transactionStatus,
        hash,
        errorMessage,
        errorCategory,
        isTransactionInProgress
    } = useProposalTransaction();

    const requiredfieldsFilled = newProposal.title.trim() !== '' && newProposal.description.trim() !== '';

    function handleCreateProposal() {
        createProposal(newProposal);
        setIsFormOpen(false);
    }

    function handleReset() {
        resetTransaction();
        // Reset form only if transaction was successful
        if (transactionStatus === 'success') {
            setNewProposal({
                title: 'Nova Proposta',
                description: 'Esta é uma descrição padrão da proposta.',
            });
        }
    }

    const addRecentTransaction = useAddRecentTransaction();

    function handleCloseModal() {
        setShowTransactionModal(false);
        if (transactionStatus === 'success') {
            addRecentTransaction({
                hash: hash!,
                description: `Proposta criada: ${newProposal.title}`,
            });
            resetTransaction();
        }
    }

    return (
        <div className="flex justify-between items-center mt-10">
            <h1 className="text-2xl font-bold">Propostas</h1>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                    <Button
                        disabled={!isConnected}
                        variant={isConnected ? "default" : "outline"}
                        className={!isConnected ? "opacity-50 cursor-not-allowed" : ""}
                    >
                        <PlusIcon />
                        <span>Nova Proposta</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-hidden">
                    <DialogTitle>Nova Proposta</DialogTitle>
                    <DialogDescription className="flex flex-col gap-4 max-h-[60vh] p-4">
                        <Label htmlFor="title">Título</Label>
                        <Input 
                        id="title" 
                        type="text" 
                        placeholder="Título da Proposta" 
                        value={newProposal.title} 
                        onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })} 
                        />
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea 
                            id="description" 
                            placeholder="Descrição da proposta" 
                            value={newProposal.description} 
                            onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })} 
                        />
                    </DialogDescription>
                    <DialogFooter className="sticky bottom-0 pt-4">
                        <Button 
                            disabled={!requiredfieldsFilled || isTransactionInProgress}
                            className={(!requiredfieldsFilled || isTransactionInProgress) ? "opacity-50" : ""}
                            onClick={handleCreateProposal}
                        >
                        {transactionStatus === 'pending' ? (
                            <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Enviando...</span>
                            </>
                        ) : (
                            <>
                            <PlusIcon />
                            <span>Criar Tarefa</span>
                            </>
                        )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <TransactionModal
                isOpen={showTransactionModal}
                onClose={handleCloseModal}
                status={transactionStatus}
                hash={hash}
                error={errorMessage}
                errorCategory={errorCategory}
                onReset={handleReset}
                content={DEFAULT_CONTENTS.createProposal}
            />
        </div>
    )
}