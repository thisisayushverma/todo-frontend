import { createContext ,useContext} from "react";


const todoContext = createContext({
    todos:[],
    loading:false,
    getTodos:()=>{},
    addTodo:(todo)=>{},
    removeTodo:(id)=>{},
    updateTodo:(id,updatedTodo)=>{},
    toggleTodo:(id)=>{},
    error:""
});


export const useTodo = ()=>{
    return useContext(todoContext);
}

export const TodoContextProvider = todoContext.Provider