import * as React from 'react';
import CustomLineChart from '../components/line-chart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 4200, 3100, 2900, 3300, 4100];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 5200, 4100, 3900, 4500, 5100];
const xLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const totalRevenue = pData.map((value, index) => value + uData[index]);

export default function SimpleLineChart() {
  return (
    <>
      <CustomLineChart
        series={[
          { data: totalRevenue, label: 'Total' },
          { data: pData, label: 'Vietcombank' },
          { data: uData, label: 'Agribank' }
        ]}
        xLabels={xLabels}
      />
    </>
  );
}