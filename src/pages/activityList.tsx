import { columns } from '@/components/layout/activityTable/columns';
import { ActivityDataTable } from '@/components/layout/activityTable/dataTable';
import { useActivitiesStore } from '@/stores/activitiesStore';

export default function ActivityList() {
  const { activities } = useActivitiesStore();

  return (
    <div className="container mx-auto py-10">
      <ActivityDataTable columns={columns} data={activities} />
    </div>
  );
}
