import { Card } from '../ui/card';

interface MetricCardSkeletonProps {
	title: string;
}

export default function MetricCardSkeleton({ title }: MetricCardSkeletonProps) {
	return (
		<Card className="px-4 py-2 flex flex-col gap-2 md:gap-4 w-96 md:w-72 lg:w-56 col-span-12 md:col-span-6 lg:col-span-3">
			<div role="status" className="max-w-sm">
				<h3>{title}</h3>
				<div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mt-4 pl-2 animate-pulse"></div>
			</div>
		</Card>
	);
}
