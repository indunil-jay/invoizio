import Link from "next/link";

export const FogotPasswordLink = () => {
  return (
    <div className="flex justify-end">
      <Link
        href={"/forgot-password"}
        className="text-xs text-blue-500 transition-colors hover:text-blue-600  underline-offset-2 font-medium underline"
      >
        Fogot password?
      </Link>
    </div>
  );
};
