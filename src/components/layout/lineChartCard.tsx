import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface LineChartCardProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  data: any[];
  key1: string;
  key2: string;
}

export default function LineChartCard({ data, key1, key2 }: LineChartCardProps) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={key1} tick={{ fontSize: 12 }} tickLine={{ stroke: 'var(--color-border)' }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              padding: '5px 10px',
            }}
          />
          <Legend />
          <Line type="monotone" dataKey={key2} stroke="var(--color-primary)" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
