import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPost() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Skeleton className="h-10 w-24 mb-6" />
      <Skeleton className="w-full h-[400px] mb-8 rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </div>
    </div>
  );
}
