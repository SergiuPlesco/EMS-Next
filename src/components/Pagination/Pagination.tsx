import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
import { useRouter } from "next/router";

interface IProps {
  page: number;
  count: number;
  onChange: (val: number) => void;
}

const GROUP_MAX = 5;
const half = Math.ceil(GROUP_MAX / 2);

export default function PaginationSection(props: IProps) {
  const { query, pathname } = useRouter();

  const { page, count } = props;

  const getLink = (current: number) => (
    <Link
      key={current}
      href={createPageURL(current)}
      className="py-1 px-4 rounded hover:bg-slate-100"
    >
      {current}
    </Link>
  );

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(Object(query));
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="mx-auto max-w-96 gap-2 flex flex-row justify-center items-center">
        {count > 1 && (
          <Link
            href={createPageURL(page > 1 ? page - 1 : 1)}
            className="py-1 px-4 rounded hover:bg-slate-100"
          >
            <ChevronLeft />
          </Link>
        )}

        {count <= GROUP_MAX + 2 ? (
          Array(count)
            .fill(0)
            .map((_, index) => getLink(index + 1))
        ) : (
          <>
            {getLink(1)}
            {page > 1 + half && <span className="leading-10">...</span>}
            {Array(GROUP_MAX)
              .fill(0)
              .map((_, index) => {
                const p = page - half + index + 1;
                return p > 1 && p < count ? getLink(p) : "";
              })}
            {page < count - half && <span className="leading-10">...</span>}
            {getLink(count)}
          </>
        )}

        {count > 1 && (
          <Link
            href={createPageURL(page < count ? page + 1 : 4)}
            className="py-1 px-4 rounded hover:bg-slate-100"
          >
            <ChevronRight />
          </Link>
        )}
      </div>
      {/* <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(page > 1 ? page - 1 : 1)}
              isActive={page > 1}
            />
          </PaginationItem>
          <PaginationItem>
            <Link href={createPageURL(1)}>1</Link>
          </PaginationItem>
          <PaginationItem>
            <Link href={createPageURL(2)}>2</Link>
          </PaginationItem>
          <PaginationItem>
            <Link href={createPageURL(3)}>3</Link>
          </PaginationItem>
          <PaginationItem>
            <Link href={createPageURL(4)}>4</Link>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={createPageURL(page < count ? page + 1 : 4)}
              isActive={page < count}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </>
  );
}
