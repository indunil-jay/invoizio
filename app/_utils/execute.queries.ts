type Options<T> = {
    queryFn: {
        (): Promise<T>;
    };
    refresh: boolean;
};

export async function executeQuery<T>({ queryFn }: Options<T>) {
    try {
        return await queryFn();
    } catch (error) {
        console.error(error);
    }
}
