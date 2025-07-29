import { injectable } from "inversify";
import { InvoiceCreated } from "../../domain/events/invoice-created.event";

export interface IInvoiceCreatedEventHandler {
    handle(event: InvoiceCreated): Promise<void>;
}

@injectable()
export class InvoiceCreatedEventHandler implements IInvoiceCreatedEventHandler {
    async handle(event: InvoiceCreated): Promise<void> {
        console.log("invoice has been created.");
    }
}
