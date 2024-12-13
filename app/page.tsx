import { auth } from "@/src/auth";
import { SignOut } from "./_components/signOut";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <SignOut />
      {JSON.stringify(session)}
    </>
  );
}
