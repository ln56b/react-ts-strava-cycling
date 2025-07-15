import { DateType } from '@/interfaces/project';
import Selector from '../ui/selector';
import {
	ddMmYyyyToIsoString,
	firstDayOfYear,
	lastDayOfYear,
	lastFourWeeksMonday,
} from '@/utils/utils';
import { useActivitiesStore } from '@/stores/activitiesStore';
import { useState } from 'react';

interface DateFiltersProps {
	dateType: DateType;
	firstYear: string | undefined;
	options: string[];
}

export default function DateFilters({
	dateType,
	firstYear,
	options,
}: DateFiltersProps) {
	const [selectedDate, setSelectedDate] = useState<string>('');

	const handleChange = (value: string) => {
		let from = '';
		let to = '';
		switch (dateType) {
			case 'fullYear':
				from = ddMmYyyyToIsoString(value.split(' - ')[0]);
				to = ddMmYyyyToIsoString(value.split(' - ')[1]);
				break;
			case 'calendarYear':
				from = firstDayOfYear(value);
				to = lastDayOfYear(value);
				break;
			default:
		}

		useActivitiesStore.setState({
			filters: {
				...useActivitiesStore.getState().filters,
				[dateType]: {
					dates: {
						from,
						to,
					},
				},
			},
		});

		setSelectedDate(value);
	};

	return (
		<>
			{dateType === 'calendarYear' || dateType === 'fullYear' ? (
				<Selector
					disabled={!firstYear}
					value={selectedDate}
					onHandleChange={handleChange}
					options={options}
				/>
			) : (
				<div className="flex flex-col gap-4 justify-center items-center mb-10">
					{dateType === 'allTime' && <h3>{`From ${firstYear}`}</h3>}
					{dateType === 'pastFourWeeks' && (
						<h3>{`From ${lastFourWeeksMonday()}`}</h3>
					)}
				</div>
			)}
		</>
	);
}
