import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui";
import { Badge } from "@/components/ui";
import { BadgeCheckIcon, Loader2 } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/constants";
import { useEffect } from "react";

interface ProposalCardProps {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    closingDate: string;
    votesFor: string;
    votesAgainst: string;
    status: string;
    isTransactionInProgress?: boolean;
    transactionStatus: string;
    onProposalVote: (id: string, vote: boolean, title: string) => void;
    onVoteSuccess: (title: string) => void;
}

export function ProposalCard({
    id,
    title,
    description,
    creationDate,
    closingDate,
    votesFor,
    votesAgainst,
    status,
    isTransactionInProgress = false,
    transactionStatus,
    onProposalVote,
    onVoteSuccess
}: ProposalCardProps) {
    const { address } = useAccount();
    const isActive = status === 'Em Votação';
    const isApproved = status === 'Aprovada';
    const isRejected = status === 'Rejeitada';

    const { data: hasVoted, refetch: refetchHasVoted } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'checkVoted',
        account: address as `0x${string}`,
        args: [BigInt(id)],
    });

    useEffect(() => {
        if (transactionStatus === 'success') {
            onVoteSuccess(title);
            refetchHasVoted();
        }
    }, [transactionStatus, onVoteSuccess, title, refetchHasVoted]);

    const canVote = isActive && !hasVoted;

    const handleVote = (vote: boolean) => {
        if (canVote && !isTransactionInProgress) {
            onProposalVote(id, vote, title);
        }
    }



    return (
        <Card className={`transition-all duration-200 ${isApproved ? 'opacity-75 bg-green-50 dark:bg-green-900/10' : isRejected ? 'bg-red-50 dark:bg-red-900/10' : ''} hover:shadow-lg hover:scale-[1.01]`}>
            <CardHeader>
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-sm text-gray-500">{description}</p>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-2">
                    <Badge className={`text-xs text-white ${isActive ? "bg-blue-600 dark:bg-blue-500" : isApproved ? "bg-green-600 dark:bg-green-500" : "bg-red-600 dark:bg-red-500"}`} variant={isActive ? "default" : isApproved ? "secondary" : "destructive"}>
                        {status}
                    </Badge>
                    <p className="text-sm text-gray-600">Criada em: {creationDate}</p>
                    <p className="text-sm text-gray-600">Encerramento: {closingDate}</p>
                    <div className="flex justify-between">
                        <span>Votos a favor: {votesFor}</span>
                        <span>Votos contra: {votesAgainst}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                {canVote && (
                    <>
                        <button
                            onClick={() => handleVote(true)}
                            disabled={isTransactionInProgress}
                            className={`px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded ${isTransactionInProgress ? 'opacity-25 cursor-not-allowed' : ''}`}
                        >
                            {isTransactionInProgress ? <Loader2 className="animate-spin" /> : 'Votar a Favor'}
                        </button>
                        <button
                            onClick={() => handleVote(false)}
                            disabled={isTransactionInProgress}
                            className={`px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded ${isTransactionInProgress ? 'opacity-25 cursor-not-allowed' : ''}`}
                        >
                            {isTransactionInProgress ? <Loader2 className="animate-spin" /> : 'Votar Contra'}
                        </button>
                    </>
                )}
                {hasVoted && (
                    <Badge variant="secondary" className="flex items-center bg-blue-600 text-white dark:bg-blue-500">
                        <BadgeCheckIcon className="mr-1" />
                        Já votou
                    </Badge>
                )}
            </CardFooter>
        </Card>
    );
}