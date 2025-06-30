import { Card } from '../ui/card';

interface MetricCardProps {
	title: string;
	value: string;
	className?: string;
}

export default function MetricCard({
	title,
	value,
	className,
}: MetricCardProps) {
	return (
		<Card
			className={`${className} px-4 py-2 flex flex-col gap-2 md:gap-4 w-96 md:w-72 lg:w-56`}
		>
			<h3>{title}</h3>
			<p className="text-2xl font-bold">{value}</p>
		</Card>
	);
}
