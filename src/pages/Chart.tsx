import React, { useEffect, useState } from 'react';
import { getData } from 'api/chartData';
import { ChartDataType } from 'types';

const Chart: React.FC = () => {
  const [regionData, setRegionData] = useState<ChartDataType[]>(() => []);
  console.log(regionData);

  useEffect(() => {
    const getRegionData = async () => {
      const res = await getData();
      setRegionData(res);
    };

    getRegionData();
  }, []);

  return (
    <>
      <div>음</div>
    </>
  );
};

export default Chart;
