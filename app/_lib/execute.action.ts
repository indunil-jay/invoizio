import { isRedirectError } from "next/dist/client/components/redirect";
import { getErrorMessage } from "./get-error";

export type Response = {
  title?: string;
  description: string;
  success: boolean;
  redirectUrl?: string;
  pageRefresh?: boolean;
  id?: string;
};

type Options = {
  actionFn: {
    (): Promise<{
      success: boolean;
      message: string;
      redirectUrl?: string;
      id?: string;
    }>;
  };
  title?: string;
  redirectUrl?: string;
};

export async function executeAction({
  actionFn,
  title,
  redirectUrl,
}: Options): Promise<Response> {
  try {
    const response = await actionFn();
    return {
      title: title ? title : undefined,
      description: response.message,
      success: true,
      redirectUrl: response.redirectUrl || redirectUrl,
      id: response.id ? response.id : undefined,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      title: title ? title : undefined,
      description: getErrorMessage(error),
      redirectUrl,
    };
  }
}
