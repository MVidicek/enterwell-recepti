import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import type { Ingredient } from '@/types/recipe';

export const recipes = sqliteTable('recipes', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  lead: text('lead').notNull(),
  prepTime: integer('prep_time').notNull(),
  servings: integer('servings').notNull(),
  difficulty: text('difficulty').notNull(), // 'easy' | 'medium' | 'hard'
  category: text('category').notNull(),
  cookingMethod: text('cooking_method').notNull(),
  tags: text('tags', { mode: 'json' }).$type<string[]>().notNull(),
  ingredients: text('ingredients', { mode: 'json' }).$type<Ingredient[]>().notNull(),
  steps: text('steps', { mode: 'json' }).$type<string[]>().notNull(),
  imageCdnPath: text('image_cdn_path').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// Tip za select rezultat
export type RecipeSelect = typeof recipes.$inferSelect;

// Tip za insert
export type RecipeInsert = typeof recipes.$inferInsert;
