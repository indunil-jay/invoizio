ALTER TABLE "invoice_items" ALTER COLUMN "price" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "invoice_items" ALTER COLUMN "taxRate" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "invoice_items" ALTER COLUMN "discountRate" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "totalPrice" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "totalBasePrice" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "totalTax" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "totalDiscount" SET DATA TYPE numeric;