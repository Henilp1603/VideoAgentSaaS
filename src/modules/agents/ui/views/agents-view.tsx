"use client";

import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import EmptyState from "@/components/EmptyState";

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data} columns={columns} />

      {data.length === 0 && (
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
