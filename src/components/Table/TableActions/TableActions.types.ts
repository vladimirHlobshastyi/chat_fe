export interface TableActionsProps {
  editDisabled?: boolean;
  deleteDisabled?: boolean;
  addDisabled?: boolean;
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}
