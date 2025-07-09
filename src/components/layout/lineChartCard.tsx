import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LineChartCardProps {
  title: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  data: any[];
  key1: string;
  key2: string;
}

export default function LineChartCard({
  title,
  data,
  key1,
  key2,
}: LineChartCardProps) {
  return (
    <div className="col-span-12 lg:col-span-6">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={key1} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={key2}
            stroke="var(--color-primary)"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
