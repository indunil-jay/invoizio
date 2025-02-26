import { PresenterResponse } from "@/shared/types/response-type";
import { getErrorMessage } from "./get-error";

type ExecuteActionOptions<T> = {
    actionFn: () => Promise<PresenterResponse<T>>;
    title?: string;
};

export async function executeAction<T>({
    actionFn,
    title,
}: ExecuteActionOptions<T>) {
    try {
        const response: PresenterResponse<T> = await actionFn();

        return {
            title,
            message: response.message,
            data: response.data,
            status: response.status,
        };
    } catch (error) {
        const err = getErrorMessage(error);
        return {
            title,
            message: err.message,
            data: undefined,
            status: err.status,
        };
    }
}
