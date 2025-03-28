"use client";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { useShowToast } from "@/app/_hooks/custom/use-show-toast";
import { useState } from "react";
import SpinnerBtnLoading from "@/app/_components/custom/spinner-btn-loading";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { deleteAllInvoices } from "../../../actions";

interface deleteSelectedInvoicesProps {
    ids: string[];
}

export const DeleteSelectedInvoices = ({
    ids,
}: deleteSelectedInvoicesProps) => {
    const router = useRouter();
    const { toast } = useShowToast();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        const response = await deleteAllInvoices(ids);
        toast(response);
        setIsLoading(false);
        setOpen(false);
        router.refresh();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size={"xsm"}
                    variant={"destructive"}
                    onClick={() => setOpen(true)}
                >
                    Delete All
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your details and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={isLoading} onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
                        onClick={handleConfirm}
                    >
                        {isLoading ? (
                            <>
                                <span>Deleting</span>
                                <SpinnerBtnLoading />
                            </>
                        ) : (
                            <span>Continue and Delete</span>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
