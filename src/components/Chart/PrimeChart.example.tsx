import React from 'react';
import { PrimeChart, PrimeChartConfig } from './PrimeChart';

const PrimeChartExample: React.FC = () => {
  // Example 1: Line Chart
  const lineChartConfig: PrimeChartConfig = {
    type: 'line',
    chartData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Sales',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        },
        {
          label: 'Revenue',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Monthly Sales Data'
        }
      }
    },
    height: '400px'
  };

  // Example 2: Bar Chart
  const barChartConfig: PrimeChartConfig = {
    type: 'bar',
    chartData: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: '2023',
          backgroundColor: '#42A5F5',
          data: [50, 75, 100, 125]
        },
        {
          label: '2024',
          backgroundColor: '#FFA726',
          data: [60, 85, 110, 140]
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Quarterly Comparison'
        }
      }
    }
  };

  // Example 3: Pie Chart
  const pieChartConfig: PrimeChartConfig = {
    type: 'pie',
    chartData: {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        }
      }
    },
    width: '400px'
  };

  // Mock data objects following the contract (data.data pattern)
  const lineChartData = { data: lineChartConfig };
  const barChartData = { data: barChartConfig };
  const pieChartData = { data: pieChartConfig };

  return (
    <div style={{ padding: '20px' }}>
      <h2>PrimeChart Examples</h2>

      <div style={{ marginBottom: '40px' }}>
        <h3>Line Chart</h3>
        <PrimeChart data={lineChartData} />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Bar Chart</h3>
        <PrimeChart data={barChartData} />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Pie Chart</h3>
        <PrimeChart data={pieChartData} />
      </div>
    </div>
  );
};

export default PrimeChartExample;
