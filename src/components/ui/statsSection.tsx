import { DateType } from '@/interfaces/project';
import Selector from '../layout/selector';

interface StatsSectionProps {
	children: React.ReactNode;
	dateType: DateType;
	firstYear: string | undefined;
	setSelectedDate: (date: string) => void;
	options: string[];
	title: string;
	selectedDate: string;
}
export default function StatsSection({
	children,
	dateType,
	firstYear,
	selectedDate,
	setSelectedDate,
	options,
	title,
}: StatsSectionProps) {
	return (
		<>
			<div className="flex flex-col gap-4 justify-center items-center mb-10">
				<h2 className="text-xl font-semibold">{title}</h2>
				<Selector
					disabled={!firstYear}
					value={selectedDate}
					onHandleChange={setSelectedDate}
					dateType={dateType}
					options={options}
				/>
			</div>
			<div className="grid grid-cols-12 col-span-12 gap-4 items-center mb-10">
				{children}
			</div>
		</>
	);
}
