"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { projects } from "./data/data";
import { Project } from "./types";

const columnHelper = createColumnHelper<Project>();

export const Projects = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => (
          <a
            href={info.row.original.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7C76C7] underline hover:text-[#fc3468]"
          >
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor("description", {
        header: "Description",
        size: 600,
      }),
      columnHelper.accessor("tags", {
        header: "Tags",
        cell: (info) => (
          <div className="flex flex-wrap gap-1">
            {info.getValue().map((tag) => (
              <span
                key={tag}
                className="rounded bg-[#7C76C7]/20 px-2 py-0.5 text-xs text-[#7C76C7]"
              >
                {tag}
              </span>
            ))}
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("lastUpdated", {
        header: "Last Updated",
        cell: (info) => info.getValue() || "N/A",
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: projects,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full border border-dashed border-[#2D2B40] p-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-b border-[#7C76C7]/30">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-[#7C76C7]/30">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="cursor-pointer p-3 text-left text-xs text-[#7C76C7] select-none hover:text-[#fc3468]"
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ width: header.getSize() }}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: " ↑",
                        desc: " ↓",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`hover:bg-[#7C76C7]/5 ${
                  index === table.getRowModel().rows.length - 1
                    ? "border-b border-[#7C76C7]/30"
                    : "border-b border-[#7C76C7]/20"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-3 text-xs text-[#E0DEF4]"
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.getRowModel().rows.length === 0 && (
        <div className="py-8 text-center text-xs text-[#E0DEF4]/50">
          No projects found
        </div>
      )}
    </div>
  );
};
