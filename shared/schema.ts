import { pgTable, text, serial, integer, boolean, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  footData: jsonb("foot_data"),
  preferences: jsonb("preferences"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
});

// Shoe schema
export const shoes = pgTable("shoes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  price: real("price").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  modelUrl: text("model_url").notNull(),
  category: text("category").notNull(),
  rating: real("rating"),
  reviewCount: integer("review_count"),
  isArReady: boolean("is_ar_ready").notNull().default(true),
  sizes: jsonb("sizes").notNull(),
});

export const insertShoeSchema = createInsertSchema(shoes).omit({
  id: true,
});

// Testimonial schema
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  rating: real("rating").notNull(),
  review: text("review").notNull(),
  productName: text("product_name"),
  avatarUrl: text("avatar_url"),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Shoe = typeof shoes.$inferSelect;
export type InsertShoe = z.infer<typeof insertShoeSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
