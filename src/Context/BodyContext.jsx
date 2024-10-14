import { data } from "autoprefixer";
import { createContext, useContext, useEffect, useReducer } from "react";
//Create Context
const BodyContext = createContext();

//Create Provider
const initialState = {
  data: { gender: '', weight: '', weightUnit: '' ,activeState:false},
  
};
function reducer(snState, action) {
  switch (action.type) {
    case "update": {
     
      const checkActiveState = ((action.payload.gender !='') && (action.payload.weight!='') && (action.payload.weightUnit!='')) ? true:false
      
      if(checkActiveState){
        return { ...snState,data:{...action.payload,activeState:true} };
      }else {
        return { ...snState,data:{...action.payload,activeState:false} };
      }
     
    }
    default: {
      throw new Error("Action not known");
    }
  }
}
function BodyProvider({ children }) {
  const [{ data }, dispatch] = useReducer(reducer, initialState);

  function getData(dataPerson){
    dispatch({type:'update',payload:dataPerson})
  }

  
  return <BodyContext.Provider value={{getData,data}}>{children}</BodyContext.Provider>;
}

//Use Body Context

function UseBodyContext() {
  const context = useContext(BodyContext);

  if (context == undefined) {
    throw new Error("Context Used Outside Scope");
  } else {
    return context;
  }
}

export { BodyProvider, UseBodyContext };
