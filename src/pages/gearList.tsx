import { columns } from '@/components/layout/gearTable/columns';
import { GearDataTable } from '@/components/layout/gearTable/dataTable';
import { useGearsStore } from '@/stores/gearsStore';

export default function GearList() {
  const { gears } = useGearsStore();
  return (
    <div className="container mx-auto py-10">
      <GearDataTable columns={columns} data={gears} />
    </div>
  );
}
