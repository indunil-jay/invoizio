import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "../ui/button";
import SpinnerBtnLoading from "./spinner-btn-loading";

export const ConfirmationModal = ({
    isOpen,
    onConfirm,
    onCancel,
    message,
    isPending,
    title = "Are you absolutely sure?",
    cancleButtonText = "Cancel",
    confirmButtonText = "Confirm",
}: {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
    title?: string;
    isPending?: boolean;
    cancleButtonText?: string;
    confirmButtonText?: string;
}) => {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex gap-4 justify-end mt-4">
                        <Button disabled={isPending} onClick={onCancel}>
                            {cancleButtonText}
                        </Button>
                        <Button
                            disabled={isPending}
                            variant={"destructive"}
                            onClick={onConfirm}
                        >
                            {isPending ? (
                                <>
                                    {confirmButtonText}
                                    <SpinnerBtnLoading />
                                </>
                            ) : (
                                <span>{confirmButtonText}</span>
                            )}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
