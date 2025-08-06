export interface ProposalCreatedEvent {
  id: string;
  title: string;
  description: string;
  creationDate: bigint;
  transactionHash: string;
  blockNumber: number;
}

export interface ProposalVotedEvent {
    proposalId: string;
    transactionHash: string;
    blockNumber: number;
}

export interface ProposalClosedEvent {
  proposalId: string;
  status: string;
  transactionHash: string;
  blockNumber: number;
}