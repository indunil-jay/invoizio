import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <Card className=" max-w-md w-full">
        <CardHeader>
          <p className="text-4xl font-semibold uppercase">Error</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xl font-medium text-muted-foreground">
            Something went wrong! Please try again.
          </p>
          <Button>
            <Link href={"/auth/sign-in"} className="flex items-center gap-0.5">
              <MoveLeft className="mr-2" />
              Go Back
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
