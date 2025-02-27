import InvoizioVerifiyAccount from "@/src/shared-infrastructure/resend/templates/account-verifiy";

const page = () => {
    return (
        <div>
            <InvoizioVerifiyAccount userName="jay" verifyUrl="" />
        </div>
    );
};

export default page;
