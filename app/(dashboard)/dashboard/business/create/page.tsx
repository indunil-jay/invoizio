import { CreateNewBusinessProfile } from "@/app/(dashboard)/dashboard/business/create/_components/create-new-business-profile";

export default async function Page() {
    return (
        <div className="max-w-xl w-full mx-auto min-h-[calc(100vh-6rem)] py-20 flex flex-col  justify-center  flex-none">
            <CreateNewBusinessProfile />
        </div>
    );
}
