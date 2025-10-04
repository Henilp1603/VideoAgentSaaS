"use client";

import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import EmptyState from "@/components/EmptyState";
import { useRouter } from "next/navigation";
import useMeetingFilters from "../hooks/use-meeting-filters";
import DataPagination from "@/modules/agents/ui/components/DataPagination";

const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingFilters();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({ ...filters })
  );

  return (
    <div className="flex flex-1 pb-4 md:px-8 flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPage={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create Your First Meeting"
          description="Schedule a meeting to connect with other. Each meeting leta you collaborate, share ideas, and interact with participants in real time."
        />
      )}
    </div>
  );
};

export default MeetingsView;

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings!!"
      description="This may take a few seconds."
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Something went wrong!!"
      description="Failed to load Meetings."
    />
  );
};
