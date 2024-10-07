import { UseBodyContext } from "../../Context/BodyContext";
import { Calcs } from "../../Hooks/CalcsEquations";
import LeftAligned from "../../UI-Components/LeftAligned";

function Male() {
  const { data } = UseBodyContext();
  const { calcsData, totalCalories } = Calcs(data);
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
