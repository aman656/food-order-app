import React,{useReducer} from "react";
import CartContext from "./creating-context";

const defaultcartstate = {
    items:[],
    totalbill:0
}
const CartReducer = (state,action)=>{
    if(action.type==="Add_item"){
        let updated_items = state.items.concat(action.item)
        const update_amount = state.totalbill + action.item.price *action.item.amount;


        const existingcartitemindex = state.items.findIndex(item=>(
            item.id === action.item.id
        ))
        const existingcartitem = state.items[existingcartitemindex]
        // let updated_items;
       
        if(existingcartitem){
            const  updated_item = {
                ...existingcartitem,
                amount:existingcartitem.amount + action.item.amount
            }
            updated_items = [...state.items]
            updated_items[existingcartitemindex] = updated_item
        } 
        else{
            updated_items = state.items.concat(action.item)
        }
        return {
            items:updated_items,
            totalbill:update_amount
        }
    }
    if(action.type==="Clear"){
        return defaultcartstate
    }
    if(action.type==="Remove_item"){
        const existingcartitemindex = state.items.findIndex((item)=>(
            item.id===action.id

        ))
        const existingcartitem = state.items[existingcartitemindex]
        const update_amount = state.totalbill - existingcartitem.price
    
        let updated_items
        if(existingcartitem.amount ===1){
            updated_items = state.items.filter(item=> 
                item.id !==action.id

        )
    }
        else{
            const updated_item = {
               ...existingcartitem,amount:existingcartitem.amount -1
        }
            updated_items =[...state.items]
            updated_items[existingcartitemindex] = updated_item
    }
    return{
        items:updated_items,
        totalbill:update_amount
    }
}
    return defaultcartstate
}



const CardProvider = (props)=>{
    const[state,dispatchCart] = useReducer(CartReducer,defaultcartstate)

    const addHandler = (item)=>{
        dispatchCart({type:"Add_item",item:item})
    }
    const removeHandler = (id)=>{
        dispatchCart({type:"Remove_item",id:id})
    }
    const clearCart = ()=>{
        dispatchCart({type:"Clear"})
    }
    const cartContext = {
        items:state.items,
        amount:state.totalbill,
        additem:addHandler,
        removeitem:removeHandler,
        clearCart,
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}

        </CartContext.Provider>
}

export default CardProvider