import { useRouter } from "next/router";

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div>
      <h1>Error: {error}</h1>
      <p>Something went wrong during the sign-in process. Please try again.</p>
    </div>
  );
}
