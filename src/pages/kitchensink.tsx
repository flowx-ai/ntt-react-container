import React from 'react';
import { PageTemplate } from '../components/PageTemplate/PageTemplate';
import { Card } from '../components/Card/Card';
import { PrimeChart } from '../components/Chart/PrimeChart';
import { FlxButton } from '@flowx/react-ui-toolkit';
import './kitchensink.scss';

const KitchenSinkPage: React.FC = () => {
  // Line Chart Example Data
  const lineChartData = {
    data: {
      type: 'line' as const,
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Sales 2024',
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Monthly Sales'
          }
        }
      },
      height: '300px'
    }
  };

  // Bar Chart Example Data
  const barChartData = {
    data: {
      type: 'bar' as const,
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
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Quarterly Comparison'
          }
        }
      },
      height: '300px'
    }
  };

  // Pie Chart Example Data
  const pieChartData = {
    data: {
      type: 'pie' as const,
      chartData: {
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
        datasets: [
          {
            data: [300, 150, 100, 80],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom' as const,
          }
        }
      },
      height: '300px'
    }
  };

  // Doughnut Chart Example Data
  const doughnutChartData = {
    data: {
      type: 'doughnut' as const,
      chartData: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [
          {
            data: [450, 320, 180],
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
            hoverBackgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right' as const,
          },
          title: {
            display: true,
            text: 'Device Usage'
          }
        }
      },
      height: '300px'
    }
  };

  return (
    <PageTemplate>
      <div className="kitchen-sink-page">
        <div className="page-header">
          <h1>Kitchen Sink - Component Examples</h1>
          <p>A collection of all available components and their variations</p>
        </div>

        <div className="components-grid">
        <Card
          title="Line Chart"
          description="Display trends over time with a line chart"
        >
          <PrimeChart data={lineChartData} />
        </Card>

        <Card
          title="Bar Chart"
          description="Compare data across categories with a bar chart"
        >
          <PrimeChart data={barChartData} />
        </Card>

        <Card
          title="Pie Chart"
          description="Show proportions with a pie chart"
        >
          <PrimeChart data={pieChartData} />
        </Card>

        <Card
          title="Doughnut Chart"
          description="Similar to pie chart but with a hole in the center"
        >
          <PrimeChart data={doughnutChartData} />
        </Card>

        <Card
          title="Buttons"
          description="Various button styles and states"
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <FlxButton>Default Button</FlxButton>
            <FlxButton disabled>Disabled Button</FlxButton>
          </div>
        </Card>

        <Card
          title="Form Elements"
          description="Input fields and form controls"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Text Input
              </label>
              <input
                type="text"
                placeholder="Enter text here..."
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Select Dropdown
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" />
                <span>Checkbox Option</span>
              </label>
            </div>
          </div>
        </Card>

        <Card
          title="Typography"
          description="Text styles and formatting"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h1 style={{ margin: 0 }}>Heading 1</h1>
            <h2 style={{ margin: 0 }}>Heading 2</h2>
            <h3 style={{ margin: 0 }}>Heading 3</h3>
            <p style={{ margin: 0 }}>Regular paragraph text with normal styling.</p>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
              Small muted text for secondary information.
            </p>
          </div>
        </Card>

        <Card
          title="Lists"
          description="Ordered and unordered lists"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <h4>Unordered List</h4>
              <ul>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </ul>
            </div>
            <div>
              <h4>Ordered List</h4>
              <ol>
                <li>First step</li>
                <li>Second step</li>
                <li>Third step</li>
              </ol>
            </div>
          </div>
        </Card>
        </div>
      </div>
    </PageTemplate>
  );
};

export default KitchenSinkPage;
