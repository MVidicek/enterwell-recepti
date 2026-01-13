import Image from 'next/image';
import Link from 'next/link';
import { getCdnUrl } from '@/lib/utils/cdn';
import { formatDifficulty, formatPrepTime } from '@/lib/utils/format';
import { Badge } from '@/components/ui/Badge';
import type { RecipeResponse } from '@/types/recipe';

interface RecipeCardProps {
  recipe: RecipeResponse;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recepti/${recipe.slug}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
        {/* Slika */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={getCdnUrl(recipe.imageCdnPath)}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Kategorija badge */}
          <div className="absolute top-3 left-3">
            <Badge>{recipe.category}</Badge>
          </div>
        </div>

        {/* Sadržaj */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
            {recipe.title}
          </h2>

          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {recipe.lead}
          </p>

          {/* Meta info */}
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatPrepTime(recipe.prepTime)}</span>
            </div>

            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{formatDifficulty(recipe.difficulty)}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
