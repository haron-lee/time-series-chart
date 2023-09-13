import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { getData } from 'api/chartData';
import { ChartDataType } from 'types';
import styled from 'styled-components';
import { roundMulti } from 'utils/roundMulti';
import Button from 'components/Button';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

const MixedChart: React.FC = () => {
  const [regionData, setRegionData] = useState<ChartDataType[]>([]);
  const [highlightedRegion, setHighlightedRegion] = useState<string | null>(null);
  const allRegions = regionData.map((item) => item.data.id);
  const regions = Array.from(new Set(regionData.map((item) => item.data.id)));
  const labels = regionData.map((item) => item.date);
  const areaData = regionData.map((item) => item.data.value_area);
  const barData = regionData.map((item) => item.data.value_bar);
  const barColor = { default: '#00415B', focused: '#00CCB9', hover: '#76E6DE' };
  const barColorData = regionData.map((item) => {
    if (item.data.id === highlightedRegion) return barColor.focused;
    else return barColor.default;
  });

  useEffect(() => {
    const getRegionData = async () => {
      const res = await getData();
      const dataArr = Object.entries(res).map(([date, data]) => ({ date, data }));
      setRegionData(dataArr);
    };

    getRegionData();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Area 그래프',
        backgroundColor: '#FF5200',
        borderColor: '#FF5200',
        borderWidth: 2,
        data: areaData,
        yAxisID: 'rightYAxis',
      },
      {
        type: 'bar' as const,
        label: 'Bar 그래프',
        backgroundColor: barColorData,
        borderColor: barColor.default,
        hoverBackgroundColor: barColor.hover,
        borderWidth: 1,
        data: barData,
        yAxisID: 'leftYAxis',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          afterTitle: (context: any) => {
            return allRegions[context[0].dataIndex];
          },
        },
      },
    },
    onClick: (e: any) => {
      setHighlightedRegion(e?.chart?.tooltip?.title[1]);
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
        border: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      leftYAxis: {
        type: 'linear' as const,
        position: 'left' as const,
        grid: {
          drawOnChartArea: false,
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
        border: {
          display: false,
        },
      },
      rightYAxis: {
        type: 'linear' as const,
        position: 'right' as const,
        max: roundMulti(areaData, 100),
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
        border: {
          display: false,
        },
      },
    },
  };

  const handleButtonClick = (regionId: string) => {
    setHighlightedRegion(regionId);
  };

  const clearHighlighting = () => {
    setHighlightedRegion(null);
  };

  return (
    <>
      <ButtonWrapper>
        {regions.map((region) => (
          <Button
            key={region}
            onClick={() => handleButtonClick(region)}
            $activeBtn={highlightedRegion === region}
          >
            {region}
          </Button>
        ))}
        <Button onClick={clearHighlighting} $solo>
          Clear
        </Button>
      </ButtonWrapper>
      <ChartWrapper>
        <Chart type='bar' data={data} options={options} />
      </ChartWrapper>
    </>
  );
};

const ChartWrapper = styled.div`
  padding: 50px;
  max-width: 2000px;
  max-height: 1000px;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  width: 100vw;
  max-width: 2000px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 50px 60px 0;
  margin: auto;
`;

export default MixedChart;
