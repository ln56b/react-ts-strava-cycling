import { getColumns } from '@/components/layout/gearTable/columns';
import { GearDataTable } from '@/components/layout/gearTable/dataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Gear } from '@/interfaces/strava';
import { useGearsStore } from '@/stores/gearsStore';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { z } from 'zod';

const notifyThresholdSchema = z.object({
  notifyThreshold: z.number().min(0).max(100000),
});

export default function GearList() {
  const { gears, updateOneGear, deleteOneGear } = useGearsStore();
  const [openEditThresholdDialog, setOpenEditThresholdDialog] = useState(false);
  const [openToggleNotificationsDialog, setOpenToggleNotificationsDialog] = useState(false);
  const [openDeleteGearDialog, setOpenDeleteGearDialog] = useState(false);
  const [selectedGear, setSelectedGear] = useState<Gear | null>(null);

  const form = useForm({
    defaultValues: {
      notifyThreshold: selectedGear?.notifyThreshold ?? 0,
    },
    onSubmit: ({ value }) => {
      if (!selectedGear) return;
      setOpenEditThresholdDialog(false);
      updateOneGear({ uuid: selectedGear.uuid, notifyThreshold: value.notifyThreshold });
    },
    validators: {
      onChange: notifyThresholdSchema,
    },
  });

  const handleOpenEditThresholdDialog = (gear: Gear) => {
    setSelectedGear(gear);
    setOpenEditThresholdDialog(true);
  };

  const handleOpenToggleNotificationsDialog = (gear: Gear) => {
    setSelectedGear(gear);
    setOpenToggleNotificationsDialog(true);
  };

  const handleOpenDeleteNotificationsDialog = (gear: Gear) => {
    setSelectedGear(gear);
    setOpenDeleteGearDialog(true);
  };

  const toggleNotifications = (gearId: string, showNotifications: boolean) => {
    setOpenToggleNotificationsDialog(false);
    updateOneGear({ uuid: gearId, showNotifications });
  };

  return (
    <div className="lg:px-3 flex flex-col gap-10">
      <h2 className="text-3xl font-bold text-center my-2">Gear List</h2>

      <GearDataTable
        columns={getColumns(
          handleOpenEditThresholdDialog,
          handleOpenToggleNotificationsDialog,
          handleOpenDeleteNotificationsDialog,
        )}
        data={gears.filter(gear => gear.type === 'bike')}
        title="Bikes"
      />

      <GearDataTable
        columns={getColumns(
          handleOpenEditThresholdDialog,
          handleOpenToggleNotificationsDialog,
          handleOpenDeleteNotificationsDialog,
        )}
        data={gears.filter(gear => gear.type === 'shoe')}
        title="Shoes"
      />

      <Dialog open={openEditThresholdDialog} onOpenChange={setOpenEditThresholdDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              {selectedGear?.brand} {selectedGear?.model}
            </DialogTitle>
          </DialogHeader>
          {selectedGear && (
            <div className="flex flex-col gap-4">
              <fieldset>
                <form.Field name="notifyThreshold">
                  {field => (
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      type="number"
                      placeholder="Notification threashold"
                      onChange={e => field.handleChange(Number(e.target.value))}
                      min={0}
                      max={100000}
                    />
                  )}
                </form.Field>
              </fieldset>

              <Button onClick={form.handleSubmit}>Submit</Button>
            </div>
          )}
          <DialogDescription>
            Set the distance (in km) at which you want to receive notifications. You will be notified whenever the
            distance exceeds this threshold.
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={openToggleNotificationsDialog} onOpenChange={setOpenToggleNotificationsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              {selectedGear?.brand} {selectedGear?.model}
            </DialogTitle>
          </DialogHeader>
          {selectedGear && (
            <div className="flex flex-col gap-4 items-center">
              <p>Do you want to {selectedGear.showNotifications ? 'disable' : 'enable'} notifications?</p>

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setOpenToggleNotificationsDialog(false);
                  }}
                  variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    toggleNotifications(selectedGear.uuid, !selectedGear.showNotifications);
                  }}>
                  Confirm
                </Button>
              </div>
            </div>
          )}
          <DialogDescription>
            {selectedGear?.showNotifications
              ? 'You will not be notified anymore for this gear.'
              : 'You will be notified whenever the distance exceeds the threshold.'}
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteGearDialog} onOpenChange={setOpenDeleteGearDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              {selectedGear?.brand} {selectedGear?.model}
            </DialogTitle>
          </DialogHeader>
          {selectedGear && (
            <div className="flex flex-col gap-4 items-center">
              <p>Do you want to delete this gear ?</p>

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setOpenDeleteGearDialog(false);
                  }}
                  variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    deleteOneGear(selectedGear.uuid);
                    setOpenDeleteGearDialog(false);
                  }}>
                  Confirm
                </Button>
              </div>
            </div>
          )}
          <DialogDescription>Make sure you have also deleted this gear from Strava.</DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
