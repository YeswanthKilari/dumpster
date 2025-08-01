CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"path" text NOT NULL,
	"size" integer NOT NULL,
	"type" varchar NOT NULL,
	"file_url" text NOT NULL,
	"thumbnail_url" text NOT NULL,
	"user_id" uuid NOT NULL,
	"parent_id" uuid,
	"is_folder" boolean DEFAULT false NOT NULL,
	"is_marked" boolean DEFAULT false NOT NULL,
	"is_trash" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
