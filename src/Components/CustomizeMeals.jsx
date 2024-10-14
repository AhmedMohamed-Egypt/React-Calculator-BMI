import { useEffect, useState } from "react";
import { Calcs } from "../Hooks/Calcs";
import { MenuItem } from "@mui/material";
import SelectBox from "../UI-Components/SelectBox";
function CustomizeMeals({ dataList }) {
  const storedItem = JSON.parse(localStorage.getItem("storedItem"));
  const { calcsData, totalCalories, totalPortions } = Calcs(storedItem);
  const { fats, protien, carbs, leanMass } = calcsData;
  const { totalFat, totalProtien, totalCarbs } = totalPortions;
  
  const [num, setNum] = useState("");
  

  return (
    <div>
      <h2 className="text-center">Customize your meals</h2>
      <p>Total Calories {totalCalories}</p>
      <SelectBox
        value={meals}
        title="How Many meals"
        label="How Many meals"
        onChange={(e) => {
          {
            setMeals(+e.target.value);
          }
        }}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </SelectBox>
    </div>
  );
}
export default CustomizeMeals;
