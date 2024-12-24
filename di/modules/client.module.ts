import { IClientRepository } from "@/src/application/repositories/client-repository.interface";
import { ClientRepository } from "@/src/infastructure/repositories/client-repository";
import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../types";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IClientRepository>(DI_SYMBOLS.IClientRepository).to(ClientRepository);
};

export const ClientModule = new ContainerModule(initializeModule);
