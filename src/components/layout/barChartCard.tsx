import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartCardProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  data: any[];
  key1: string;
  key2: string;
}

export default function BarChartCard({ data, key1, key2 }: BarChartCardProps) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart width={730} height={250} data={data}>
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
          <Bar dataKey={key2} fill="var(--color-primary)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
