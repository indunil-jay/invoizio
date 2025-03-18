import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { CreateBusinessForm } from "@/app/(dashboard)/dashboard/business/create/_components/create-business-form";

export const CreateNewBusinessProfile = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Business</CardTitle>
                <CardDescription>
                    Set up your new business profile quickly and easily.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateBusinessForm />
            </CardContent>
        </Card>
    );
};
