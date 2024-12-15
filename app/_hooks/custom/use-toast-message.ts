import { toast } from "@/app/_hooks/use-toast";
import { Response } from "@/app/_lib/execute.action";
import { useRouter } from "next/navigation";

export const useShowToast = () => {
  const router = useRouter();

  return (response: Response) => {
    if (response) {
      toast({
        title: response.title,
        description: response.description,
        variant: response.success === true ? "default" : "destructive",
      });

      if (response.redirectUrl) {
        router.push(response.redirectUrl);
      }
    }

    if (!response) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem; the developer has been notified.",
        variant: "destructive",
      });
    }
  };
};