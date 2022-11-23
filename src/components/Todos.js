import React from 'react'
import { getMilliSeconds } from '../utils/getMilliSeconds'
import Todo from './Todo'

const Todos = (props) => {
    return (
        <div className='Todos'>
            {props.todos.sort((a,b)=>getMilliSeconds(a.date)-getMilliSeconds(b.date)).map((item) => <Todo key={item.id} info={item} />)}
        </div>
    )
}

export default Todos