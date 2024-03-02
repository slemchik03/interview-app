import { RESULTS_PER_PAGE } from "../../utils/mock";

function CardTextSkeleton() {
  return <div className="w-full h-2 animate-pulse bg-gray-200"></div>;
}
export default function CardSkeleton() {
  return (
    <div className="w-full grid items-center h-[290px] px-4 py-2 rounded-xl bg-white shadow-xl animate-pulse hover:scale-95 transition-all">
      <div className="flex gap-7 justify-between items-center">
        <div className="min-w-[72px] h-[72px] rounded-full animate-pulse bg-gray-200"></div>
        <CardTextSkeleton />
      </div>
      <div className="flex gap-2 justify-center md:justify-between flex-row flex-wrap py-10">
        <CardTextSkeleton />
        <CardTextSkeleton />
      </div>
    </div>
  );
}
export function CardSkeletonList({ count = RESULTS_PER_PAGE }: { count?: number }) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, idx) => (
          <CardSkeleton key={idx} />
        ))}
    </>
  );
}
