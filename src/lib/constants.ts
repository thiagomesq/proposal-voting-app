import type { TransactionContent } from "@/interfaces/Transaction";

export const CONTRACT_ADDRESS = '0x0cb33b7f246491feba265a4c208303235f5f3423';

export const CONTRACT_ABI = [
    {
        "type": "constructor",
        "inputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "checkUpkeep",
        "inputs": [
            {
                "name": "",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [
            {
                "name": "upkeepNeeded",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "performData",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "checkVoted",
        "inputs": [
            {
                "name": "proposalId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "createProposal",
        "inputs": [
            {
                "name": "title",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getProposals",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "tuple[]",
                "internalType": "struct ProposalVoting.Proposal[]",
                "components": [
                    {
                        "name": "id",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "title",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "description",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "votesFor",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "votesAgainst",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum ProposalVoting.ProposalStatus"
                    },
                    {
                        "name": "creationDate",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "performUpkeep",
        "inputs": [
            {
                "name": "performData",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setAutomationForwarder",
        "inputs": [
            {
                "name": "forwarder",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "vote",
        "inputs": [
            {
                "name": "proposalId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "support",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "AutomationForwarderSet",
        "inputs": [
            {
                "name": "forwarder",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ProposalClosed",
        "inputs": [
            {
                "name": "proposalId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "status",
                "type": "uint8",
                "indexed": false,
                "internalType": "enum ProposalVoting.ProposalStatus"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ProposalCreated",
        "inputs": [
            {
                "name": "id",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "title",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "description",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "creationDate",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "VoteRecorded",
        "inputs": [
            {
                "name": "proposalId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "ProposalVoting__AlreadyVoted",
        "inputs": [
            {
                "name": "proposalId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "ProposalVoting__ForwarderAddressNotSet",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ProposalVoting__InvalidForwarderAddress",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ProposalVoting__NotAuthorized",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ProposalVoting__ProposalNotFound",
        "inputs": [
            {
                "name": "proposalId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "ProposalVoting__TitleOrDescriptionEmpty",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ProposalVoting__VotingAlreadyEnded",
        "inputs": [
            {
                "name": "proposalId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "ReentrancyGuardReentrantCall",
        "inputs": []
    }
] as const;

export const DEFAULT_CONTENTS = {
  createProposal: {
    pending: {
      title: "Enviando Transação",
      description: "Confirme a transação na sua carteira..."
    },
    confirming: {
      title: "Confirmando Transação",
      description: "Aguarde enquanto a transação está sendo confirmada na blockchain..."
    },
    success: {
      title: "Proposta Criada!",
      description: "Sua proposta foi criada com sucesso na blockchain.",
      buttonText: "Criar Nova Proposta"
    }
  },
  voteProposal: {
    pending: {
      title: "Votando na Proposta",
      description: "Confirme a votação na proposta na sua carteira..."
    },
    confirming: {
      title: "Confirmando Votação",
      description: "Aguarde enquanto a votação está sendo confirmada na blockchain..."
    },
    success: {
      title: "Votação Realizada!",
      description: "Sua votação foi realizada com sucesso. A recompensa foi enviada para sua carteira.",
      buttonText: "Fechar"
    }
  },
  generic: {
    pending: {
      title: "Enviando Transação",
      description: "Confirme a transação na sua carteira..."
    },
    confirming: {
      title: "Confirmando Transação",
      description: "Aguarde enquanto a transação está sendo confirmada na blockchain..."
    },
    success: {
      title: "Transação Confirmada!",
      description: "Sua transação foi confirmada com sucesso na blockchain.",
      buttonText: "Fechar"
    }
  }
} as const satisfies Record<string, TransactionContent>;