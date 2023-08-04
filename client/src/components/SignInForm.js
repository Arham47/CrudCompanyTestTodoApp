import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import URL from '../URL/URL';

export const SignInForm = () => {
  const [value, setValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const login = async () => {
    try {
      const response = await fetch(URL + 'login', {
        mode: 'cors',
        method: 'POST',
        body:JSON.stringify({adminID:localStorage.getItem("adminID"),email:value.email,password:value.password}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
        credentials: 'include',
      });

      const json = await response.json();
      if (json.message === "signout") {
        localStorage.removeItem("adminID")
        navigate("/");
        
      } else if(json.adminID){
        
        setValue({ email: "", password: "" });
        localStorage.setItem("adminID", json.adminID);
        
        navigate("/addtask");
      } else if (json.message === "password") {

        alert("password incorrect")
      }
    
    } catch (error) {
      console.log('error', error);
    }
  };

    const handleSubmit = (e) => {
    
      e.preventDefault();
      if (value.email !== "" || value.password !== "") {

            e.preventDefault();
      if (value.email !== "" || value.password !== "") {
        login()
      } else {
        alert("kindly fill All fields");
      }
      }
       
      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm flex">
      
    <input type="text" value={value.email} onChange={(e) => setValue({...value ,email: e.target.value})} className="todo-input" placeholder='Enter your E-mail' />
    <input type="password" value={value.password} onChange={(e) => setValue({...value,password: e.target.value})} className="todo-input" placeholder='Enter your Password' />
    <button type="submit" className='todo-btn'>Log in</button>
  </form>
  )
}
