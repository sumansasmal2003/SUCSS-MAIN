import Skeleton from "@/components/Skeleton";

export default function GalleryLoading() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Section Title Skeleton */}
        <div className="mb-12 text-center flex flex-col items-center">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96 max-w-full" />
          <Skeleton className="w-24 h-1 mt-4 rounded-full bg-accent/20" />
        </div>

        {/* Image Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-surface"
            >
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
