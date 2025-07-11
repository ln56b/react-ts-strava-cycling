import { DateType } from '@/interfaces/project';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import {
	firstDayOfYear,
	lastDayOfYear,
	lastFourWeeksDay,
	oneYearAgoDay,
} from '@/utils/utils';
import { useActivitiesStore } from '@/stores/activitiesStore';

interface SelectorProps {
	dateType: DateType;
	options: string[];
	value: string;
	onHandleChange: (value: string) => void;
}

export default function Selector({
	dateType,
	options,
	value,
	onHandleChange,
}: SelectorProps) {
	const handleChange = (value: string) => {
		let from = '';
		let to = '';
		switch (dateType) {
			case 'pastFourWeeks':
				from = lastFourWeeksDay();
				to = new Date().toISOString();
				break;
			case 'pastYear':
				from = oneYearAgoDay();
				to = new Date().toISOString();
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
				dates: {
					from,
					to,
				},
			},
		});
		onHandleChange(value);
	};

	return (
		<Select value={value} onValueChange={handleChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder={`Select a ${dateType}`} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{options.map((option, index) => (
						<SelectItem key={index} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
