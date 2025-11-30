import Skeleton from "@/components/Skeleton";

export default function EventsLoading() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header Skeleton */}
        <div className="text-center mb-12 flex flex-col items-center">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96 max-w-full" />

          {/* Tabs Skeleton */}
          <div className="flex justify-center mt-8">
             <Skeleton className="h-10 w-64 rounded-full" />
          </div>
        </div>

        {/* Event Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Card Image Area */}
              <Skeleton className="h-48 w-full rounded-none" />

              {/* Card Content Area */}
              <div className="p-6 flex-1 space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />

                {/* Footer of card */}
                <div className="pt-4 mt-auto flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
