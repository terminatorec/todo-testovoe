import React from 'react'
import { Context } from ".././context";
import { dateFormat } from '../utils/dateFormat';
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { BsCheckCircle, BsCircle } from 'react-icons/bs';
import { FirebaseContext } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { checkExtension } from '../utils/checkExtension';
import { getMilliSeconds } from '../utils/getMilliSeconds';



const Todo = (props) => {


    const [todos, setTodos, selectedTodo, setSelectedTodo, editModalOpen, setEditModalOpen] = React.useContext(Context);
    const { auth, firestore } = React.useContext(FirebaseContext)
    const [user, loading, error] = useAuthState(auth);

    const changeState = () => {
        let newArray = JSON.parse(JSON.stringify(todos))
        newArray.filter((f) => f.id == props.info.id)[0].completed = !props.info.completed


        var oldRef = firestore.collection(`user${user.uid}`).doc(props.info.id.toString());
        oldRef.update({ completed: !props.info.completed })
            .then(() => {
                console.log("Document successfully updated!");
                setTodos(newArray)
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    }

    const deleteTodo = () => {
        let newArray = JSON.parse(JSON.stringify(todos))
        setTodos(newArray.filter((f) => f.id !== props.info.id))

        firestore.collection(`user${user.uid}`).doc(props.info.id.toString()).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const editTodo = (info) => {
        setSelectedTodo(info)
        setEditModalOpen({ state: true, type: 'edit' })
    }


    return (
        <div
            className="Todo__wrap"
        // className={props.info.completed == true? 'Todo__wrap__completed'  : new Date().getTime() >= (getMilliSeconds(props.info.date))  ? 'Todo__wrap__failed' : 'Todo__wrap'}
        >
            {/* BsCircle */}
            {/* BsCheckCircle */}

            <div className='Todo'>
                <div
                    onClick={() => changeState()}
                    className={
                        props.info.completed == true ?
                            'Todo__state_button__success'
                            :
                            'Todo__state_button'

                    }
                // className="Todo__state_button"
                >
                    {
                        props.info.completed == true ?
                            <BsCheckCircle
                                size={30}
                            /> :
                            <BsCircle
                                size={30}
                            />
                    }

                </div>
                <div
                // onClick={() => changeState()}
                // style={props.info.completed == true ? { textDecoration: 'line-through' } : {}}
                >
                    <p className="Todo_title">
                        {props.info.title}
                    </p>
                    <p className="Todo_desc">
                        {props.info.desc}
                    </p>
                </div>
                <div>
                    <p
                        // className="Todo_time"
                        className={((props.info.completed == false) && (new Date().getTime() >= (getMilliSeconds(props.info.date)))) ? "Todo_time__lose" : "Todo_time"}
                    >
                        {props.info.date && dateFormat(props.info.date)}
                    </p>
                    <div className="Todo__edit_buttons">
                        <AiFillDelete onClick={() => deleteTodo()} size={20} className="icon" />
                        <AiFillEdit onClick={() => editTodo(props.info)} size={20} className="icon" />

                    </div>
                </div>
            </div>
            {props.info.docs ? props.info.docs.map((fileName, id) => <div key={id} className="image__wrap">
                {checkExtension(fileName) ?
                    <>
                        <img src={fileName} alt="" />
                        <a
                            className="imageIMG__delete_a"
                            target={'_blank'}
                            href={fileName}
                        >Link</a>
                    </>
                    :
                    <a
                        className="imageIMG__delete_a"
                        target={'_blank'}
                        href={fileName}
                    >Link</a>}

            </div>) : ''}
        </div>
    )
}

export default Todo