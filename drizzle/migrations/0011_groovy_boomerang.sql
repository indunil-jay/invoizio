ALTER TABLE "invoice" DROP CONSTRAINT "invoice_clientId_client_id_fk";
--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_clientId_client_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."client"("id") ON DELETE cascade ON UPDATE no action;