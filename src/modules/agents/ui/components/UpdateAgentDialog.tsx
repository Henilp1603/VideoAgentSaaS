import ResponsiveDialog from "@/components/ResponsiveDialog";
import AgentForm from "./AgentForm";
import { AgentGetOne } from "../../type";

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initailValue: AgentGetOne;
}

const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initailValue,
}: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Update the agent Details."
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initailValue}
      />
    </ResponsiveDialog>
  );
};

export default UpdateAgentDialog;
