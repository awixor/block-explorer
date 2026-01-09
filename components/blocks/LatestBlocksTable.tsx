"use client";

import { useEffect, useState, useMemo } from "react";
import { publicClient } from "@/config/viem";
import { Block } from "viem";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SortIcon } from "../Icons/sort-icon";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  formatBlockNumber,
  formatGasCompact,
  formatGasPercentage,
  formatTimestamp,
} from "@/lib/formatters";
import { sortingFn } from "@/lib/tableUtils";

type BlockTableData = Block;

export const LatestBlocksTable = ({ blocks }: { blocks: Block[] }) => {
  const [latestBlocks, setLatestBlocks] = useState<Block[]>(blocks);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "number", desc: true },
  ]);

  useEffect(() => {
    const unwatch = publicClient.watchBlocks({
      onBlock: (block) => {
        setLatestBlocks((prev) => [block, ...prev].slice(0, 10));
      },
      includeTransactions: true,
    });

    return () => unwatch();
  }, []);

  const columns = useMemo<ColumnDef<BlockTableData>[]>(
    () => [
      {
        accessorKey: "number",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="w-full justify-start pl-0!"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Block
              <SortIcon sort={column.getIsSorted()} />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="font-medium">
              {formatBlockNumber(row.original.number)}
            </div>
          );
        },
        sortingFn: (rowA, rowB) =>
          sortingFn(rowA.original.number, rowB.original.number),
      },

      {
        accessorKey: "timestamp",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Timestamp
              <SortIcon sort={column.getIsSorted()} />
            </Button>
          );
        },
        cell: ({ row }) => formatTimestamp(row.original.timestamp),
        sortingFn: (rowA, rowB) =>
          sortingFn(rowA.original.timestamp, rowB.original.timestamp),
      },
      {
        accessorKey: "transactions",
        header: "Transactions",
        cell: ({ row }) => {
          return (
            <div className="text-sm text-center">
              {row.original.transactions.length} Txns
            </div>
          );
        },
      },
      {
        accessorKey: "gasUsed",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="w-full justify-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Gas Used
              <SortIcon sort={column.getIsSorted()} />
            </Button>
          );
        },
        cell: ({ row }) => {
          const gasUsed = row.original.gasUsed;
          const gasLimit = row.original.gasLimit;

          return (
            <div className="font-mono text-sm text-center">
              {formatGasCompact(gasUsed)} /{" "}
              {formatGasPercentage(gasUsed, gasLimit)}
            </div>
          );
        },
        sortingFn: (rowA, rowB) =>
          sortingFn(rowA.original.gasUsed, rowB.original.gasUsed),
      },
    ],
    []
  );

  const table = useReactTable({
    data: latestBlocks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No blocks found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
