import { NewVerificationForm } from "./new-verification-form";

export default async function Page(props: {
  searchParams: Promise<{ token: string }>;
}) {
  const searchParams = await props.searchParams;
  const token = searchParams.token;
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <nav>
        <NewVerificationForm token={token} />
      </nav>
    </div>
  );
}
