ALTER TABLE "invoice_items" DROP CONSTRAINT "invoice_items_invoiceId_invoice_id_fk";
--> statement-breakpoint
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceId_invoice_id_fk" FOREIGN KEY ("invoiceId") REFERENCES "public"."invoice"("id") ON DELETE cascade ON UPDATE no action;