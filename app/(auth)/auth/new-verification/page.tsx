import { Suspense } from "react";
import { NewVerificationForm } from "./new-verification-form";

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <nav>
        <Suspense fallback={<Fallback />}>
          <NewVerificationForm />
        </Suspense>
      </nav>
    </div>
  );
}
function Fallback() {
  return <>loading</>;
}
