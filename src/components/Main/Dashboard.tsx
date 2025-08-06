import { StatusCard } from "@/components/ui/statusCard";

interface DashboardProps {
    totalProposals: number;
    pendingProposals: number;
    approvedProposals: number;
    rejectedProposals: number;
    isLoading: boolean;
}

export function Dashboard({
    totalProposals,
    pendingProposals,
    approvedProposals,
    rejectedProposals,
    isLoading,
  }: DashboardProps) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatusCard 
        title="Total de propostas"
        value={totalProposals} 
        isLoading={isLoading}
      />
      <StatusCard 
        title="Propostas Pendentes"
        value={pendingProposals} 
        isLoading={isLoading}
      />
      <StatusCard 
        title="Propostas Aprovadas"
        value={approvedProposals} 
        isLoading={isLoading}
      />
      <StatusCard 
        title="Propostas Rejeitadas"
        value={rejectedProposals} 
        isLoading={isLoading}
      />
    </div>
  );
}
