"use client";

import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>AgentsView : {JSON.stringify(data, null, 2)}</div>;
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
