
import { useReducer, useState } from "react";
import SelectBox from "../UI-Components/SelectBox"
import MenuItem from '@mui/material/MenuItem';
import TextInput from "../UI-Components/TextInput";
import BasicButtons from "../UI-Components/BasicButtons";
import { UseBodyContext } from "../Context/BodyContext";
import { NavLink } from "react-router-dom";

const initialState = {
    gender:'',
    weight :0,
    weightUnit:''
}
function reducer(snState,action){
    switch(action.type){
        case "updateGender":{
            if(action.payload==='female'){
                return {...snState,gender:action.payload,weightUnit:'Kg'}
            }else {
                return {...snState,gender:action.payload,weightUnit:snState.weightUnit}
            }
           
        }
        case 'updateWeight':{
            return {...snState,weight:action.payload}
        }
        case 'updateSelect':{
            return {...snState,weightUnit:action.payload}
        }
      
        default:{
            throw new Error('Action not known')
        }
    }
}
function StartPage() {
   
const [{gender,weight,weightUnit},dispatch] = useReducer(reducer,initialState)
const {getData,data} = UseBodyContext()
const handleRadio = (gndr)=>{
    dispatch({type:'updateGender',payload:gndr})
    if(gndr==='female'){
        getData({...data,gender:gndr,weightUnit:'Kg'})
    }else {
        getData({...data,gender:gndr})
    }
   
}

const handleChange = (param)=>{
dispatch({type:'updateWeight',payload:param})
getData({...data,weight:param})
}
const handleSelect = (selectValue)=>{
   
    dispatch({type:'updateSelect',payload:selectValue})
    getData({...data,weightUnit:selectValue})
}
    return (
      <>
        <div className="container containerCentralized mx-auto border bg-white border-gray-300 px-3">
            <h3 className='text-center mb-[25px] text-2xl'>Welcome to Our Calculator</h3>
            <div className='flex items-center justify-center flex-wrap'>
            <p className="w-full text-center mb-2 italic font-medium">Click on your Gender</p>
              <div className="mr-[10px]">
              <label htmlFor="male" className={`btnGender bg-blue-600 ${(gender||data.gender)=='male'?'opacity-100':''}`}>Male</label>
              <input type="radio" id="male" className="hide" name="gender" value={gender||data.gender} onClick={(e)=>handleRadio(e.target.id)}/>
              </div>
              <p>OR</p>
              <div className="ml-[10px]">
              <label htmlFor="female" className={`btnGender bg-rose-500 ${(gender||data.gender)=='female'?'opacity-100':''}`} >Female</label>
              <input type="radio" id="female" className="hide" name="gender" value={gender||data.gender} onClick={(e)=>handleRadio(e.target.id)} />
              </div>
            </div>
            <div className="w-[400px] mx-auto my-[25px] flex items-center justify-between">
            <div className="w-[58%]">
                <TextInput endTitle={data.weightUnit}  value={weight||data.weight} onChange={(e)=>handleChange(+e.target.value)} />
            </div>
          <div className="w-[38%]">
          <SelectBox title="Weight-Unit" label="Weight-Unit" value={weightUnit||data.weightUnit} onChange={(e)=>handleSelect(e.target.value)}>
            
            <MenuItem value={'Kg'}>Kg</MenuItem>
            <MenuItem disabled={gender==='female'||data.gender==='female'?true:false} value={'Pound'}>Pound</MenuItem>
            </SelectBox>
          
          </div>
          
            </div>

            <div className="flex justify-center">
                
                <NavLink to="/result" className={` calcBtn ${data.activeState?'z-[100] opacity-100':'z-[-1] opacity-50'}`}>Calculate</NavLink>
            </div>
        
        </div>
        
      </>
    )
}

export default StartPage
