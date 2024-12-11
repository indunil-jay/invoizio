import { config } from "dotenv";
import { expand } from "dotenv-expand";

const loadEnv = () => {
  expand(config());
};

export default loadEnv;
