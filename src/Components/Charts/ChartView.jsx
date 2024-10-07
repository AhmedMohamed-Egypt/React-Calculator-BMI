import * as React from 'react';
import { UseBodyContext } from "../../Context/BodyContext";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Calcs } from "../../Hooks/Calcs.jsx";

function ChartView() {
    const { data:dataItems } = UseBodyContext();
const { totalPortionPercentage} = Calcs(dataItems);
const {percentProtien,percentFat,percentCarbs} = totalPortionPercentage
console.log(totalPortionPercentage)
const data = [
  { label: 'Protien', value: percentProtien, color: '#0088FE' },
  { label: 'Fat', value:percentFat, color: '#00C49F' },
  { label: 'Carb', value: percentCarbs, color: '#FFBB28' },
];

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value ;
  return `${(percent)}%`;
};
    return (
        <PieChart
        series={[
          {
            outerRadius: 80,
            data,
            arcLabel: getArcLabel,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontSize: 14,
          },
        }}
        {...sizing}
      />
    )
}

export default ChartView
