interface ChartSkeletonProps {
	title: string;
}

export default function ChartSkeleton({ title }: ChartSkeletonProps) {
	return (
		<div className="col-span-12 lg:col-span-6">
			<h3 className="mb-4">{title}</h3>
			<div className="relative w-full h-[400px] bg-gray-50 dark:bg-gray-800 rounded">
				{/* Y-axis (vertical line) */}
				<div className="absolute left-5 top-4 bottom-5 w-px bg-gray-300 dark:bg-gray-600"></div>

				{/* X-axis (horizontal line) */}
				<div className="absolute left-5 bottom-5 right-4 h-px  bg-gray-300 dark:bg-gray-600"></div>

				{/* Centered spinner */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
				</div>
			</div>
		</div>
	);
}
