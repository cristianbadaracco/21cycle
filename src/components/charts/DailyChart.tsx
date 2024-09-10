import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface Data {
  name: string
  value: number
  color: string
}

interface DailyChartProps {
  data: Data[]
}

const DailyChart: React.FC<DailyChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 350, marginTop: 30 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie cx="50%" cy="50%" data={data} dataKey="value" isAnimationActive label>
            {Array.isArray(data) && data?.map((entry, index) => <Cell key={`cell-${index}`} fill={entry?.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DailyChart
