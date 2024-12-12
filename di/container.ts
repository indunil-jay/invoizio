import { Container } from "inversify";

import { DI_RETURN_TYPES, DI_SYMBOLS } from "@/di/types";
import { UserModule } from "@/di/modules/user.module";
import { HashingModule } from "@/di/modules/hashing.module";
import { AuthenticationModule } from "@/di/modules/authentication.module";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = () => {
  ApplicationContainer.load(UserModule);
  ApplicationContainer.load(HashingModule);
  ApplicationContainer.load(AuthenticationModule);
};

export const destroyContainer = () => {
  ApplicationContainer.unload(UserModule);
  ApplicationContainer.unload(HashingModule);
  ApplicationContainer.unload(AuthenticationModule);
};

if (process.env.NODE_ENV !== "test") {
  initializeContainer();
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export { ApplicationContainer };
