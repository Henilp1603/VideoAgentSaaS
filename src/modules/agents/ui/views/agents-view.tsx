"use client";

import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import EmptyState from "@/components/EmptyState";
import useAgentFilters from "../../hooks/use-agent-filters";
import DataPagination from "../components/DataPagination";
import { useRouter } from "next/navigation";

const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentFilters();
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPage={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />

      {data.items.length === 0 && (
        <EmptyState
          title="Create Your First Agent"
          description="Create an Agent to join your meetings.Each Agent will follow your instructions and can intract with participants during the call"
        />
      )}
    </div>
  );
};

export default AgentsView;

export const AgentViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents!!"
      description="This may take a few seconds."
    />
  );
};

export const AgentViewError = () => {
  return (
    <ErrorState
      title="Something went wrong!!"
      description="Failed to load Agents."
    />
  );
};
