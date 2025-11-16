CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"projects" integer[],
	"icon" text
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"my_role" text,
	"tech_stack" text[],
	"features" text[],
	"link_git" text,
	"link_demo" text,
	"status" text NOT NULL,
	"images" text[]
);
