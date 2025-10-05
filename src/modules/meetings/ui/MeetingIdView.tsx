"use client";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import MeetingIdViewHeader from "./components/MeetingIdViewHeader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import UpdateMeetingDialog from "./components/UpdateMeetingDialog";
import { useState } from "react";
import UpcomingState from "./components/UpcomingState";
import ActiveState from "./components/ActiveState";
import CancelledState from "./components/CancelledState";
import ProcessingState from "./components/ProcessingState";

interface Props {
  meetingId: string;
}

const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const queryClient = useQueryClient();
  const router = useRouter();

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are You Sure !?",
    `The Following action will remove this meeting.`
  );

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const removeMeeting = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) {
      return;
    }

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initailValue={data}
      />
      <div className="flex flex-1 px-4 py-4 md:px-8 flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <div>Completed</div>}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
        {isActive && <ActiveState meetingId={meetingId} />}
      </div>
    </>
  );
};

export default MeetingIdView;

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting!!"
      description="This may take a few seconds."
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Something went wrong!!"
      description="Failed to load Meeting."
    />
  );
};
