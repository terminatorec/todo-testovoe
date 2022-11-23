import React from 'react'
import { Context } from '../context'



const AddNewTodo = (props) => {

   

    const [todos, setTodos, selectedTodo, setSelectedTodo, editModalOpen, setEditModalOpen] = React.useContext(Context);

    return (
        <div className="AddNewTodo">
            <button
                onClick={() => setEditModalOpen({ state: true, type: 'add' })}
                className="AddNewTodo__Button">
                Add new
            </button>
        </div>
    )
}

export default AddNewTodo