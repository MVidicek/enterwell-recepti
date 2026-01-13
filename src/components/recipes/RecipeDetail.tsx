import Image from 'next/image';
import Link from 'next/link';
import { getCdnUrl } from '@/lib/utils/cdn';
import { formatDifficulty, formatPrepTime } from '@/lib/utils/format';
import { Badge } from '@/components/ui/Badge';
import type { RecipeResponse } from '@/types/recipe';

interface RecipeDetailProps {
  recipe: RecipeResponse;
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link href="/recepti" className="text-orange-600 hover:text-orange-700 transition-colors">
          ← Natrag na recepte
        </Link>
      </nav>

      {/* Hero slika */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
        <Image
          src={getCdnUrl(recipe.imageCdnPath)}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge>{recipe.category}</Badge>
          <Badge variant="secondary">{recipe.cookingMethod}</Badge>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {recipe.title}
        </h1>

        <p className="text-lg text-gray-600">
          {recipe.lead}
        </p>

        {/* Meta info */}
        <div className="mt-6 flex flex-wrap gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span><strong>Vrijeme:</strong> {formatPrepTime(recipe.prepTime)}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span><strong>Porcija:</strong> {recipe.servings}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span><strong>Težina:</strong> {formatDifficulty(recipe.difficulty)}</span>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Sastojci */}
        <aside className="md:col-span-1">
          <div className="bg-orange-50 rounded-xl p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Sastojci
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between text-gray-700">
                  <span>{ingredient.name}</span>
                  <span className="text-gray-500">
                    {ingredient.amount} {ingredient.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Priprema */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Priprema
          </h2>
          <ol className="space-y-6">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </span>
                <p className="text-gray-700 pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Tagovi */}
      {recipe.tags.length > 0 && (
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Tagovi</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}
