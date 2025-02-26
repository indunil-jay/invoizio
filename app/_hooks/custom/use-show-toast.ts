import { useToast } from "@/app/_hooks/use-toast";

type ResponseType = {
    title: string | undefined;
    message: string;
    status: boolean;
};

export const useShowToast = () => {
    const { toast: toaster } = useToast();

    const toast = (response: ResponseType) => {
        return toaster({
            title: response.status
                ? response.title || "Success"
                : response.title || "Uh oh! Something went wrong.",
            description: response.status
                ? response.message || "Operation was successful."
                : response.message ||
                  "There was a problem; the developer has been notified.",
            variant: response.status ? "default" : "destructive",
        });
    };

    return { toast };
};
