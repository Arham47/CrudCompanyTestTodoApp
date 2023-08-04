import React, { useEffect, useState } from "react";
import { Todo } from "../components/Todo";
import { TodoForm } from "../components/TodoForm";
import { EditTodoForm } from "../components/EditTodoForm";
import URL from "../URL/URL";
import { useNavigate } from "react-router-dom";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodo = async () => {
    try {
      const response = await fetch(URL + "gettodo", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ adminID: localStorage.getItem("adminID") }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        credentials: "include",
      });

      const json = await response.json();
      if (json.message === "signout") {
        localStorage.removeItem("adminID")
        navigate("/")

      } else {
        console.log(json);
        setTodos(json);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const navigate = useNavigate;
  useEffect(() => {
    if (localStorage.getItem("adminID") === undefined) {
      navigate("/")
    } else {
      
      fetchTodo();
    }
  }, []);

  const addTodo = async (todo) => {
    try {
      const response = await fetch(URL + "addtask", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          adminID: localStorage.getItem("adminID"),
          task: todo,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        credentials: "include",
      });

      const json = await response.json();
      if (json.message === "signout") {
        localStorage.removeItem("adminID")
        navigate("/")
      } else {
        console.log(json);
        setTodos([...todos, json]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(URL + "deletetask", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          adminID: localStorage.getItem("adminID"),
          id: id,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        credentials: "include",
      });

      const json = await response.json();
      if (json.message === "signout") {
        localStorage.removeItem("adminID")
        navigate("/")

      } else {
        console.log(json);
        fetchTodo();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleComplete =async (id,completed) => {
    try {
      const response = await fetch(URL + "completetask", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          adminID: localStorage.getItem("adminID"),
          id: id,
          completed
       
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        credentials: "include",
      });

      const json = await response.json();
      if (json.message === "signout") {
        localStorage.removeItem("adminID")
        navigate("/")

      } else {
        console.log(json);
        fetchTodo();
      }
    } catch (error) {
      console.log("error", error);
    }
  
   
  };

  const editTodo =  (id) => {

    setTodos( todos.map((todo) =>  todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo ))
    
 
  
  };

  const editTask =async (task, id) => {
    try {
      const response = await fetch(URL + "updatetask", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          adminID: localStorage.getItem("adminID"),
          id: id,
          task:task
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        credentials: "include",
      });

      const json = await response.json();
      if (json.message === "signout") {
        localStorage.removeItem("adminID")
        navigate("/")

      } else {
        console.log(json);
        fetchTodo();
      }
    } catch (error) {
      console.log("error", error);
    }
   

    
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {console.log(todos)}

      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  )
};
