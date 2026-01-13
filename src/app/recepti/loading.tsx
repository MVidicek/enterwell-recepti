export default function RecipesLoading() {
  return (
    <div>
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-5 w-72 bg-gray-200 rounded animate-pulse mt-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl overflow-hidden shadow-sm"
          >
            <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="flex gap-4">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
