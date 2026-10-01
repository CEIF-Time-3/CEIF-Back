CREATE TABLE "product-categorys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"product_category_id" uuid NOT NULL,
	"image_url" text,
	"description" varchar(500),
	"available" boolean DEFAULT true NOT NULL,
	"ingredients" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_product_category_id_product-categorys_id_fk" FOREIGN KEY ("product_category_id") REFERENCES "public"."product-categorys"("id") ON DELETE cascade ON UPDATE no action;