import { NavLink, useNavigate } from "react-router-dom";
import ChartView from "../Components/Charts/ChartView";
import { Calcs } from "../Hooks/Calcs";
import BasicButtons from "../UI-Components/BasicButtons";
import LeftAligned from "../UI-Components/LeftAligned";
function Result() {
  const  storedItem =  JSON.parse(localStorage.getItem('storedItem'))
  const { calcsData, totalCalories } = Calcs(storedItem);
  const { fats, protien, carbs, leanMass } = calcsData;
  const { totalPortionPercentage } = Calcs(storedItem);
  const { percentProtien, percentFat, percentCarbs } = totalPortionPercentage;
  
  const activeState =
  storedItem.activeState ?true:false
  const Navigate = useNavigate()
  return (
    <div className="container flex-wrap flex items-center justify-center containerCentralized mx-auto border bg-white border-gray-300 px-3">
    {activeState==true?     <LeftAligned
      leanmass={leanMass}
      fat={fats}
      carb={protien}
      protien={carbs}
      calories={totalCalories}
      wt={storedItem.weight}
      wtUnit={storedItem.weightUnit}
      gndr={storedItem.gender}
    />:'not found'}
      <div className="max-w-[250px]">
   {  <ChartView proteinVal={percentProtien} fatVal={percentFat} carbVal={percentCarbs}/> }
      </div>
      <NavLink to={"/"} className={'absolute left-[15px] top-[20px] px-[20px] py-[5px] rounded-[8px] bg-black text-white'}>Back</NavLink>
      <div className="w-full flex justify-center mt-[50px]">
        <BasicButtons txt="Show Recommended Foods" onClick={()=>Navigate('/DataFoods')}/>
      </div>
    </div>
  );
}

export default Result;
