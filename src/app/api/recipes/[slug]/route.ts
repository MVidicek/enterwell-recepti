import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { recipes } from "@/lib/db/schema";
import { updateRecipeSchema } from "@/validators/recipe";
import { eq } from "drizzle-orm";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

// GET /api/recipes/:slug - dohvati jedan recept
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const recipe = await db
      .select()
      .from(recipes)
      .where(eq(recipes.slug, slug))
      .get();

    if (!recipe) {
      return NextResponse.json(
        { error: "Recept nije pronađen" },
        { status: 404 }
      );
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Greška pri dohvaćanju recepta" },
      { status: 500 }
    );
  }
}

// PUT /api/recipes/:slug - ažuriraj recept
//
// Napomena: Slug se ne može mijenjati jer bi to pokvarilo postojeće linkove.
// Za promjenu naslova koja bi trebala promijeniti slug, preporučam
// kreiranje novog recepta i redirect sa starog URL-a.
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // Validiraj input
    const validated = updateRecipeSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Validacijska greška",
          details: validated.error.flatten(),
        },
        { status: 400 }
      );
    }

    // Provjeri postoji li recept
    const existing = await db
      .select()
      .from(recipes)
      .where(eq(recipes.slug, slug))
      .get();

    if (!existing) {
      return NextResponse.json(
        { error: "Recept nije pronađen" },
        { status: 404 }
      );
    }

    // Ažuriraj recept
    await db
      .update(recipes)
      .set({
        ...validated.data,
        updatedAt: new Date(),
      })
      .where(eq(recipes.slug, slug));

    // Dohvati ažurirani recept
    const updated = await db
      .select()
      .from(recipes)
      .where(eq(recipes.slug, slug))
      .get();

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Greška pri ažuriranju recepta" },
      { status: 500 }
    );
  }
}

// DELETE /api/recipes/:slug - obriši recept
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    // Provjeri postoji li recept
    const existing = await db
      .select()
      .from(recipes)
      .where(eq(recipes.slug, slug))
      .get();

    if (!existing) {
      return NextResponse.json(
        { error: "Recept nije pronađen" },
        { status: 404 }
      );
    }

    // Obriši recept
    await db.delete(recipes).where(eq(recipes.slug, slug));

    // 204 No Content - uspješno obrisano
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Greška pri brisanju recepta" },
      { status: 500 }
    );
  }
}
