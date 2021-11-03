import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './Mealsitem'
import {useEffect,useState} from "react";

const AvailableMeals = ()=>{
  const[availableitems,setAvailableitems] = useState([])
  const[loading,setLoading] = useState(true)
  const[errormessage,setError] = useState()

  useEffect(()=>{
    const fetchingMeals =async()=>{
    const response = await fetch("https://silicon-alchemy-299118-default-rtdb.firebaseio.com/meals.json");
    if(!response.ok){
      throw new Error("Something went wrong")
    }
    const data = await response.json()
    const mealsget = []
    for(const key in data){
      mealsget.push({
        id:key,
        name:data[key].name,
        description:data[key].description,
        price:data[key].price
      })
    }
    setAvailableitems(mealsget)
    setLoading(false)
  }
  fetchingMeals().catch (error=>{
    setLoading(false)
    setError(error.message)
  })



  },[])
    return <section className={classes.meals}>{loading?<p className={classes.load}>Loading...</p> : errormessage ?<p className={classes.load}>{errormessage}</p>:
        <Card>
            <ul>
        {availableitems.map((meals)=>(  <MealItem key = {meals.id}  id={meals.id}  name = {meals.name} price ={meals.price} description = {meals.description}/>

        ))}
        </ul>
        </Card>}
    </section>

}
export default AvailableMeals