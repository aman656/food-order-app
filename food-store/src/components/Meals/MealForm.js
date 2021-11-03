import React,{useRef,useState} from 'react'
import classes from './MealForm.module.css'
import Input from '../UI/input'



const MealForm = (props)=>{
    const[enteringAmount,setenteringAmount]=useState(true)
    const inputRef = useRef()
    const submitHandler = (event)=>{
        event.preventDefault();
        const enteredAmount = inputRef.current.value
        const enteredAmountfilter = +enteredAmount
        if(enteredAmount.trim().length===0 || enteredAmountfilter < 1 || enteredAmountfilter>10){
            setenteringAmount(false)
            return
        }
        props.onAddingtoCart(enteredAmountfilter)
        

    }
    return <form className = {classes.form} onSubmit={submitHandler}>
       <Input ref = {inputRef} label = "Amount" input={{
           id:props.id,
           type :'number',
           min:"1",
           max:'10',
           step:'1',
           defaultValue:"1"
       }}/>
        <button>Add</button>
        {!enteringAmount && <p>Entered a valid Amount</p>}
    </form>

}

export default MealForm