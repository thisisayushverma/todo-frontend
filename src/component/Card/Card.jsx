import React, { useCallback, useEffect, useState } from 'react'
import checkedIcon from '../../assets/icon-check.svg'
import crossIcon from "../../assets/icon-cross.svg"
import { useTodo } from '../../context/todoContext';
import SmallLoading from '../Loading/SmallLoading';

function Card({item}) {
  const {toggleTodo,removeTodo,updateTodo}= useTodo();
  const [loader,setLoader] = useState(false);
  const [isEditable,setIsEditable] = useState(false);
  const [localText,setLocalText] = useState(item.todo);
  const uniqueId = `check-box-${item._id}`
  const handleChangeStatus =async (id,partItem,setLoader)=>{
    setLoader(true)
    await toggleTodo(id,!partItem.isCompleted)
          .then((result) => {
            console.log(result);
          }).catch((err) => {
            console.log(err);
          });
    setLoader(false)
  }


  const handleRemove =async ()=>{
    setLoader(true)
    await removeTodo(item._id)
    .then((result) => {
      console.log(result);
    })
    setLoader(false)
  }
  return (
    <div className='p-5 flex align-center items-center gap-5 justify-between border-t-1 border-[#9394a5]'>
      <label htmlFor={uniqueId} className='flex items-center justify-center relative'>
        <input type="checkbox"  id={uniqueId} 
        onClick={()=> {handleChangeStatus(item._id,item,setLoader)}}
        value={item.isCompleted} className=" appearance-none w-6 h-6 border-1 border-[#3d3f54] rounded-full  
        checked:bg-gradient-to-br from-[#20d3fc] to-[#973efc] checked:border-none cursor-pointer">
        </input>
          <img src={checkedIcon} className={`m-1 absolute  ${item.isCompleted?"block":"hidden"} `}/>
      </label>

      {
        isEditable && (!item.isCompleted)? (
          <input value={localText} onChange={(e)=>{setLocalText(e.target.value)}}
          onKeyDown={async (e)=>{
            if(e.key==="Enter"){
              setIsEditable((prev)=>!prev)
              setLoader(true);
              await updateTodo(item._id,localText)
              .then(result => {
                console.log(result);
              })
              setLoader(false);
            }
          }}
          className={` w-full rounded-sm p-2 border text-xl  ${item.isCompleted?"line-through text-[#3d3f54]":"text-[#fafafa]"}`} />
        ) : (
          <p className={`text-xl  w-full rounded-sm p-2  ${item.isCompleted?"line-through text-[#3d3f54]":"text-[#fafafa]"}`} onDoubleClick={()=>{setIsEditable((prev)=>!prev)}}>{item.todo}</p>
        ) 
      }

      {/* <input type='text' disabled={isDisable} onDoubleClick={()=>{
        console.log("double clicked");
        setIsDisable((prev)=>!prev)}} value={localText} onChange={(e)=>{setLocalText(e.target.value)}} className={`border text-xl  ${item.isCompleted?"line-through text-[#3d3f54]":"text-[#fafafa]"}`}  /> */}
      {/* <p className={`text-xl  ${item.isCompleted?"line-through text-[#3d3f54]":"text-[#fafafa]"}`}>{item.todo}</p> */}
      {
        loader?<SmallLoading/>:<img src={crossIcon} onClick={()=>{handleRemove()}} className='h-4 w-4 cursor-pointer'/>
      }
      
    </div>
  )
}

export default Card
