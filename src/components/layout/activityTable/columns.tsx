import { Button } from '@/components/ui/button';
import { Activity } from '@/interfaces/strava';
import { formatDateForSelector, formatTime } from '@/utils/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export interface ActivityTableFields
  extends Activity,
    Pick<Activity, 'name' | 'start_date' | 'sport_type' | 'distance' | 'elev_high' | 'moving_time'> {}

export const columns: ColumnDef<ActivityTableFields>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{formatDateForSelector(row.original.start_date)}</div>;
    },
  },
  {
    accessorKey: 'sport_type',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Sport
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    accessorKey: 'elev_high',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Elevation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.elev_high ? row.original.elev_high : 'None'} m</div>;
    },
  },
  {
    accessorKey: 'moving_time',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Moving Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{formatTime(row.original.moving_time)}</div>;
    },
  },
];
