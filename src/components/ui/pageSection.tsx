interface PageSectionProps {
	children: React.ReactNode;
	title: string;
}
export default function PageSection({ children, title }: PageSectionProps) {
	return (
		<div className="flex flex-col gap-4 justify-center items-center mb-10">
			<h2 className="text-xl font-semibold">{title}</h2>
			{children}
		</div>
	);
}
