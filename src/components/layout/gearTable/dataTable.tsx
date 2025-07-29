import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useMediaQuery } from '@react-hook/media-query';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { GearTableFields } from './columns';

interface GearDataTableProps {
  columns: ColumnDef<GearTableFields, unknown>[];
  data: GearTableFields[];
  title: string;
}

export function GearDataTable({ columns, data, title }: GearDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const mobile = useMediaQuery('(max-width: 640px)');
  const tablet = useMediaQuery('(max-width: 768px)');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      columnVisibility,
    },
  });

  useEffect(() => {
    if (mobile) {
      setColumnVisibility({
        brand: false,
        model: false,
        distance: false,
      });
    } else if (tablet) {
      setColumnVisibility({
        brand: false,
        model: false,
      });
    } else {
      setColumnVisibility({});
    }
  }, [mobile, tablet]);

  return (
    <>
      <h1 className="text-xl font-semibold text-center">{title}</h1>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
