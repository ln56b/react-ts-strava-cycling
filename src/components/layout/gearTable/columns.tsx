import { Button } from '@/components/ui/button';
import { Gear } from '@/interfaces/strava';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export interface GearTableFields extends Gear, Pick<Gear, 'name' | 'distance' | 'brand' | 'model'> {}

export const columns: ColumnDef<GearTableFields>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'distance',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Distance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{Number((row.original.distance / 1000).toFixed(2))} km</div>;
    },
  },
  {
    accessorKey: 'brand',
  },
  {
    accessorKey: 'model',
  },
];
