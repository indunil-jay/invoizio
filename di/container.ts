import { Container } from "inversify";

import { DI_RETURN_TYPES, DI_SYMBOLS } from "@/di/types";
import { UserModule } from "@/di/modules/user.module";
import { HashingModule } from "@/di/modules/hashing.module";
import { AuthenticationModule } from "@/di/modules/authentication.module";
import { VerificationTokenModule } from "@/di/modules/verification-token.module";
import { TokenGeneratorModule } from "@/di/modules/token-generator.module";
import { EmailModule } from "@/di/modules/email.module";
import { PasswordResetTokenModule } from "@/di/modules/password-reset-token.module";
import { AccountModule } from "@/di/modules/account.module";
import { BusinessModule } from "@/di/modules/business.module";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = () => {
  ApplicationContainer.load(UserModule);
  ApplicationContainer.load(HashingModule);
  ApplicationContainer.load(AuthenticationModule);
  ApplicationContainer.load(VerificationTokenModule);
  ApplicationContainer.load(TokenGeneratorModule);
  ApplicationContainer.load(EmailModule);
  ApplicationContainer.load(PasswordResetTokenModule);
  ApplicationContainer.load(AccountModule);
  ApplicationContainer.load(BusinessModule);
};

export const destroyContainer = () => {
  ApplicationContainer.unload(UserModule);
  ApplicationContainer.unload(HashingModule);
  ApplicationContainer.unload(AuthenticationModule);
  ApplicationContainer.unload(VerificationTokenModule);
  ApplicationContainer.unload(TokenGeneratorModule);
  ApplicationContainer.unload(EmailModule);
  ApplicationContainer.unload(PasswordResetTokenModule);
  ApplicationContainer.unload(AccountModule);
  ApplicationContainer.unload(BusinessModule);
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
