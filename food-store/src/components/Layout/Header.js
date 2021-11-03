import React from 'react';
import  classes from './Header.module.css';
import mealsTable from '../assets/meals.jpg'
import CartButton from './CarButton';


const Header = (props)=>{
    return <React.Fragment>
        <header className={classes.header}>
            <h1 style={{color:"white",fontStyle:"oblique"}}>Quick Meals</h1>
            <CartButton onShow ={props.onShow}/>
            
        </header>
        <div className={classes['main-image']}>
            <img src={mealsTable} alt='A table where meals are residing'/>
        </div>
    </React.Fragment>

}

export default Header