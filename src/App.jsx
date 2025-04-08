import './App.css'
import Main from './component/Main/Main'
import { TodoContextProvider } from './context/todoContext';
import { useEffect, useState,useMemo } from 'react';

function App() {
const backendUrl = import.meta.env.VITE_BACKEND_URL
  
const [todos,setTodos] = useState([]);
const [loading,setLoading] = useState(false)
const [error,setError] = useState(null)
const memoizedTodos = useMemo(() => todos, [todos]);

const getTodos = async ()=>{
  setError(null);
  setLoading(true)
  try {
    await fetch(`${backendUrl}/api/todo/all-todo`)
    .then(res=>res.json())
    .then(data=>{
      const tempArr = data.data.map((item)=>{
        return {...item,isLoading:false}
      })
      setTodos(tempArr);
      // console.log("tempArr",tempArr);
      // console.log("todos",memoizedTodos);
    });
  } 
  catch (error) {
    setError(error.message);
    console.log(error);
  }
  setLoading(false)
}

const addTodo =async (todo)=>{
  setError(null);
  setLoading(true)
  await fetch(`${backendUrl}/api/todo/create-todo`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      todoContent:todo
    })
  })
  .then((res)=>res.json())
  .then((data)=>{
    setTodos([...todos,data.data]);
  })
  .catch(error =>{
    setError(error.message);
    console.log("error while creating todo",error);
  })
  setLoading(false)
}

const removeTodo =async (id)=>{
  setError(null)
  setLoading(true)
  try {
    await fetch(`${backendUrl}/api/todo/delete-todo`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id})
    })
    .then((res)=>res.json())
    .then((data)=>{
      setTodos(todos.filter((todo)=>todo._id!==id));
    })
  } catch (error) {
    setError(error.message);
    console.log("Error while deleting todo",error); 
  }
  setLoading(false)
}

const toggleTodo =async (id,toggleValue)=>{
  setError(null)
  try {
    await fetch(`${backendUrl}/api/todo/toggle-todo`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id,isCompleted:toggleValue})
    })
    .then((res)=>res.json())
    .then((data)=>{
      // setTodos(todos.map((todo)=>todo._id===id ? todo.isCompleted=toggleValue : todo));
      setTodos((prev)=> prev.map((todo)=>todo._id===id ? {...todo
        ,isCompleted:toggleValue }: todo))
    })

  } catch (error) {
    setError(error.message);
    console.log("Error while updating toggle todo",error); 
  }
}

const updateTodo =async (id,updatedTodo)=>{
  setError(null);
  setLoading(true)
  try {
    await fetch(`${backendUrl}/api/todo/update-todo`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id,todoContent:updatedTodo})
    })
    .then((res)=>res.json())
    .then((data)=>{
      setTodos(todos.map((todo)=>todo._id===id ?{
        ...todo,
        todo:updatedTodo
      }: todo));

    })
  } catch (error) {
    setError(error.message);
    console.log("Error while updating todo",error); 
  }
  setLoading(false)
}


useEffect(()=>{
  // console.log("useEfffect works");
  ;(async ()=>{
    await getTodos();
    // await addTodo("Hello from frontend")
  })();

},[setTodos]);

  return (
    <>
      <TodoContextProvider value={{todos:memoizedTodos,setTodos,loading,addTodo,getTodos,removeTodo,toggleTodo,updateTodo,error}}>
      <div className='w-full h-full min-h-screen bg-[#181824]'>
        <Main/>
      </div>
      </TodoContextProvider>
    </>
  )
}

export default App
