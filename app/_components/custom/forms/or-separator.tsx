import { Separator } from "@/app/_components/ui/separator";

export const OrSeparator = () => {
  return (
    <div className="flex items-center justify-between gap-3 w-full ">
      <Separator className="w-[43%]" />
      <p className="text-muted-foreground text-sm">or</p>
      <Separator className="w-[43%]" />
    </div>
  );
};
