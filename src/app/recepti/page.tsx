import { Metadata } from 'next';
import { RecipeGrid } from '@/components/recipes/RecipeGrid';
import { db } from '@/lib/db';
import { recipes } from '@/lib/db/schema';
import type { RecipeResponse } from '@/types/recipe';

export const metadata: Metadata = {
  title: 'Svi recepti',
  description: 'Pregledaj našu kolekciju ukusnih recepata za svaku prigodu.',
  openGraph: {
    title: 'Svi recepti',
    description: 'Pregledaj našu kolekciju ukusnih recepata za svaku prigodu.',
  },
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

async function getRecipes(): Promise<RecipeResponse[]> {
  const allRecipes = await db.select().from(recipes);

  // Convert Date objects to strings for serialization
  return allRecipes.map(recipe => ({
    ...recipe,
    difficulty: recipe.difficulty as RecipeResponse['difficulty'],
    createdAt: recipe.createdAt.toISOString(),
    updatedAt: recipe.updatedAt.toISOString(),
  }));
}

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Recepti</h1>
        <p className="mt-2 text-gray-600">
          Pronađi savršen recept za svaku prigodu
        </p>
      </div>

      <RecipeGrid recipes={recipes} />
    </div>
  );
}
