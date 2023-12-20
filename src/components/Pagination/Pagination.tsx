import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "../ui/button";

interface IProps {
  page: number;
  count: number;
  onChange: (val: number) => void;
}

const GROUP_MAX = 5;
const half = Math.ceil(GROUP_MAX / 2);

export default function Pagination(props: IProps) {
  const { page, count, onChange } = props;

  const getButton = (current: number) => (
    <Button
      key={current}
      variant={`${page === current ? "secondary" : "ghost"}`}
      onClick={() => onChange(current)}
    >
      {current}
    </Button>
  );

  return (
    <div className="mx-auto max-w-96 flex flex-row justify-center">
      {count > 1 && (
        <Button
          variant="ghost"
          disabled={page === 1}
          onClick={() => page > 1 && onChange(page - 1)}
        >
          <ChevronLeft />
        </Button>
      )}

      {count <= GROUP_MAX + 2 ? (
        Array(count)
          .fill(0)
          .map((_, index) => getButton(index + 1))
      ) : (
        <>
          {getButton(1)}
          {page > 1 + half && <span className="leading-10">...</span>}
          {Array(GROUP_MAX)
            .fill(0)
            .map((_, index) => {
              const p = page - half + index + 1;
              return p > 1 && p < count ? getButton(p) : "";
            })}
          {page < count - half && <span className="leading-10">...</span>}
          {getButton(count)}
        </>
      )}

      {count > 1 && (
        <Button
          variant="ghost"
          disabled={page === count}
          onClick={() => page < count && onChange(page + 1)}
        >
          <ChevronRight />
        </Button>
      )}
    </div>
  );
}
