import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { recipes } from '@/lib/db/schema';
import { createRecipeSchema } from '@/validators/recipe';
import { generateSlug } from '@/lib/utils/slug';
import { buildImagePath } from '@/lib/utils/cdn';
import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';

// GET /api/recipes - dohvati sve recepte
export async function GET() {
  try {
    const allRecipes = await db.select().from(recipes);

    return NextResponse.json(allRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju recepata' },
      { status: 500 }
    );
  }
}

// POST /api/recipes - kreiraj novi recept
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validiraj input
    const validated = createRecipeSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: 'Validacijska greška',
          details: validated.error.flatten()
        },
        { status: 400 }
      );
    }

    // Generiraj slug iz naslova
    const slug = generateSlug(validated.data.title);

    // Provjeri postoji li već recept s tim slugom
    const existing = await db
      .select()
      .from(recipes)
      .where(eq(recipes.slug, slug))
      .get();

    if (existing) {
      return NextResponse.json(
        { error: 'Recept s tim nazivom već postoji' },
        { status: 409 }
      );
    }

    const now = new Date();

    const newRecipe = {
      id: nanoid(),
      slug,
      title: validated.data.title,
      lead: validated.data.lead,
      prepTime: validated.data.prepTime,
      servings: validated.data.servings,
      difficulty: validated.data.difficulty,
      category: validated.data.category,
      cookingMethod: validated.data.cookingMethod,
      tags: validated.data.tags,
      ingredients: validated.data.ingredients,
      steps: validated.data.steps,
      imageCdnPath: validated.data.imageCdnPath || buildImagePath(slug),
      createdAt: now,
      updatedAt: now,
    };

    await db.insert(recipes).values(newRecipe);

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json(
      { error: 'Greška pri kreiranju recepta' },
      { status: 500 }
    );
  }
}
