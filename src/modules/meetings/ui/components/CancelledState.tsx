import EmptyState from "@/components/EmptyState";

const CancelledState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/Cancelled.svg"
        title="Meeting Cancelled"
        description="This Meeting was cancelled."
      />
    </div>
  );
};

export default CancelledState;
