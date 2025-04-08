import React,{memo, useEffect, useMemo, useState} from 'react'
import { useTodo } from '../../context/todoContext.js'
import bgImage from '../../assets/bg-desktop-dark.jpg'
import sunIcon from '../../assets/icon-sun.svg'
import Card from '../Card/Card.jsx'
import Error from '../Error/Error.jsx'
import SmallLoading from '../Loading/SmallLoading.jsx'

function Main() {
  const { todos, loading,addTodo,error } = useTodo();
  const [inputTodo, setInputTodo] = useState("");
  const [category,setCategory] = useState("all");
  const addTodoHandler = (e)=>{
    e.preventDefault();
    if(inputTodo!==""){
      addTodo(inputTodo);
      setInputTodo("");
    }
  }


  const handleRadioButton = (e)=>{
    setCategory(e.target.value);  
  }

  const handleInputTodo = (e)=>{
    setInputTodo(e.target.value);
  }





  const todoListHandler = useMemo(()=>{
    return( 
      <>
        {
        todos.length !== 0 ? (
          <div className='p-3 flex justify-center items-center gap-4'>
            <label>
              <input type='radio' name='task-option' value="all"  className='peer hidden' onChange={handleRadioButton}  checked={category==="all"}/>
              <span className={` hover:text-[#d2d3db] font-bold cursor-pointer ${category==="all"?"text-[#637fc1]":"text-[#9394a5]"} `}>All Task</span>
            </label>
            <label htmlFor='active-option'>
              <input id='active-option' type='radio' name='task-option'  value="active" className='peer hidden' checked={category==="active"} onChange={handleRadioButton} />
              <span className={` hover:text-[#d2d3db] font-bold cursor-pointer ${category==="active"?"text-[#637fc1]":"text-[#9394a5]"}`}>Active</span>
            </label>
            <label htmlFor='completed-option'>
              <input id='completed-option' type='radio' name='task-option'  value="completed" checked={category==="completed"} className='peer hidden' onChange={handleRadioButton}/>
              <span className={` hover:text-[#d2d3db] font-bold cursor-pointer ${category==="completed"?"text-[#637fc1]":"text-[#9394a5]"}`}>Completed</span>
            </label>
          </div>
        ) : null
      }
        {
          todos.map((item) => {
            if(category==="active" && !item.isCompleted){
            return <Card key={item._id} item={item} />
            }
            else if(category==="completed" && item.isCompleted){
              return <Card key={item._id} item={item} />
            }
            else if(category==="all"){
              return <Card key={item._id} item={item} />
            }
        })
      }
      
      </>
  )
  },[todos,category])

  
  // useEffect(()=>{
  //   if(category==="all"){
  //     setTempData([...todos]);
  //   }
  //   else if(category==="active"){
  //     setTempData(todos.filter((item)=>!item.isCompleted));
  //   }
  //   else if(category==="completed"){
  //     setTempData(todos.filter((item)=>item.isCompleted));
  //   }
  // },[category,todos])

  return (
    <div className=' h-full  flex justify-center bg-no-repeat ' style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "100vw 40vh ", repeat: "no-repeat" }} >
      <div className='align-center w-[50%] flex flex-col my-[8vh] h-fit gap-10'>

        <div className='pt-5  flex justify-between items-center'>
          <h1 className='text-5xl font-bold text-[#e4e5f1] tracking-[1.5rem]'>TODO</h1>
          <button><img className='h-10' src={sunIcon} /></button>
        </div>

        <form className='w-full flex items-center gap-4 justify-around px-5 py-1 bg-[#25273c] rounded-md ' onSubmit={addTodoHandler}>
          <input type="text" placeholder='Create a new todo...' className='h-15 p-5 outline-none text-[#fafafa] rounded-md text-2xl w-full bg-[#25273c]' value={inputTodo} onChange={handleInputTodo} />
          {
            loading? <SmallLoading /> : null
          }
        </form>
        {
          // loading ? <Loading /> : (
          //   <div className='bg-[#25273c] rounded-md'>
          //     {
          //       todos && todos.map((item) => {
          //         console.log("hello");
          //         return <Card key={item._id} status={item.isCompleted} todos={item.todo} />
          //       })
          //     }
          //     {
                // todos.length !== 0 ? (
                //   <div className='p-3 flex justify-center items-center gap-4'>
                //     <label>
                //       <input type='radio' name='task-option' defaultChecked={true} className='peer appearance-none' />
                //       <span className={`text-[#9394a5] hover:text-[#d2d3db] font-bold cursor-pointer peer-checked:text-[#637fc1] `}>All Task</span>
                //     </label>
                //     <label>
                //       <input type='radio' name='task-option' className='peer appearance-none' />
                //       <span className={`text-[#9394a5] hover:text-[#d2d3db] font-bold cursor-pointer peer-checked:text-[#637fc1]`}>Active</span>
                //     </label>
                //     <label>
                //       <input type='radio' name='task-option' className='peer appearance-none' />
                //       <span className={`text-[#9394a5] hover:text-[#d2d3db] font-bold cursor-pointer peer-checked:text-[#637fc1]`}>Completed</span>
                //     </label>
                //   </div>
                // ) : null
          //     }
          //   </div>
          // )
        }

            <div className='bg-[#25273c] rounded-md'>
              {
                error!==null ? <Error message={error}/> : todos && todoListHandler
              }
            </div>
       
      </div>
    </div>
  )
}

export default Main
