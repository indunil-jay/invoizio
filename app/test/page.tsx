import Spinner from "../_components/custom/spinner";
import { Button } from "../_components/ui/button";

const page = () => {
    return (
        <div className="w-72 m-20">
            <Button
                type="submit"
                className="w-full "
                size={"lg"}
                disabled={true}
            ></Button>
        </div>
    );
};

export default page;
