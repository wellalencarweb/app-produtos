CREATE SCHEMA "produto";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "produto"."produtos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"preco" numeric(10, 2) NOT NULL,
	"categoria" varchar(256) NOT NULL,
	"descricao" varchar(256),
	"imagem" varchar(256),
	"deleted" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
