import * as React from 'react';
import { useState,useReducer } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Calcs } from "../Hooks/Calcs";
import Container from '../UI-Components/Container';
import { NavLink, useNavigate } from "react-router-dom";
import BasicButtons from '../UI-Components/BasicButtons';
import CustomizeMeals from '../Components/CustomizeMeals';
import SimpleBackdrop from '../UI-Components/SimpleBackdrop';

const initialState={
  selectedItems:[],
  stateBtns:[],
  selectState:''
}

function reducer(snState,action){
  switch(action.type){

    case"add":{
      //const item = {action.payload}
      const getStateBtn = action.payload.id
      return {...snState,selectedItems:[...snState.selectedItems,action.payload],stateBtns:[...snState.stateBtns,getStateBtn]}
    }
    case 'remove':{
      const updateList = snState.selectedItems.filter((item)=>item.id!==action.payload)
      const updateStateBtn = snState.stateBtns.filter((item)=>item!==action.payload)
      return {...snState,selectedItems:updateList,stateBtns:updateStateBtn}
    }
    case 'handle':{
      return {...snState,selectedItems:[],stateBtns:[]}
    }
    case 'unselectAll':{
      return {...snState,selectedItems:[],stateBtns:[]}
    }

    default :{
      throw new Error('Action not known')
    }
  }
}

