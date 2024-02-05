import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

import { cn } from "@/lib/utils";

import { FILTERS } from "../Filters/utils/constans";

interface IProps {
  totalPages: number;
}

const MAX_VISIBLE_PAGES = 3;
const half = Math.ceil(MAX_VISIBLE_PAGES / 2);

export default function PaginationSection(props: IProps) {
  const { query, pathname } = useRouter();
  const currentPage = Number(query.page) || 1;
  const { totalPages } = props;

  const getLink = (current: number) => (
    <Link
      key={current}
      href={createPageURL(current)}
      className={cn("py-1 px-2 rounded hover:bg-slate-100", {
        "bg-slate-100": currentPage === current,
      })}
    >
      {current}
    </Link>
  );

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(Object(query));
    params.set(FILTERS.PAGE, pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages === 1) {
    return null;
  }

  return (
    <>
      <div className="mx-auto max-w-90 gap-1 flex flex-row justify-center items-center">
        {totalPages > 1 && (
          <Link
            href={createPageURL(currentPage > 1 ? currentPage - 1 : 1)}
            className="py-1 px-2 rounded hover:bg-slate-100"
          >
            <ChevronLeft />
          </Link>
        )}

        {totalPages <= MAX_VISIBLE_PAGES + 2 ? (
          Array(totalPages)
            .fill(0)
            .map((_, index) => getLink(index + 1))
        ) : (
          <>
            {getLink(1)}
            {currentPage > 1 + half && <span className="leading-10">...</span>}
            {Array(MAX_VISIBLE_PAGES)
              .fill(0)
              .map((_, index) => {
                const p = currentPage - half + index + 1;
                return p > 1 && p < totalPages ? getLink(p) : "";
              })}
            {currentPage < totalPages - half && (
              <span className="leading-10">...</span>
            )}
            {getLink(totalPages)}
          </>
        )}

        {totalPages > 1 && (
          <Link
            href={createPageURL(
              currentPage < totalPages ? currentPage + 1 : totalPages,
            )}
            className="py-1 px-2 rounded hover:bg-slate-100"
          >
            <ChevronRight />
          </Link>
        )}
      </div>
      {/* shadcn/ui pagination - temporary commented out*/}
      {/* <Pagination>
        <PaginationContent>
          {totalPages > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={createPageURL(currentPage > 1 ? currentPage - 1 : 1)}
                isActive={currentPage > 1}
              />
            </PaginationItem>
          )}

          {totalPages <= MAX_VISIBLE_PAGES + 2 ? (
            Array(totalPages)
              .fill(0)
              .map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href={createPageURL(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
          ) : (
            <>
              <PaginationItem>
                <PaginationLink href={createPageURL(1)}>1</PaginationLink>
              </PaginationItem>

              {currentPage > 1 + half && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {Array(MAX_VISIBLE_PAGES)
                .fill(0)
                .map((_, index) => {
                  const p = currentPage - half + index + 1;
                  return p > 1 && p < totalPages ? (
                    <PaginationItem key={index}>
                      <PaginationLink href={createPageURL(p)}>
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ) : (
                    ""
                  );
                })}

              {currentPage < totalPages - half && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink href={createPageURL(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {totalPages > 1 && (
            <PaginationItem>
              <PaginationNext
                href={createPageURL(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )}
                isActive={currentPage < totalPages}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination> */}
    </>
  );
}
