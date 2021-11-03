import React from 'react'


const CartContext = React.createContext({
    items:[],
    amount:0,
    additem : (item)=>{},
    removeitem:(id)=>{},
    clearCart:()=>{}
})

export default CartContext