export default function StickyHeadTable() {
const [{selectedItems,stateBtns},dispatch] = React.useReducer(reducer,initialState)
  const [meals, setMeals] = useState("");
  const  storedItem =  JSON.parse(localStorage.getItem('storedItem'))
const { calcsData, totalCalories,totalPortions } = Calcs(storedItem);
const { fats, protien, carbs, leanMass } = calcsData;
const {totalFat, totalProtien, totalCarbs} = totalPortions

const columns = [
  { id: 'CarbName', label: `Carb Sources In Grams Per ${meals==""||meals==1?'Day':"meals"} Of Food`, minWidth: 100 },
  { id: 'ProteinName', label: `Protein Sources In Grams Per ${meals==""||meals==1?'Day':"meals"} Of Food`, minWidth: 100 },
];
  function createData(ProteinName, CarbName,id) {
    return { ProteinName, CarbName ,id};
  }
  const settingMeals = meals==""?1:meals
  const mydata = [
  {id:1,carbName:{name:'White Rice',QTY:(carbs/.26),calories:totalCarbs,serialId:1},protienName:{name:'Beef Mince 5% Leaf',QTY:(protien/.21),calories:totalProtien,serialId:2}},
  {id:2,carbName:{name:'Sweet Potato',QTY:(carbs/.17),calories:totalCarbs,serialId:3},protienName:{name:'Chicekn Breast',QTY:(protien/.26),calories:totalProtien,serialId:4}},
  {id:3,carbName:{name:'Oats',QTY:(carbs/.1),calories:totalCarbs,serialId:5},protienName:{name:'Turkey Breast',QTY:(protien/.3),calories:totalProtien,serialId:6}},
  {id:4,carbName:{name:'Brown Rice',QTY:(carbs/.21),calories:totalCarbs,serialId:7},protienName:{name:'Tuna',QTY:(protien/.23),calories:totalProtien,serialId:8}},
  {id:5,carbName:{name:'',QTY:'',serialId:9},protienName:{name:'Eggs (large)',QTY:((protien/.06)/58),calories:totalProtien,serialId:10}},
  {id:6,carbName:{name:'',QTY:'',serialId:11},protienName:{name:'Low Fat Yoghurt',QTY:(protien/.05),calories:totalProtien,serialId:12}}
  ]
  
  
  const rows = mydata.map((item)=>{
    return createData(item.protienName, item.carbName,item.id)
  })
 


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  
  function addItem(item){
    dispatch({type:'add',payload:item})
    
  }
  function removeItem(id){
    dispatch({type:"remove",payload:id})
  }
  function handleSelect(){
    dispatch({type:'handle'})
  }
  function unselect(){
    dispatch({type:'unselectAll'})
  }
  const [close,setClose] = useState(false)
 
  return (
    <>
     <div className={`floatTable ${close?'close':''}`}>
      <div className='dietPng'>
        <img src="./diet.png" alt="Diet" />
      </div>
      <div className='showFoodsTable'>
        <button onClick={()=>setClose((op)=>!op)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
        <path style={{"fill":"#232326"}} d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right"/></svg>
        </button>
      </div>
    {/*  <BasicButtons onClick={handleOpen}>Show backdrop</BasicButtons>*/}
     

     <div className='flex justify-between mb-[10px] select-unselect '>
      {selectedItems.length>0&&<p className='bg-black text-white py-[5px] px-[10px] rounded-[10px] text-[12px] font-bold'>{selectedItems.length>0?`${selectedItems.length} Selected`:''}</p>}
      
    {selectedItems.length>0&& <button onClick={()=>unselect()} className='bg-red-600 font-medium block ml-[auto] text-white py-[5px] px-[10px]  text-[12px] rounded-[8px]'>Un Select All</button>}
     </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <div style={{"fontSize":"14px","fontWeight":400}}>
                  
                  {column.label}
                  
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow  hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column,index) => {
                      const name = row[column.id].name;
                      const Quantitiy = +(row[column.id].QTY)
                      const calories = (meals==""||meals==1)?+(row[column.id].calories):((Quantitiy/settingMeals)*(+(row[column.id].calories)))/Quantitiy
                      const id = row[column.id].serialId
                      const quantityPermeal =  Quantitiy/settingMeals

                      return (
                        <TableCell key={column.id} align={column.align}>
                         
                        <input id="mealName" type="checkbox" style={{"display":"none"}}/>
                        <label    htmlFor="mealName">
                           {name}
                           <p>{name!==''?`Qty: ${Math.ceil(Quantitiy.toFixed(1)/settingMeals)} g`:''}</p>
                           <p>{name!==''?`Calories: ${Math.ceil(calories.toFixed(1))} cal`:''}</p>
                        </label>
                        <div>
          {name!==''&&<>
            <button disabled={(stateBtns.indexOf(id)>-1 || meals=='') ?true:false} onClick={()=>{addItem({name,quantityPermeal,calories,id})}} className={`p-1 bg-white rounded-sm text-black text-[12px] addBtn  ${stateBtns.indexOf(id)>-1 || meals==''?'selectBtn':''}`}>{stateBtns.indexOf(id)>-1?'selected':'select'}</button>
            <button onClick={()=>removeItem(id)} disabled={(stateBtns.indexOf(id)>-1) ?false:true} className={`${stateBtns.indexOf(id)>-1?'opacity-100':'opacity-15'}  ml-[10px] p-1 removeBtn bg-black rounded-sm text-white text-[12px]`}>un select</button>
          </>}
      
                          
                        </div>
                         
                      
                       <div>
                      
                       </div>
                 
                        
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    
    </Paper>
      </div>
   {/* <SimpleBackdrop setOpen={setOpen} open = {open}/>*/ }
     <Container className="customContainerTable flex py-[50px] flex-wrap">
     <div className='w-[100%]'>

     <CustomizeMeals handleSelect={()=>handleSelect()}  selectedItems={selectedItems} meals={meals} setMeals={setMeals} data={mydata}/>
  
      </div>
     
   
      <NavLink to={"/result"} className={'absolute left-[15px] top-[20px] px-[20px] py-[5px] rounded-[8px] bg-black text-white'}>Back</NavLink>
   <div className='w-full flex justify-center mt-[15px] self-end'>
   <NavLink to={"/"} className={'resetBtn left-[15px] top-[20px] px-[20px] py-[5px] rounded-[8px] bg-black text-white'}>Reset</NavLink>

   </div>
    </Container>

    </>
   
  );
}
