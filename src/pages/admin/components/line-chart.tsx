import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';

interface LineChartProps {
  series: { data: number[]; label: string }[];
  xLabels: string[];
  title?: string;
}

const CustomLineChart: React.FC<LineChartProps> = ({
  series,
  xLabels,
  title = 'Chart',
}) => {
  const [chartSize, setChartSize] = useState({ width: 700, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth * 0.8;
      const height = window.innerHeight * 0.5;
      setChartSize({ width, height });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <LineChart
                width={chartSize.width}
                height={chartSize.height}
                series={series}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomLineChart;
