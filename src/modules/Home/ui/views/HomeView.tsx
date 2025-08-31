"use client";

import { authClient } from "@/lib/auth-client";
// import { useTRPC } from "@/trpc/client";
// import { useQuery } from "@tanstack/react-query";

import React from "react";

const HomeView = () => {
  const { data: session } = authClient.useSession();

  // const trpc = useTRPC();
  // const { data } = useQuery(trpc.hello.queryOptions({ text: "Henil" }));

  if (!session) {
    return <p>Loading...</p>;
  }
  return <div className="flex flex-col gap-y-4 p-4">Home Page</div>;
};

export default HomeView;
