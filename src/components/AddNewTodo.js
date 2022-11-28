import React from 'react'
import { Context } from '../context'
import {AiOutlinePlus } from "react-icons/ai";



const AddNewTodo = (props) => {

   

    const [todos, setTodos, selectedTodo, setSelectedTodo, editModalOpen, setEditModalOpen] = React.useContext(Context);

    return (
        <div onClick={() => setEditModalOpen({ state: true, type: 'add' })} className="AddNewTodo">
            <AiOutlinePlus  size={40}/>
            
            {/* <button
                onClick={() => setEditModalOpen({ state: true, type: 'add' })}
                className="AddNewTodo__Button">
                Add new
            </button> */}
        </div>
    )
}

export default AddNewTodo