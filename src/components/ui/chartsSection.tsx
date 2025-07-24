import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import BarChartCard from '../layout/barChartCard';
import LineChartCard from '../layout/lineChartCard';

type ChartDatum = { [key: string]: string | number };

interface ChartsSectionProps {
  charts: {
    type: 'line' | 'bar';
    value: string;
    data: ChartDatum[];
    key1: string;
    key2: string;
  }[];
}
export default function ChartsSection({ charts }: ChartsSectionProps) {
  const [selectedChart, setSelectedChart] = useState<string>(charts[0].value);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Tabs defaultValue={selectedChart} onValueChange={setSelectedChart} className="items-center w-full">
        <TabsList>
          {charts.map(chart => {
            return (
              <TabsTrigger value={chart.value} key={chart.value}>
                {chart.value}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {charts.map(chart => {
          return (
            <TabsContent value={chart.value} key={chart.value} className="w-full">
              {chart.type === 'bar' ? (
                <BarChartCard data={chart.data} key1={chart.key1} key2={chart.key2} />
              ) : (
                <LineChartCard data={chart.data} key1={chart.key1} key2={chart.key2} />
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
