import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
function ChartView({proteinVal,fatVal,carbVal}) {
  
 
  const data = [
    { label: "Protien", value: proteinVal, color: "#fd79a8" },
    { label: "Fat", value: fatVal, color: "#00C49F" },
    { label: "Carb", value: carbVal, color: "#FFBB28" },
  ];

  const sizing = {
    margin: { right: 5 },
    width: 350,
    height: 350,
    legend: { hidden: true },
  };
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value;
    return ` ${params.label} ${percent}%`;
  };
  return (
    <PieChart 
      series={[
        {
          outerRadius: 100,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}

export default ChartView;
