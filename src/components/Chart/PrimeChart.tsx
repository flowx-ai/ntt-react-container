import React from 'react';
import { Chart } from 'primereact/chart';
import { ChartOptions, ChartData } from 'chart.js';

export interface PrimeChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea' | 'bubble' | 'scatter';
  chartData: ChartData;
  options?: ChartOptions;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
  plugins?: any[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PrimeChart = ({ data }: Record<string, any>) => {
// export const PrimeChart = ( data : any) => {

  // Extract chart configuration from data.data
  const config: PrimeChartConfig | undefined = data?.data?.ChartData;

  // console.log("HELP!!")
  console.log(data)

  if (!config) {
    return null;
  }

  const {
    type,
    chartData,
    options,
    width,
    height,
    style,
    className,
    plugins
  } = config;

  return (
    <Chart
      type={type}
      data={chartData}
      options={options}
      width={width}
      height={height}
      style={style}
      className={className}
      plugins={plugins}
    />
  );
};
