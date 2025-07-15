import { formatLargeNumber } from '@/utils/utils';
import { Card } from './card';

interface MetricCardProps {
	title: string;
	value: number;
	unit?: string;
}

export default function MetricCard({ title, value, unit }: MetricCardProps) {
	return (
		<Card className="flex flex-col gap-2 px-4 py-2 w-96 md:gap-4 md:w-72 lg:w-56">
			<h3>{title}</h3>
			<p className="text-3xl font-bold text-primary">
				{formatLargeNumber(value)}
				<span className="text-sm font-medium text-foreground"> {unit}</span>
			</p>
		</Card>
	);
}
