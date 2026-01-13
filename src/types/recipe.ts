export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  lead: string;
  prepTime: number;
  servings: number;
  difficulty: Difficulty;
  category: string;
  cookingMethod: string;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  imageCdnPath: string;
  createdAt: Date;
  updatedAt: Date;
}

// Za API response (datumi kao stringovi)
export interface RecipeResponse {
  id: string;
  slug: string;
  title: string;
  lead: string;
  prepTime: number;
  servings: number;
  difficulty: Difficulty;
  category: string;
  cookingMethod: string;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  imageCdnPath: string;
  createdAt: string;
  updatedAt: string;
}

// Za kreiranje novog recepta (bez auto-generiranih polja)
export interface CreateRecipeInput {
  title: string;
  lead: string;
  prepTime: number;
  servings: number;
  difficulty: Difficulty;
  category: string;
  cookingMethod: string;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  imageCdnPath?: string;
}

// Za update (sva polja opcionalna)
export type UpdateRecipeInput = Partial<CreateRecipeInput>;
