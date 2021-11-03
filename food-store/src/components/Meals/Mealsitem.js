import React,{useContext} from 'react'
import classes from './Mealsitem.module.css'
import MealForm from './MealForm'
import CartContext from '../store/creating-context'

const MealItem = (props)=>{
    const cartctx = useContext(CartContext)

    const price = `$${props.price}`
    const AmountHandler = (amount)=>{
        cartctx.additem({
            id:props.id,
            name:props.name,
            price:props.price,
            amount:amount
        })

    }



    return <li className = {classes.meal}>
        <div >
            <h3>{props.name}</h3>
            <div className ={classes.description}>{props.description}</div>
            <div className = {classes.price}>{price}</div>
        </div>
        <div>
            <MealForm id = {props.id}  onAddingtoCart = {AmountHandler} />
        </div>
        </li>
}

export default MealItem