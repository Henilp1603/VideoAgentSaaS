import { auth } from "@/lib/auth";
import Listheader from "@/modules/agents/ui/components/Listheader";
import AgentsView, {
  AgentViewError,
  AgentViewLoading,
} from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";

interface props {
  searchParams: Promise<SearchParams>;
}

const page = async ({ searchParams }: props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signIn");
  }
  const queryClient = getQueryClient();

  const params = await loadSearchParams(searchParams);
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...params })
  );

  return (
    <>
      <Listheader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentViewLoading />}>
          <ErrorBoundary fallback={<AgentViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;
