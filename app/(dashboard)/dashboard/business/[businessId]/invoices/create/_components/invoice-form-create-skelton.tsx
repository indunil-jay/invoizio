import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { Skeleton } from "@/app/_components/ui/skeleton";

export const InvoiceFormCreateSkelton = () => {
    return (
        <Card className="">
            <CardHeader className="p-6 lg:p-8">
                <CardTitle>
                    <Skeleton className="w-[300px] h-6" />
                </CardTitle>
                <CardDescription className="uppercase flex gap-1">
                    # <Skeleton className="w-[200px] h-4" />
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6 lg:p-8">
                <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-3">
                            {Array.from({ length: 3 }, (_, index) => (
                                <div key={index}>
                                    <Skeleton className="w-[160px] h-4" />
                                    <Skeleton className="w-full h-10 rounded-md mt-2" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            {Array.from({ length: 3 }, (_, index) => (
                                <div key={index}>
                                    <Skeleton className="w-[160px] h-4" />
                                    <Skeleton className="w-full h-10 rounded-md mt-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Separator />

                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between gap-4 flex-grow">
                            {Array.from({ length: 2 }, (_, index) => (
                                <div key={index} className="w-full">
                                    <Skeleton className="w-[160px] h-4" />
                                    <Skeleton className="w-full h-10 rounded-md mt-2" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <Skeleton className="w-[160px] h-4" />
                            <Skeleton className="w-full h-20 rounded-md  mt-2" />
                        </div>
                    </div>

                    <Separator />
                    <div className="flex flex-col gap-4">
                        <Skeleton className="self-end w-[160px] rounded-md h-10" />
                        <Skeleton className="w-full h-20 rounded-md " />
                    </div>
                    <Separator />
                    <div className="flex justify-end  gap-6">
                        <Skeleton className="self-end w-[160px] rounded-md h-10" />
                        <Skeleton className="self-end w-[180px] rounded-md h-10" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
