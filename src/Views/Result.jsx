import { NavLink } from "react-router-dom";
import ChartView from "../Components/Charts/ChartView";
import Female from "../Components/Female/Female";
import Male from "../Components/Male/Male";
import { UseBodyContext } from "../Context/BodyContext";
import BasicButtons from "../UI-Components/BasicButtons";

function Result() {
  const { data } = UseBodyContext();
  //female => femal && kg
  const showFemal =
    data.activeState && data.weightUnit == "Kg" && data.gender == "female";
  return (
    <div className="container flex-wrap flex items-center justify-center containerCentralized mx-auto border bg-white border-gray-300 px-3">
      {showFemal == true ? <Female /> : <Male />}
      <div className="max-w-[250px]">
      <ChartView/>
      </div>
      <NavLink to={"/"} className={'absolute left-[15px] top-[20px] px-[20px] py-[5px] rounded-[8px] bg-black text-white'}>Back</NavLink>
      <div className="w-full flex justify-center mt-[50px]">
        <BasicButtons txt="Show Recommended Foods"/>
      </div>
    </div>
  );
}

export default Result;
