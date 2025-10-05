"use client";

import ErrorState from "@/components/ErrorState";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import CallProvider from "../components/CallProvider";

interface Props {
  meetingId: string;
}
const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  if (data.status === "completed") {
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorState
          title="Meeting Has Ended"
          description="You can no longer join this meeting"
        />
      </div>
    );
  }

  return (
    <div>
      <CallProvider meetingId={meetingId} meetingName={data.name} />
    </div>
  );
};

export default CallView;
