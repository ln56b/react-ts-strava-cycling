import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Gear } from '@/interfaces/strava';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export interface GearTableFields
  extends Gear,
    Pick<Gear, 'name' | 'distance' | 'brand' | 'model' | 'notifyThreshold' | 'showNotifications'> {}

export const getColumns = (
  openEditThresholdDialog: (gear: GearTableFields) => void,
  openToggleNotificationsDialog: (gear: GearTableFields) => void,
  openDeleteNotificationsDialog: (gear: GearTableFields) => void,
): ColumnDef<GearTableFields>[] => [
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
  {
    accessorKey: 'notifyThreshold',
    header: 'Threshold',
    cell: ({ row }) => {
      return <div>{row.original.notifyThreshold ? row.original.notifyThreshold : 'None'}</div>;
    },
  },
  {
    accessorKey: 'ShowNotifications',
    header: 'Notifications',
    cell: ({ row }) => {
      return <div>{row.original.showNotifications ? 'Yes' : 'No'}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openEditThresholdDialog(row.original)}>
              {' '}
              <i className="fa-solid fa-flag"></i>Threshold
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openToggleNotificationsDialog(row.original)}>
              <i className="fa-solid fa-bell"></i>Notifications
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openDeleteNotificationsDialog(row.original)}>
              <i className="fa-solid fa-trash"></i>Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
