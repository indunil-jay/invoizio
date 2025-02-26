type Options<T> = {
    actionFn: () => Promise<T>;
};

export async function executeAction<T>({ actionFn }: Options<T>) {
    try {
        const serverResponse = await actionFn();
        console.log({ serverResponse });
    } catch (error) {
        console.log(error);
    }
}
