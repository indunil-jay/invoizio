CREATE TABLE "businessProfileImage" (
	"id" text PRIMARY KEY NOT NULL,
	"businessId" text NOT NULL,
	"url" text NOT NULL,
	"publicId" text NOT NULL,
	"size" text NOT NULL,
	"type" text NOT NULL,
	"mimeType" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "businessProfileImage" ADD CONSTRAINT "businessProfileImage_businessId_business_id_fk" FOREIGN KEY ("businessId") REFERENCES "public"."business"("id") ON DELETE cascade ON UPDATE no action;