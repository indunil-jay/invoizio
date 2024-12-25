import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "../ui/button";

export const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
  isPending,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  isPending?: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-4 justify-end mt-4">
            <Button disabled={isPending} onClick={onCancel}>
              Cancel
            </Button>
            <Button
              disabled={isPending}
              variant={"destructive"}
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
