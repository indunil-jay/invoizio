type Options<T> = {
  queryFn: {
    (): Promise<T>;
  };
};

export async function executeQuery<T>({ queryFn }: Options<T>) {
  try {
    return await queryFn();
  } catch (error) {
    console.error(error);
    return null;
  }
}
