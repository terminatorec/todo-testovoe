import './App.css';
// import 'react-nice-dates/build/style.css'
import Todos from './components/Todos';
import React from 'react'
import AddNewTodo from './components/AddNewTodo';
import { Context } from './context';
import EditModal from './components/EditModal';
import Login from './components/Login';
// import { FirebaseContext } from './';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseContext } from '.';

function App() {

    const { auth, firestore } = React.useContext(FirebaseContext)
    const [user, loading, error] = useAuthState(auth);
    const [isLoading, setIsLoading] = React.useState(false);

    const baseTodos = [
        {
            title: 'Помыть посуду',
            desc: 'Посуда грязная, не мыли 3 дня',
            date: new Date(2023, 2, 1, 1, 10),
            id: 0,
            completed: false,
            docs: [
                'https://res.cloudinary.com/dpsjoqwvr/image/upload/v1669017115/Screenshot_2022-11-21_at_16-51-31_%D0%9C%D0%B8%D0%BA%D1%80%D0%BE%D0%B2%D0%BE%D0%BB%D0%BD%D0%BE%D0%B2%D0%B0%D1%8F_%D0%BF%D0%B5%D1%87%D1%8C_Samsung_MG23J5133AK_BW_%D1%87%D0%B5%D1%80%D0%BD%D1%8B%D0%B9_%D0%BA%D1%83%D0%BF%D0%B8%D1%82%D1%8C_mmrduq.png'
            ]
        },
        {
            title: 'Почесать кота',
            desc: 'Чешется',
            date: new Date(2024, 2, 1, 1, 10),
            completed: false,
            id: 1,
            docs: [
                'https://res.cloudinary.com/dpsjoqwvr/image/upload/v1669017115/Screenshot_2022-11-21_at_16-51-31_%D0%9C%D0%B8%D0%BA%D1%80%D0%BE%D0%B2%D0%BE%D0%BB%D0%BD%D0%BE%D0%B2%D0%B0%D1%8F_%D0%BF%D0%B5%D1%87%D1%8C_Samsung_MG23J5133AK_BW_%D1%87%D0%B5%D1%80%D0%BD%D1%8B%D0%B9_%D0%BA%D1%83%D0%BF%D0%B8%D1%82%D1%8C_mmrduq.png'
            ]
        },
        {
            title: 'Сварить покушать',
            desc: 'Голодный',
            date: new Date(2025, 2, 1, 1, 10),
            completed: false,
            id: 2,
            docs: [
                'https://res.cloudinary.com/dpsjoqwvr/image/upload/v1669017115/Screenshot_2022-11-21_at_16-51-31_%D0%9C%D0%B8%D0%BA%D1%80%D0%BE%D0%B2%D0%BE%D0%BB%D0%BD%D0%BE%D0%B2%D0%B0%D1%8F_%D0%BF%D0%B5%D1%87%D1%8C_Samsung_MG23J5133AK_BW_%D1%87%D0%B5%D1%80%D0%BD%D1%8B%D0%B9_%D0%BA%D1%83%D0%BF%D0%B8%D1%82%D1%8C_mmrduq.png'
            ]
        },
    ]


    const [todos, setTodos] = React.useState(baseTodos)

    React.useEffect(() => {
        if (user) {
            firestore.collection(`user${user.uid}`).get().then((querySnapshot) => {
                // console.log(querySnapshot)
                let newArray = []
                querySnapshot.forEach((doc) => {
                    newArray.push(doc.data())
                    // console.log(doc.data());
                });
                if (newArray.length == 0) {
                    setTodos([])
                }
                else {
                    setTodos(newArray)
                }
                setIsLoading(true)
            });

        }

    }, [user])
    const [selectedTodo, setSelectedTodo] = React.useState()
    const [editModalOpen, setEditModalOpen] = React.useState({ state: false, type: 'add' })



    return (
        <Context.Provider value={[todos, setTodos, selectedTodo, setSelectedTodo, editModalOpen, setEditModalOpen]}>


            <Login />
            {user && <>
                {isLoading ?
                    <Todos todos={todos} setTodos={setTodos} />
                    :
                    <div className="loader_wrap">
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                }
                <AddNewTodo setTodos={setTodos} />
                <EditModal />
            </>}



        </Context.Provider>



    );
}

export default App;
