import { useEffect, useReducer, useState } from "react";
import { Calcs } from "../Hooks/Calcs";
import { MenuItem } from "@mui/material";
import SelectBox from "../UI-Components/SelectBox";

const initialState = {
  addState: 0,
  types: [],
  doneStatus: false,
  showFinal: false,
  calcFinalMeals: [],
  totalCals: 0,
};

function reducer(snState, action) {
  switch (action.type) {
    case "add": {
      const updateTypes = snState.types.map((item) => {
        if (item.id === action.payload.index) {
          const prevItem = item.addedItem ? item.addedItem : [];
          return {
            ...item,
            addedItem: [...prevItem, ...action.payload.selectedItems],
          };
        } else {
          return { ...item };
        }
      });

      const updateDone = !updateTypes
        .map((item) =>
          item.addedItem ? (item.addedItem.length > 0 ? true : false) : false
        )
        .includes(false);

      return {
        ...snState,
        addState: action.payload.index,
        types: updateTypes,
        doneStatus: updateDone,
        calcFinalMeals: [],
      };
    }
    case "updatelength": {
      const modifyTypes = Array.from(
        { length: action.payload.length },
        (v, i) => i
      ).map((item, index) => {
        return { id: index, ...item };
      });
      action.payload.selectedItems = [];

      return { ...snState, types: modifyTypes, calcFinalMeals: [],doneStatus:false};
    }
    case "deleteItemTypes": {
      const index = action.payload.index;
      const nameItem = action.payload.nameItem;
      const updateTypes = snState.types.map((item) => {
        if (index === item.id) {
          const filterAddedItem = item.addedItem.filter(
            (item) => item.name !== nameItem
          );
          return { ...item, addedItem: filterAddedItem };
        } else {
          return { ...item };
        }
      });
      const updateDone = !updateTypes
        .map((item) =>
          item.addedItem ? (item.addedItem.length > 0 ? true : false) : false
        )
        .includes(false);


      return {
        ...snState,
        types: updateTypes,
        doneStatus: updateDone,
        calcFinalMeals: [],
      };
    }

    case "showFinal": {
      const finaleMeals =
        snState.types.length > 0
          ? snState.types.map((item, indexItem) => {
              return item;
            })
          : [];

      const allCalories = finaleMeals
        .reduce((acc, cur) => {
          return [...acc, cur.addedItem ? cur.addedItem.length : []];
        }, [])
        .reduce((a, b) => {
          return a + b;
        }, 0);

      const caloriesForEachMeal =
        allCalories > 0 ? action.payload.totalCal / allCalories : 0;

      const calculatedFinalMeals = finaleMeals.map((item) => {
        const calcAddeditem = item.addedItem
          ? item.addedItem.map((itemAdded) => {
              //quantityPermeal
              const newWt =
                (caloriesForEachMeal * +itemAdded.quantityPermeal) /
                +itemAdded.calories;
              return {
                name: itemAdded.name,
                cal: caloriesForEachMeal,
                weight: newWt,
              };
            })
          : [];
        return { ...item, addedItem: calcAddeditem };
      });

      return {
        ...snState,
        showFinal: action.payload.bool,
        calcFinalMeals: calculatedFinalMeals,
      };
    }
    default: {
      throw new Error("Action not known");
    }
  }
}
const mealsIndex = {
  0: {name:"First Meal"},
  1: {name:"Second Meal"},
  2: {name:"Third Meal"},
  3: {name:"Fourth Meal"},
};
function CustomizeMeals({ meals, setMeals, selectedItems, handleSelect }) {
  const storedItem = JSON.parse(localStorage.getItem("storedItem"));
  const { totalCalories } = Calcs(storedItem);
  console.log(storedItem)

  const [{ types, doneStatus, showFinal, calcFinalMeals }, dispatch] =
    useReducer(reducer, initialState);

  function handleAdd(index, id) {
    dispatch({ type: "add", payload: { index, selectedItems, id } });
  }

  function handleSelectMeal(length) {
    dispatch({ type: "updatelength", payload: { length, selectedItems } });
    setMeals(length);
    handleSelect();
  }

  function handleDeleteItem(index, nameItem) {
    dispatch({ type: "deleteItemTypes", payload: { index, nameItem } });
  }

  const showFinalFun = () => {
    dispatch({
      type: "showFinal",
      payload: { bool: true, totalCal: totalCalories },
    });
  };

  return (
    <div>
    <div className="">
    
    <p className="text-center mb-1 text-[24px] font-bold italic">Total Calories {totalCalories}</p>
    </div>
      <div className="mb-3">
        <div className="w-[400px] mx-auto">
          <SelectBox
            value={meals}
            title="How Many meals"
            label="How Many meals"
            onChange={(e) => {
              handleSelectMeal(e.target.value);
            }}
          >
            
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </SelectBox>
          <p className="text-center text-[12px] font-medium italic mb-3 mt-1">
            All Selected items will be add to each meal when click on add /
            update{" "}
          </p>
        </div>

        {meals > 0 && (
          <>
            {types.map((itemElmnt, index) => (
              <div
                className="w-[90%] mx-auto py-[15px] bg-[#ecf0f1] text-white mb-3 relative  flex flex-wrap pl-[10px]"
                key={index}
              >
                {itemElmnt.addedItem ? (
                  <>
                    {itemElmnt.addedItem.map((item, index) => (
                      <p className="relative customize-meal" key={index}>
                        <span>{item.name}</span>

                        <button
                          onClick={() =>
                            handleDeleteItem(itemElmnt.id, item.name)
                          }
                          className="delete absolute top-[-3px] transition hover:text-red-600 right-[5px]"
                        >
                          x
                        </button>
                      </p>
                    ))}
                  </>
                ) : (
                  ""
                )}
                <button
                  onClick={(e) => handleAdd(index, itemElmnt.id)}
                  disabled={selectedItems.length > 0 ? false : true}
                  className={`p-1 absolute right-[5px] rounded-md text-white top-[5px] bg-green-500 text-[10px] font-medium`}
                >
                  {itemElmnt.addedItem
                    ? itemElmnt.addedItem.length > 0
                      ? "update"
                      : "Add"
                    : "Add"}
                </button>
              </div>
            ))}
          </>
        )}

        {doneStatus && (
          <button
            onClick={() => showFinalFun()}
            className="p-2 block mx-auto rounded-md bg-[#7f8c8d] calcQuantity font-medium px-[15px] text-white"
          >
            Calculate Recommended Quantity
          </button>
        )}
      </div>
      {doneStatus &&
        showFinal &&
        calcFinalMeals.map((item, index) => (
          <div key={index} className="w-[90%] mx-auto">
            <p className="w-full mb-[5px] pl-[10px] font-medium text-[15px]">{mealsIndex[index].name}</p>
            <div
              key={index}
              className={`text-white mb-3 flex   rounded-[30px] flex-wrap ${index==calcFinalMeals.length-1?'pb-[50px]':''}`}
            >
              {item.addedItem.map((item, indexItem) => (
                <div
                  key={indexItem}
                  className={` flex items-center mb-[5px] bg-[#ecf0f1]  text-[#000] rounded-[20px] px-4 py-2 mr-[10px]`}
                >
                  <p className="mr-[10px] text-[13px] font-medium">{`${item.name}`} </p>
                  <p className="text-[13px] font-medium mr-[10px]" >{`${Math.ceil(item.weight).toFixed(
                    0
                  )}g`}</p>
                  <p className=" text-[13px] font-medium">{`${Math.ceil(
                    item.cal
                  )}cal`}</p>
                  
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
export default CustomizeMeals;
