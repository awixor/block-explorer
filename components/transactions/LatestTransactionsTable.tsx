/* eslint-disable react-hooks/incompatible-library */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTES } from "@/config/routes";
import { formatHash } from "@/lib/formatters";
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { formatEther, Transaction } from "viem";
import { AddressLink } from "../ui/address-link";

export const LatestTransactionsTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: "hash",
        header: "Hash",
        cell: ({ row }) => (
          <Link href={ROUTES.TRANSACTION_DETAIL(row.original.hash)}>
            {formatHash(row.original.hash)}
          </Link>
        ),
      },
      {
        accessorKey: "from",
        header: "From",
        cell: ({ row }) => <AddressLink address={row.original.from} truncate />,
      },
      {
        accessorKey: "to",
        header: "To",
        cell: ({ row }) => <AddressLink address={row.original.to} truncate />,
      },
      {
        accessorKey: "value",
        header: "Amount",
        cell: ({ row }) => `${formatEther(row.original.value).slice(0, 6)} ETH`,
      },
    ],
    []
  );

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-bold text-foreground">Latest Transactions</h2>
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
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
