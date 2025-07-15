interface StatsSectionProps {
	children: React.ReactNode;
}
export default function StatsSection({ children }: StatsSectionProps) {
	return (
		<div className="flex flex-wrap gap-4 justify-center mb-10 w-full">
			{children}
		</div>
	);
}
