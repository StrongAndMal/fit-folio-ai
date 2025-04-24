import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

interface ProgressData {
  date: string;
  weight?: number;
  reps?: number;
  sets?: number;
  duration?: number;
  calories?: number;
}

interface ProgressGraphProps {
  data: ProgressData[];
  type: 'weight' | 'reps' | 'sets' | 'duration' | 'calories';
  title: string;
}

const ProgressGraph: React.FC<ProgressGraphProps> = ({ data, type, title }) => {
  // Format the data for the chart
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: item[type] || 0,
  }));

  // Determine the appropriate chart type based on the data
  const isContinuousData = type === 'weight' || type === 'duration' || type === 'calories';
  const ChartComponent = isContinuousData ? LineChart : BarChart;
  const DataComponent = isContinuousData ? Line : Bar;

  return (
    <div className="w-full h-[300px] p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem'
            }}
          />
          <Legend />
          <DataComponent
            type={isContinuousData ? "monotone" : "bar"}
            dataKey="value"
            stroke={isContinuousData ? "hsl(var(--primary))" : undefined}
            fill={!isContinuousData ? "hsl(var(--primary))" : undefined}
            name={title}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressGraph; 