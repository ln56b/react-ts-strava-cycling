import { columns } from '@/components/layout/activityTable/columns';
import { ActivityDataTable } from '@/components/layout/activityTable/dataTable';
import { useActivitiesStore } from '@/stores/activitiesStore';

export default function ActivityList() {
  const { activities } = useActivitiesStore();

  return (
    <div className="lg:px-3">
      <h2 className="text-3xl font-bold text-center my-2">Activity List</h2>
      <ActivityDataTable columns={columns} data={activities} />
    </div>
  );
}
