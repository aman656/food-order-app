import React,{useContext} from 'react'
import classes from './CartItem.module.css'
import Modal from '../UI/Modal'
import CartContext from '../store/creating-context'
import Cart from './Cart'
import CheckOut from './CheckoutForm'
import { useState } from 'react'

const CartItem = (props)=>{
    const [checkform,setcheckform] = useState(false)
    const[isSubmitting,setisSubmitting]= useState(false)
    const[submitted,setSubmitted] = useState(false)

    const cartctx = useContext(CartContext);
    const totalAmount = `$${cartctx.amount.toFixed(2)}`
    const hasitemincart = cartctx.items.length >0

    const addcartitemHandler = (item)=>{
        cartctx.additem({...item,amount:1})
    }
    const removecartitemHandler = (id)=>{
        cartctx.removeitem(id)
    }
    const checkFormHandler = ()=>{
        setcheckform(true)
    }

    const postRequest =async (userdata)=>{
        setisSubmitting(true)
        await fetch("https://webapp-e180b-default-rtdb.firebaseio.com/orders.json",{
            method:"POST",
            body:JSON.stringify({
                userdata,
                orderitems:cartctx.items
            })
        })
        setSubmitted(true)
        setisSubmitting(false)
        cartctx.clearCart()

    }

    const items =( <ul className={classes['cart-items']}>{
        cartctx.items.map((item)=>(
            <Cart key={item.id} name = {item.name} amount = {item.amount} price = {item.price} onAdd = {addcartitemHandler.bind(null,item)} onRemove = {removecartitemHandler.bind(null,item.id)}/>
        )
        )}</ul>
    )
    const beforesubmittingcontent = <React.Fragment>
         {items}
        <div className = {classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {checkform && <CheckOut  onClose = {props.onHide} onGive ={postRequest}  />}
        {!checkform  &&<div className = {classes.actions}>
            <button className = {classes['button-alt']} onClick={props.onHide} >Close</button>
            {hasitemincart && <button className={classes.button} onClick={checkFormHandler}>Proceed Order</button>}
        </div>}

    </React.Fragment>
   
    return <Modal onClose = {props.onHide}>
       {!isSubmitting && !submitted && beforesubmittingcontent} 
       {isSubmitting && !submitted && <p>Submitting your order.</p>}
       {!isSubmitting && submitted && <React.Fragment><p>Your order has been proceeded. </p><div className={classes.actions}><button className = {classes.button} onClick={props.onHide} >Close</button></div></React.Fragment>}
        </Modal>

}

export default CartItem