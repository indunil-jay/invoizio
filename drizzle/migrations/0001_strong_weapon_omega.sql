ALTER TABLE "invoice" DROP CONSTRAINT "invoice_businessId_business_id_fk";
--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE cascade ON UPDATE no action;