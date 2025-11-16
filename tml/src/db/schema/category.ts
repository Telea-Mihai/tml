import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const category = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  projects: integer("projects").array(),
  icon: text("icon")
});
