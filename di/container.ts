import { Container } from "inversify";

import { DI_RETURN_TYPES, DI_SYMBOLS } from "@/di/types";
import { UserModule } from "@/di/modules/user.module";
import { HashingModule } from "@/di/modules/hashing.module";
import { AuthenticationModule } from "@/di/modules/authentication.module";
import { VerificationTokenModule } from "@/di/modules/verification-token.module";
import { TokenGeneratorModule } from "@/di/modules/token-generator.module";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = () => {
  ApplicationContainer.load(UserModule);
  ApplicationContainer.load(HashingModule);
  ApplicationContainer.load(AuthenticationModule);
  ApplicationContainer.load(VerificationTokenModule);
  ApplicationContainer.load(TokenGeneratorModule);
};

export const destroyContainer = () => {
  ApplicationContainer.unload(UserModule);
  ApplicationContainer.unload(HashingModule);
  ApplicationContainer.unload(AuthenticationModule);
  ApplicationContainer.unload(VerificationTokenModule);
  ApplicationContainer.unload(TokenGeneratorModule);
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
