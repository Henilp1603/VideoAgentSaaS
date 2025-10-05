import ResponsiveDialog from "@/components/ResponsiveDialog";
import MeetingForm from "./MeetingForm";
import { MeetingGetOne } from "../../type";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initailValue: MeetingGetOne;
}

const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initailValue,
}: UpdateMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Update the Meeting Details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => {
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
        initialValues={initailValue}
      />
    </ResponsiveDialog>
  );
};

export default UpdateMeetingDialog;
