import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RecipeDetail } from '@/components/recipes/RecipeDetail';
import { getCdnUrl } from '@/lib/utils/cdn';
import { db } from '@/lib/db';
import { recipes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import type { RecipeResponse } from '@/types/recipe';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

async function getRecipe(slug: string): Promise<RecipeResponse | null> {
  const recipe = await db
    .select()
    .from(recipes)
    .where(eq(recipes.slug, slug))
    .get();

  if (!recipe) {
    return null;
  }

  // Convert Date objects to strings for serialization
  return {
    ...recipe,
    difficulty: recipe.difficulty as RecipeResponse['difficulty'],
    createdAt: recipe.createdAt.toISOString(),
    updatedAt: recipe.updatedAt.toISOString(),
  };
}

// Generiranje metadata za SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    return {
      title: 'Recept nije pronađen',
    };
  }

  return {
    title: recipe.title,
    description: recipe.lead,
    openGraph: {
      title: recipe.title,
      description: recipe.lead,
      type: 'article',
      images: [
        {
          url: getCdnUrl(recipe.imageCdnPath),
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.lead,
      images: [getCdnUrl(recipe.imageCdnPath)],
    },
  };
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    notFound();
  }

  return <RecipeDetail recipe={recipe} />;
}
