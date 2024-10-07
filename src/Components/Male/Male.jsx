import { UseBodyContext } from "../../Context/BodyContext";
import LeftAligned from "../../UI-Components/LeftAligned";
import { calcs } from "../../Hooks/Calcs";
function Male() {
  const { data } = UseBodyContext();
  const { calcsData, totalCalories} = calcs(data);
  const { fats, protien, carbs, leanMass } = calcsData;
  
  return (
    <LeftAligned
      leanmass={leanMass}
      fat={fats}
      carb={protien}
      protien={carbs}
      calories={totalCalories}
      wt={data.weight}
      wtUnit={data.weightUnit}
      gndr={data.gender}
    />
  );
}

export default Male;
