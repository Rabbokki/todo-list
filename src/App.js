import logo from './logo.svg';
import { useEffect, useState } from 'react';
import styles from "./css/App.module.css"
import axios from 'axios';
import { BrowserRouter, Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import About from './About/About'



function App() {
  const [menu, setMenu] = useState(["Home", "About"]);
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  
  function deleteTodo(i){
    const temp = [...todoList];
    temp.splice(i,1);
    setTodoList(temp);
    localStorage.setItem("title",JSON.stringify(temp));
  }

  function allDelete(){
    setTodoList([]);
    localStorage.removeItem("title");
    localStorage.setItem("title",JSON.stringify([]));
  }

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(response=>{
      console.log(response.data);
      const titles = response.data.map(x => x.title);
      localStorage.setItem('title',JSON.stringify(titles));
      setTodo(titles)
    })
    .catch(error => {
      console.log('axios 에러남' , error);
    })
  },[])

  function todoAdd(){
    const addTodo = [newTodo, ...todoList];
    setTodoList(addTodo);
    setNewTodo('');
    localStorage.setItem('title',JSON.stringify(addTodo));
    todoList.sort().reverse();
  }
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("title")) || null;
    setTodoList(todos);
  },[])
  let navigate = useNavigate();

  return (
    
    <div className={styles.app}>
      <div>
        <h1>TODO it!</h1>
      </div>
          <nav className={styles.menu}>
            {
              menu.map((x)=>(
                <button key={x}
                onClick={()=> navigate(x==="Home" ? "/" : "/about")}
                >{x}</button>
              ))
            }
          </nav>
     
      <ul>
        <li>
            <input type="text" value={newTodo} 
            onChange={
              (e)=>setNewTodo(e.target.value)
            }
            placeholder='Type what you have to do'/>
            <button onClick={todoAdd}>➕</button>
        </li>
      </ul>
      <div>
        <ul>
          {
            todoList?.map((x,i)=>{
              return (
              <div>
                <li key={i}>
                {x}
                <button onClick={()=>deleteTodo(i)}>🗑️</button>
                </li>
              </div>
              )
            })
          }
        </ul>
        <div>
          <button onClick={allDelete}>Clear All</button>
        </div>
        
      </div>
    </div>
  );
}


export default App;
