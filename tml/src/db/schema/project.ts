import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const project = pgTable("projects", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    myRole: text("my_role"),
    techStack: text("tech_stack").array(),
    features: text("features").array(),
    linkGit: text("link_git"),
    linkDemo: text("link_demo"),
    status: text("status").notNull(),
    images: text("images").array()  
});