ALTER TABLE "activities" RENAME COLUMN "invoice_id" TO "invoiceId";--> statement-breakpoint
ALTER TABLE "activities" RENAME COLUMN "client_id" TO "clientId";--> statement-breakpoint
ALTER TABLE "activities" DROP CONSTRAINT "activities_invoice_id_invoice_id_fk";
--> statement-breakpoint
ALTER TABLE "activities" DROP CONSTRAINT "activities_client_id_client_id_fk";
--> statement-breakpoint
ALTER TABLE "activities" ADD COLUMN "businessId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_invoiceId_invoice_id_fk" FOREIGN KEY ("invoiceId") REFERENCES "public"."invoice"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_clientId_client_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."client"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE cascade ON UPDATE no action;