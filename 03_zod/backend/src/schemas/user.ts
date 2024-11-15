import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const roleEnum = pgEnum("role_enum", ["admin", "user"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: roleEnum("role"),
  statusMessage: text("status_message"),
});

export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email(),
  name: (schema) => schema.name.min(1),
});

export const selectUserSchema = createSelectSchema(users, {
  email: (schema) => schema.email.email(),
  name: (schema) => schema.name.min(1),
});

export type User = z.infer<typeof selectUserSchema>;
