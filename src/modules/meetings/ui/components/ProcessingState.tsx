import EmptyState from "@/components/EmptyState";

const ProcessingState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/Processing.svg"
        title="Meeting Completed"
        description="This Meeting was completed, a summary will appear soon"
      />
    </div>
  );
};

export default ProcessingState;
