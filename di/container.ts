import "server-only";

import { Container } from "inversify";

import { DI_RETURN_TYPES, DI_SYMBOLS } from "@/di/types";
import { UserModule } from "@/di/modules/user.module";
import { HashingModule } from "@/di/modules/hashing.module";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = () => {
  ApplicationContainer.load(UserModule);
  ApplicationContainer.load(HashingModule);
};

export const destroyContainer = () => {
  ApplicationContainer.unload(UserModule);
  ApplicationContainer.unload(HashingModule);
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
