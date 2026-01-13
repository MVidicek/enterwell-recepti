import Link from 'next/link';

export default function RecipeNotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Recept nije pronađen
      </p>
      <Link
        href="/recepti"
        className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
      >
        Natrag na recepte
      </Link>
    </div>
  );
}
