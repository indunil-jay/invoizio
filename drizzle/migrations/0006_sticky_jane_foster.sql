CREATE TABLE "userCoverImage" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"url" text NOT NULL,
	"publicId" text NOT NULL,
	"size" text NOT NULL,
	"type" text NOT NULL,
	"mimeType" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "userCoverImage" ADD CONSTRAINT "userCoverImage_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;