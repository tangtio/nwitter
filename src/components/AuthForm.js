import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState("true");
    const [error, setError] = useState("");
   
    const onChange = (event) => {
        const{target:{name, value}} = event;
        if(name==="email"){
            setEmail(value)
        } else if (name==="password"){
            setPassword(value);
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            let data;
        if(newAccount){
            //create account
           data = await authService.createUserWithEmailAndPassword(email, password)
        } else {
            //log In
           data = await authService.signInWithEmailAndPassword(email, password)
        }
    console.log(data);
         } catch(error){
            setError(error.message);
         }
    };
    
    const toggleAccount = () => setNewAccount((prev)=> !prev);
    return(
  <> 
   <form onSubmit={onSubmit}>
        <input 
        name="email" 
        type="email" 
        placeholder="Email" 
        required value ={email}
        onChange={onChange}
        />
        <input 
        name="password"
        type="password" 
        placeholder="Password" 
        required ={password}
        onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account":"Sign In"} 
        />
        {error}
   
    </form>
    <span 
    onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}
    </span> </>
)}
export default AuthForm;