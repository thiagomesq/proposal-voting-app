export interface Proposal {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  closingDate: string;
  votesFor: string;
  votesAgainst: string;
  status: string;
}

export interface ProposalCreation {
  title: string;
  description: string;
}

export const ProposalStatus: { [key: number]: string } = {
  0: "Em Votação",
  1: "Aprovada",
  2: "Rejeitada",
}
