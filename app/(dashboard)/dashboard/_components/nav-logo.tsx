import { SidebarSeparator } from "@/app/_components/ui/sidebar";
import { AudioWaveform } from "lucide-react";

export const SidebarLogo = () => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <AudioWaveform className="size-4" />
        </div>
        <div className="grid flex-1 text-left  leading-relaxed">
          <span className="truncate text-base  font-semibold">INVOIZIO</span>
          <span className="truncate text-xs text-muted-foreground">
            Your Ultimate Invoice Manager
          </span>
        </div>
      </div>
      <SidebarSeparator />
    </>
  );
};
