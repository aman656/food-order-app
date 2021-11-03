import React,{useContext,useState,useEffect} from "react";
import CartIcon from "../Cart/CartIcon";
import  classes from "./CartButton.module.css";
import CartContext from "../store/creating-context";

const CartButton = (props) => {
  const [buttonbump,settingbuttonbump] =  useState(false)
   const cartctx = useContext(CartContext)
  const {items} = cartctx
  

  const contx = useContext(CartContext)
  const numberofitems = contx.items.reduce((curAmount,item)=>{
    return curAmount + item.amount
  },0)
  const btnclasses = `${classes.button} ${buttonbump ? classes.bump : ""}`
  useEffect(()=>{
    if(items.length===0){
      return
    }
    settingbuttonbump(true)
    const timer = setTimeout(()=>{
      settingbuttonbump(false)
    },300)
    return ()=>{
      clearTimeout(timer)

    }

    
  },[items])


  return (
    <button className={btnclasses} onClick = {props.onShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>

      <span className={classes.badge}>{numberofitems}</span>
    </button>
  );
};

export default CartButton;
