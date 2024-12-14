import { isRedirectError } from "next/dist/client/components/redirect";
import { getErrorMessage } from "./error-factory";
import { toast as rawToast } from "@/app/_hooks/use-toast";

type Response = { title?: string; description: string; success: boolean };

type Options = {
  actionFn: {
    (): Promise<{ success: boolean; message: string }>;
  };
  title?: string;
};

export async function executeAction({
  actionFn,
  title,
}: Options): Promise<Response> {
  try {
    const response = await actionFn();
    return {
      title: title ? title : undefined,
      description: response.message,
      success: true,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      title: title ? title : undefined,
      description: getErrorMessage(error),
    };
  }
}

export function toast(response: Response) {
  if (response) {
    return rawToast({
      title: response.title,
      description: response.description,
      variant: response.success === true ? "default" : "destructive",
    });
  }

  if (!!response) {
    return rawToast({
      title: "Uh oh! Something went wrong.",
      description: "There was a problem developer has been notified.",
      variant: "destructive",
    });
  }
}
