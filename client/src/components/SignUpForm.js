import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import URL from '../URL/URL';

export const SignUpForm = () => {
  const [value, setValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const addUser = async () => {
    try {
      const response = await fetch(URL + 'signup', {
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
        
      } else if(json.message==="done"){
        
        setValue({ email: "", password: "" });
        alert("user added")
        navigate("/signin");
      } else if (json.message === "error") {
        alert("some error occure")
      }
    
    } catch (error) {
      console.log('error', error);
    }
  };

    const handleSubmit = (e) => {
    
      e.preventDefault();
      if (value.email !== "" || value.password !== "") {
        addUser()
      } else {
        alert("kindly fill All fields");
      }
      
       
      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm flex">
      
      <input type="email" value={value.email} onChange={(e) => setValue({...value ,email: e.target.value})} className="todo-input" placeholder='Enter your E-mail' />
    <input type="password" value={value.password} onChange={(e) => setValue({...value,password: e.target.value})} className="todo-input" placeholder='Enter your Password' />
    <button type="submit" className='todo-btn'>Sign Up</button>
  </form>
  )
}
