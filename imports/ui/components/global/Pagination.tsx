import React from "react";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  selectPage: (page: number) => void;
};

export const Pagination = ({ currentPage, totalPages, selectPage }: PaginationProps) => {
  return (
    <ul className="flex gap-4 justify-end">
      {[...new Array(totalPages)].map((_, index) => (
        <li
          key={index}
          className={`${
            currentPage === index + 1 ? "bg-slate-300" : "bg-white"
          } w-8 h-8 rounded-full flex items-center justify-center`}
          onClick={() => selectPage(index + 1)}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );
};
