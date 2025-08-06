# Blockchain Proposal Voting DApp

This is a decentralized application (DApp) built with Next.js that allows users to create and vote on proposals. The entire process is managed by a smart contract on the Polygon Amoy test network, ensuring transparency and immutability.

## Features

-   **Wallet Integration**: Seamlessly connect to various crypto wallets using [RainbowKit](https://www.rainbowkit.com/).
-   **Proposal Dashboard**: View key statistics at a glance, including total, pending, approved, and rejected proposals.
-   **Create Proposals**: Authenticated users can create new proposals by submitting a title and description.
-   **Vote on Proposals**: Users can cast their vote (For or Against) on any active proposal. Each user can only vote once per proposal.
-   **Real-time Updates**: The proposal list and statuses are updated in real-time using blockchain event listeners.
-   **User-Friendly Transaction Modals**: Informative modals guide the user through transaction states (Pending, Confirming, Success, Error).
-   **Responsive Design**: A clean and modern UI that works across all devices.
-   **Dark/Light Mode**: Switch between themes for your viewing comfort.

## How It Works

The application is built on the Next.js App Router. It interacts with a smart contract deployed on the Polygon Amoy testnet.

-   **Frontend**: Built with [Next.js](https://nextjs.org/), [React](https://react.dev/), and styled with [Tailwind CSS](https://tailwindcss.com/).
-   **Blockchain Interaction**: We use the [wagmi](https://wagmi.sh/) hooks library to read from and write to the smart contract, as well as listen for on-chain events.
-   **Wallet Connection**: [RainbowKit](https://www.rainbowkit.com/) provides a simple and intuitive interface for users to connect their wallets.
-   **Custom Hooks**: The core logic for interacting with the blockchain is encapsulated in custom hooks found in `src/hooks`:
    -   `useProposals`: Fetches all proposals and their statistics.
    -   `useProposalTransaction`: Handles the logic for creating proposals and voting.
    -   `useProposalEvents`: Listens for contract events (`ProposalCreated`, `VoteRecorded`, `ProposalClosed`) to trigger real-time data refetching.

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   A package manager like `npm`, `yarn`, or `pnpm`
-   A crypto wallet browser extension, like [MetaMask](https://metamask.io/).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/thiagomesq/proposal-voting-app.git
    cd proposal-voting-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a file named `.env.local` in the root of the project and add the following variables.

    ```env
    # Get this from https://cloud.walletconnect.com/
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="YOUR_WALLETCONNECT_PROJECT_ID"

    # (Optional) You can use a custom RPC URL for the Polygon Amoy testnet
    # Get one from a provider like Alchemy or Infura
    NEXT_PUBLIC_AMOY_RPC_URL="YOUR_POLYGON_AMOY_RPC_URL"
    ```

4.  **Configure your wallet:**
    -   Make sure your wallet is connected to the **Polygon Amoy** test network.
    -   You will need some Amoy test POL to pay for gas fees. You can get some from a public faucet.

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the application running.