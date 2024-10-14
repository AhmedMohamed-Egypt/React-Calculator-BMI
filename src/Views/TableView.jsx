import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Calcs } from "../Hooks/Calcs";
import Container from '../UI-Components/Container';
import { MenuItem } from "@mui/material";
import SelectBox from "../UI-Components/SelectBox";
export default function StickyHeadTable() {
  

const [mealName,setMealName] = useState('')
  const  storedItem =  JSON.parse(localStorage.getItem('storedItem'))
const { calcsData, totalCalories,totalPortions } = Calcs(storedItem);
const { fats, protien, carbs, leanMass } = calcsData;
const {totalFat, totalProtien, totalCarbs} = totalPortions
const [meals, setMeals] = useState("");
const columns = [
  { id: 'CarbName', label: `Carb Sources In Grams Per ${meals==""||meals==1?'Day':"meals"} Of Food`, minWidth: 100 },
  { id: 'ProteinName', label: `Protein Sources In Grams Per ${meals==""||meals==1?'Day':"meals"} Food`, minWidth: 100 },
];
  function createData(ProteinName, CarbName,id) {
    return { ProteinName, CarbName ,id};
  }
  const settingMeals = meals==""?1:meals
  const mydata = [
  {id:1,carbName:{name:'White Rice',QTY:(carbs/.26),calories:totalCarbs},protienName:{name:'Beef Mince 5% Leaf',QTY:(protien/.21),calories:totalProtien}},
  {id:2,carbName:{name:'Sweet Potato',QTY:(carbs/.17),calories:totalCarbs},protienName:{name:'Chicekn Breast',QTY:(protien/.26),calories:totalProtien}},
  {id:3,carbName:{name:'Oats',QTY:(carbs/.1),calories:totalCarbs},protienName:{name:'Turkey Breast',QTY:(protien/.3),calories:totalProtien}},
  {id:4,carbName:{name:'Brown Rice',QTY:(carbs/.21),calories:totalCarbs},protienName:{name:'Tuna',QTY:(protien/.23),calories:totalProtien}},
  {id:5,carbName:{name:'',QTY:''},protienName:{name:'Eggs (large)',QTY:((protien/.06)/58),calories:totalProtien}},
  {id:6,carbName:{name:'',QTY:''},protienName:{name:'Low Fat Yoghurt',QTY:(protien/.05),calories:totalProtien}}
  ]
  
  const rows = mydata.map((item)=>{
    return createData(item.protienName, item.carbName,item.id)
  })



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [addItems,setAddedItems] = useState([])
  const [indexBtn,setIndexBtn] = useState('')
  const handleAdd = (index)=>{
    setIndexBtn(index)
  }
  const handlegetItem=(item)=>{

     setAddedItems((prevItem)=>[...prevItem,{id:indexBtn,...item}])
  }
  return (
     <Container className="customContainerTable flex flex-wrap py-[50px]">
     <div className='w-[100%]'>
     <div>
      <h2 className="text-center mb-1">How Many Meals Per day </h2>
      <p className='text-center mb-1'>Total Calories {totalCalories}</p>
    <div className='w-[50%] mx-auto mb-3'>
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
    </div>
  
      </div>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <div style={{"fontSize":"16px","fontWeight":400}}>
                  
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
                    {columns.map((column) => {
                      const name = row[column.id].name;
                      const Quantitiy = +(row[column.id].QTY)
                      const calories = (meals==""||meals==1)?+(row[column.id].calories):((Quantitiy/meals)*(+(row[column.id].calories)))/Quantitiy
                    
                      return (
                        <TableCell key={column.id} align={column.align}>
                         
                        <input id="mealName" type="checkbox" style={{"display":"none"}}/>
                        <label onClick={(e)=>handlegetItem(row[column.id])} style={{"cursor":"pointer"}}  htmlFor="mealName">
                           {name}
                           <p>{name!==''?`Qty: ${Math.ceil(Quantitiy.toFixed(1)/settingMeals)} gm`:''}</p>
                           <p>{name!==''?`Calories: ${Math.ceil(calories.toFixed(1))} cal`:''}</p>
                          
                        </label>
                         
                      
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
   
    </Container>
  
   
  );
}
