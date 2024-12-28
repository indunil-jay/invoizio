import { GalleryVerticalEnd } from "lucide-react";

export const Logo = () => {
    return (
        <div className="flex gap-2 md:justify-start">
            <p className="flex items-center gap-2 font-medium ">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                </span>
                <span className="uppercase text-lg font-semibold">
                    Invoizio
                </span>
            </p>
        </div>
    );
};
