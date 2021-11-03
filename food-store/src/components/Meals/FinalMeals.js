import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsDetail";
import React from 'react'


const FinalMeals = ()=>{
    return <React.Fragment>
        <MealsSummary/>
        <AvailableMeals/>
    </React.Fragment>
}

export default FinalMeals