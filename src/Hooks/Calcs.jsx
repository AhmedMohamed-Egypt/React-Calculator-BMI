const factors = {
  kgFemale: 0.65,
  kgMale:.8,
  poundMale:.8
};

function calulate(factor, data) {
  const calcsData = { fats: 0, protien: 0, carbs: 0, leanMass: 0 };
  calcsData.leanMass =  Math.abs((data.weight * factor).toFixed(2));
  calcsData.fats = data.weightUnit==="Pound"?(Math.abs(data.weight*.454*factor)).toFixed(2):(calcsData.leanMass * 1);
  calcsData.protien = data.weightUnit==="Pound"?(Math.abs(data.weight*.454*factor*2)).toFixed(2): calcsData.leanMass * 2;
  calcsData.carbs = data.weightUnit==="Pound"?(Math.abs(data.weight*.454*factor*2)).toFixed(2):  calcsData.leanMass * 2;
  const totalPortions = {
    totalFat: (calcsData.fats * 9) ,
    totalProtien: (calcsData.protien * 4) ,
    totalCarbs: (calcsData.carbs * 4) ,
  };
  const totalCalories = Math.abs(Object.keys(totalPortions)
  .map((key) => totalPortions[key])
  .reduce((a, b) => {
    return a + b;
  }, 0).toFixed(1))

  const totalPortionPercentage={
    percentProtien:((totalPortions.totalProtien)/totalCalories).toFixed(2) * 100,
    percentFat:((totalPortions.totalFat)/totalCalories).toFixed(2) * 100 ,
    percentCarbs:((totalPortions.totalCarbs)/totalCalories).toFixed(2) * 100
  }

  

  return { calcsData, totalCalories, totalPortions ,totalPortionPercentage};
}

function Calcs(data) {
  if (data.gender === "female" && data.weightUnit === "Kg") {
    return calulate(factors.kgFemale, data);
  }
  if (data.gender === "male" && data.weightUnit === "Kg") {
    return calulate(factors.kgMale, data);
  }

  if(data.gender==="male"&&data.weightUnit==="Pound"){
    return calulate(factors.poundMale, data);
  }

}

export { Calcs };
