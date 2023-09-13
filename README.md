# 지역 데이터 시계열 차트

- 시계열 차트 만들기
  - JSON 데이터의 key값을 기반으로 시계열 차트 만들기
- 차트 hover 기능
- 차트 filtering 기능
  - 차트안의 특정 지역을 클릭시 해당 지역 데이터 값만 highlighting
  - 데이터 id의 지역들의 버튼을 만들어 해당 지역 버튼 클릭시 해당하는 지역의 차트 bar가 highlighting

## 🔗 배포 링크

https://region-chart.vercel.app/

<br>

<img width="2218" alt="image" src="https://github.com/FRONTENDSCHOOL5/final-15-Tripillow/assets/88657261/ed9803c3-c7bc-4409-9cf9-879001958070">

<br>

## 🛠️ 배포 구현

Glitch를 사용하여 db.json을 임의 서버로 구축하여 Glitch live site를 환경변수에 저장 후 Vercel로 배포

<br>

## 🚀 기능 구현

### 1. 시계열 차트 만들기

- db.json의 지역데이터를 json-server 혹은 Glitch의 서버를 이용하여 Axios를 활용하여 비동기 통신 구현
- Chart.js와 react-chartjs-2를 활용하여 불러온 데이터를 Line과 Bar 차트로 복합 그래프를 구현

```tsx
// chart data
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

// chart component
<Chart type='bar' data={data} options={options} />;
```

<br>

### 2. y축의 수치 표현

- y축 좌측은 Bar데이터, 우측은 Area데이터로 수치를 보기 편하게 배치
- 우측 Area데이터의 수치가 100으로 그래프의 폭이 크기 때문에 area Data 값을 올림 및 곱하기를 해주어 area Data의 두배치를 y축에 표시

<br>

```tsx
const options = {
  scales: {
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
```

### 3. 호버기능 구현

- tooltip의 callbacks의 afterTitle(title 뒤에 오게)옵션에 해당하는 지역 값의 데이터를 넣어줌으로 호버시에 tooltip에 지역값이 제공

```tsx
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
};
```

<br>

### 4. 필터링 기능 구현

- highlightingRegion `useState` 값으로 클릭되는 바 그래프의 tooltip 지역값을 넣어거나, 지역 버튼을 클릭시 지역값과 일치하는 데이터를 필터링하여 해당 지역들을 하이라이팅
-

```tsx
const [regionData, setRegionData] = useState<ChartDataType[]>([]);
const [highlightedRegion, setHighlightedRegion] = useState<string | null>(null);
const barColor = { default: '#00415B', focused: '#00CCB9', hover: '#76E6DE' };
const barColorData = regionData.map((item) => {
  if (item.data.id === highlightedRegion) return barColor.focused;
  else return barColor.default;
});

const options = {
  // options로 바 그래프가 클릭 되었을 경우 tooltip의 1번째 index의 title을 setState에 저장
  onClick: (e: any) => {
    setHighlightedRegion(e?.chart?.tooltip?.title[1]);
  },
};

const handleButtonClick = (regionId: string) => {
  setHighlightedRegion(regionId);
};

return (
  <>
    <ButtonWrapper>
      {regions.map((region) => (
        <Button
          key={region}
          // button 클릭시 button의 region값을 setState에 저장
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
```

<br>

## ⚙️ 실행 방법

```
npm install
npm run start
```

<br>

## 📂 폴더 구조

```
project-root/
│
├── public/
│ └── index.html
│
├── src/
│ ├── api/
│ ├── components/
│ ├── pages/
│ ├── router/
│ ├── utils/
│ ├── App.tsx
│ ├── GlobalStyle.ts
│ ├── types.ts
│ └── index.tsx
│
├── .env
├── .eslintrc
├── .gitignore
├── .lintstagedrc
├── .prettierrc.js
├── package.json
├── tsconfig.json
└── README.md


```

<br>

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/Typescript-blue?style=square"/> <img src="https://img.shields.io/badge/React-61DAFB?style=square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/chartjs-FF6384?style=square&logo=chartdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/vercel-000000?style=square&logo=vercel&logoColor=white"/> <img src="https://img.shields.io/badge/glitch-3333ff?style=square&logo=glitch&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=square&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/git-F05032?style=square&logo=git&logoColor=white">
