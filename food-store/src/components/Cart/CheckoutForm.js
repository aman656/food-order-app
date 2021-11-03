import classes from './Checkoutform.module.css'
import { useRef,useState} from 'react'

const CheckOut = (props)=>{
    const nameRef = useRef();
    const addressRef = useRef();
    const postalRef = useRef()
    const cityRef= useRef();
    const[allinputs,settingAllinputs]= useState({
        name:true,
        address:true,
        postalCode:true,
        city:true
    })
    const textisValid = text =>    text.trim()!==""
    
    const postalisValid = code=>    code.trim().length ===4
    

    const submitHandler = (event)=>{
        event.preventDefault()
        const enteredName = nameRef.current.value
        const enteredAddress = addressRef.current.value
        const enteredpostal = postalRef.current.value
        const enteredCity = postalRef.current.value

        const nameisValid = textisValid(enteredName)
        const addressisValid = textisValid(enteredAddress)
        const postalCodeisValid = postalisValid(enteredpostal)
        const cityisValid = textisValid(enteredCity) 

        settingAllinputs({
            name:nameisValid,
            address:addressisValid,
            postalCode:postalCodeisValid,
            city:cityisValid
        })

        const formisValid = nameisValid && addressisValid && postalCodeisValid && cityisValid
        if(!formisValid){
            return;
        }
        props.onGive({
            name:enteredName,
            address:enteredAddress,
            postalCode:enteredpostal,
            city:enteredCity
        })
    }
    
    return(
        <form className={classes.form} onSubmit={submitHandler}>
    <div className={`${classes.control} ${allinputs.name? "": classes.invalid}`}>
        <label htmlFor="name">Enter Name</label>
        <input  type="text"     id="name"   ref={nameRef}   />
        {allinputs.name!==true && <p>Please enter a valid name</p>}

    </div>
    <div className={`${classes.control} ${allinputs.address? "": classes.invalid}`}>
        <label htmlFor="address">Address</label>
        <input  type="text"     id="name"    ref={addressRef}  />
        {allinputs.address!==true && <p>Please enter a valid address</p>}

    </div>
   <div className={`${classes.control} ${allinputs.postalCode? "": classes.invalid}`}>
        <label htmlFor="poscode">Postal Code</label>
        <input  type="number"     id="poscode"  ref={postalRef}    />
        {allinputs.postalCode !== true && <p>Please enter a valid postal code</p>}

    </div>
    <div className={`${classes.control} ${allinputs.city? "": classes.invalid}`}>
        <label htmlFor="city">Enter city</label>
        <input  type="text"     id="city"   ref={cityRef} />
        {allinputs.city !== true && <p>Please enter a valid city name</p>}

    </div>
    <div className={classes.actions}>
    <button type="button" onClick={props.onClose}>Cancel</button>
        <button className={classes.submit}>Submit</button>
        
    </div>
    </form>
    )

}
export default CheckOut