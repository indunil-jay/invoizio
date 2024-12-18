import { isRedirectError } from "next/dist/client/components/redirect";
import { getErrorMessage } from "./get-error";

type Response = {
  title: string;
  success: boolean;
  message: string;
  redirectUrl?: string;
};

export type DefaultResponse = {
  success: boolean;
  message: string;
  redirectUrl?: string;
};

type Options<T> = {
  actionFn: () => Promise<T>;
  title: string;
  redirectUrl?: string;
};

export async function executeAction<T extends DefaultResponse>({
  actionFn,
  title,
  redirectUrl,
}: Options<T>): Promise<Response & Partial<T>> {
  try {
    const response = await actionFn();
    return {
      title,
      description: response.message,
      redirectUrl: response.redirectUrl || redirectUrl,
      ...response,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: getErrorMessage(error),
      redirectUrl,
    } as Response & Partial<T>;
  }
}
