import { useReducer, useEffect } from "react";
import SelectBox from "../UI-Components/SelectBox";
import MenuItem from "@mui/material/MenuItem";
import TextInput from "../UI-Components/TextInput";
import BasicButtons from "../UI-Components/BasicButtons";
import { UseBodyContext } from "../Context/BodyContext";
import { NavLink, useNavigate,Navigate  } from "react-router-dom";
import Container from "../UI-Components/Container";

const initialState = {
  gender: "",
  weight: 0,
  weightUnit: "",
};
function reducer(snState, action) {
  switch (action.type) {
    case "updateGender": {
      if (action.payload === "female") {
        return { ...snState, gender: action.payload, weightUnit: "Kg" };
      } else {
        return {
          ...snState,
          gender: action.payload,
          weightUnit: snState.weightUnit,
        };
      }
    }
    case "updateWeight": {
      const checkWeight = !isNaN(action.payload)?(+action.payload):0
     
      return { ...snState, weight:checkWeight};
    }
    case "updateSelect": {
      return { ...snState, weightUnit: action.payload };
    }

    default: {
      throw new Error("Action not known");
    }
  }
}
function StartPage() {
  const [{ gender, weight, weightUnit }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { getData, data } = UseBodyContext();
  const handleRadio = (gndr) => {
    dispatch({ type: "updateGender", payload: gndr });
    if (gndr === "female") {
      getData({ ...data, gender: gndr, weightUnit: "Kg" });
    } else {
      getData({ ...data, gender: gndr });
    }
  };

  const handleChange = (param) => {
    dispatch({ type: "updateWeight", payload: param });
    if(!isNaN(param)){
      getData({ ...data, weight: param });
    }else {
      getData({ ...data, weight: 0 });
    }
  };
  const handleSelect = (selectValue) => {
    dispatch({ type: "updateSelect", payload: selectValue });
    getData({ ...data, weightUnit: selectValue });
  };
  function isObjEmpty (obj) {
    return Object.keys(obj).length === 0;
}
localStorage.setItem('storedItem',JSON.stringify({}))
const navigate = useNavigate()
const handleNav =(e)=>{
    e.preventDefault()
    const storedItem = JSON.parse(localStorage.getItem('storedItem')) || {}
    if(isObjEmpty(storedItem)){
       localStorage.setItem('storedItem',JSON.stringify(data))
    }
    navigate("/result")
}
document.querySelector('body').classList.remove('resetBk')
document.querySelector('body').classList.remove('resultPage')
  return (
    <>
    <Container className={`w-[700px] max-w-[90%] containerCentralized py-[50px] mx-auto border bg-white border-gray-300 px-3`}>
    
        <h1 className="text-center text-2xl font-bold">
        M$NR Macro Calculator
        </h1>
        <img src="./-ju0qjg.jpg" className="logo"/>
        <div className="flex items-center justify-center flex-wrap">
        
          <div className="mr-[10px]">
            <label
              htmlFor="male"
              className={`btnGender bg-[#2980b9] ${
                (gender || data.gender) == "male" ? "opacity-100" : ""
              }`}
            >
              Male
            </label>
            <input
              type="radio"
              id="male"
              className="hide"
              name="gender"
              value={gender || data.gender}
              onClick={(e) => handleRadio(e.target.id)}
            />
          </div>
          <p>OR</p>
          <div className="ml-[10px]">
            <label
              htmlFor="female"
              className={`btnGender bg-[#9b59b6] ${
                (gender || data.gender) == "female" ? "opacity-100" : ""
              }`}
            >
              Female
            </label>
            <input
              type="radio"
              id="female"
              className="hide"
              name="gender"
              value={gender || data.gender}
              onClick={(e) => handleRadio(e.target.id)}
            />
          </div>
        </div>
        <div className="w-[400px] container-inputs mx-auto my-[25px] flex items-center justify-between">
          <div className="w-[58%]">
            <TextInput
              endTitle={data.weightUnit}
              value={weight || data.weight}
              onChange={(e) => handleChange(e.target.value)}
              className="textInput"
            />
          </div>
          <div className="w-[38%]">
            <SelectBox
              title="Weight-Unit"
              label="Weight-Unit"
              value={weightUnit || data.weightUnit}
              onChange={(e) => handleSelect(e.target.value)}
              className = 'selectBox'
            >
              <MenuItem value={"Kg"}>Kg</MenuItem>
              <MenuItem
                disabled={
                  gender === "female" || data.gender === "female" ? true : false
                }
                value={"Pound"}
              >
                Pound
              </MenuItem>
            </SelectBox>
          </div>
        </div>

        <div className="flex justify-center">
          <NavLink
            onClick={(e)=>handleNav(e)}
            className={` calcBtn ${
              data.activeState ? "z-[100] opacity-100" : "z-[-1] opacity-50"
            }`}
          >
            Calculate
          </NavLink>
        </div>
    
    </Container>
    
    </>
  );
}

export default StartPage;
