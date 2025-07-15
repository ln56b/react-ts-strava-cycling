import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

interface BarChartCardProps {
	title: string;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	data: any[];
	key1: string;
	key2: string;
}

export default function BarChartCard({
	title,
	data,
	key1,
	key2,
}: BarChartCardProps) {
	return (
		<div className="col-span-12 lg:col-span-6">
			<h3>{title}</h3>
			<ResponsiveContainer width="100%" height={200}>
				<BarChart width={730} height={250} data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey={key1} />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey={key2} fill="var(--color-primary)" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
