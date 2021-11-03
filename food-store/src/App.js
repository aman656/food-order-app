import React,{useState} from 'react';
import Header from './components/Layout/Header';
import './App.css';
import FinalMeals from './components/Meals/FinalMeals';
import CartItem from './components/Cart/CartItem';
import CardProvider from './components/store/CartProvider';

function App() {
  const [displayCart,setCartDisplay] = useState(false)

  const ShowCart = ()=>{
    setCartDisplay(true)
  }
  const HideCart = ()=>{
    setCartDisplay(false)
  }





  return (
    <CardProvider>
      {displayCart && <CartItem onHide = {HideCart}/>}
      <Header onShow = {ShowCart}/>
      <main>
        <FinalMeals/>
        </main>
    </CardProvider>

  )
    

}
export default App;
