import { toast } from "@/app/_hooks/use-toast";
import { useRouter } from "next/navigation";

type Response = {
  title: string;
  success: boolean;
  message: string;
  redirectUrl?: string;
};

export const useShowToast = () => {
  const router = useRouter();

  return (response: Response) => {
    if (response) {
      toast({
        title: response.title,
        description: response.message,
        variant: Boolean(response.success) ? "default" : "destructive",
      });

      if (response.redirectUrl) {
        router.push(response.redirectUrl);
      }
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem; the developer has been notified.",
        variant: "destructive",
      });
    }
  };
};
