import { z } from 'zod';

// Schema za pojedini sastojak
export const ingredientSchema = z.object({
  name: z.string().min(1, 'Naziv sastojka je obavezan'),
  amount: z.number().positive('Količina mora biti pozitivna'),
  unit: z.string().min(1, 'Jedinica je obavezna'),
});

// Schema za kreiranje recepta
export const createRecipeSchema = z.object({
  title: z
    .string()
    .min(3, 'Naziv mora imati barem 3 znaka')
    .max(200, 'Naziv može imati maksimalno 200 znakova'),
  lead: z
    .string()
    .min(10, 'Kratki opis mora imati barem 10 znakova')
    .max(500, 'Kratki opis može imati maksimalno 500 znakova'),
  prepTime: z
    .number()
    .int('Vrijeme mora biti cijeli broj')
    .positive('Vrijeme mora biti pozitivno')
    .max(1440, 'Vrijeme ne može biti veće od 24 sata'),
  servings: z
    .number()
    .int('Broj porcija mora biti cijeli broj')
    .positive('Broj porcija mora biti pozitivan')
    .max(100, 'Broj porcija ne može biti veći od 100'),
  difficulty: z.enum(['easy', 'medium', 'hard'], {
    message: 'Težina mora biti easy, medium ili hard',
  }),
  category: z.string().min(1, 'Kategorija je obavezna'),
  cookingMethod: z.string().min(1, 'Način pripreme je obavezan'),
  tags: z
    .array(z.string())
    .max(10, 'Maksimalno 10 tagova'),
  ingredients: z
    .array(ingredientSchema)
    .min(1, 'Recept mora imati barem jedan sastojak'),
  steps: z
    .array(z.string().min(1, 'Korak ne može biti prazan'))
    .min(1, 'Recept mora imati barem jedan korak pripreme'),
  imageCdnPath: z.string().optional(),
});

// Schema za update (sva polja opcionalna)
export const updateRecipeSchema = createRecipeSchema.partial();

// Tipovi izvedeni iz schema
export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>;
