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
import { BusinessAddressModule } from "@/di/modules/business-address.module";
import { TransactionManagerModule } from "@/di/modules/transaction-manager.module";
import { ClientModule } from "@/di/modules/client.module";
import { ClientAddressModule } from "@/di/modules/client-address.module";
import { InvoiceModule } from "@/di/modules/invoice.module";
import { InvoiceItemsModule } from "@/di/modules/invoice-items.module";

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
  ApplicationContainer.load(BusinessAddressModule);
  ApplicationContainer.load(TransactionManagerModule);
  ApplicationContainer.load(ClientModule);
  ApplicationContainer.load(ClientAddressModule);
  ApplicationContainer.load(InvoiceModule);
  ApplicationContainer.load(InvoiceItemsModule);
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
  ApplicationContainer.unload(BusinessAddressModule);
  ApplicationContainer.unload(TransactionManagerModule);
  ApplicationContainer.unload(ClientModule);
  ApplicationContainer.unload(ClientAddressModule);
  ApplicationContainer.load(InvoiceModule);
  ApplicationContainer.load(InvoiceItemsModule);
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
