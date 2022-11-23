import React from 'react'
import { Context } from '../context';
// import { enGB } from 'date-fns/locale'
// import { DatePickerCalendar } from 'react-nice-dates'
import DateTimePicker from 'react-datetime-picker'
import { dateFormat } from '../utils/dateFormat'
import { AiOutlineClose } from "react-icons/ai";
import { random } from '../utils/random'
import { FirebaseContext } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { checkExtension } from '../utils/checkExtension';



const EditModal = () => {
    const [todos, setTodos, selectedTodo, setSelectedTodo, editModalOpen, setEditModalOpen] = React.useContext(Context);
    const [date, setDate] = React.useState(new Date())
    const [title, setTitle] = React.useState()
    const [desc, setDesc] = React.useState()
    // const [openModal, setOpenModal] = React.useState(false)
    const { auth, firestore } = React.useContext(FirebaseContext)
    const [user, loading, error] = useAuthState(auth);
    const [image, setImage] = React.useState('');
    const [uploadState, setUploadState] = React.useState('Вы можете загрузить любые файлы');

    const [imgUrl, setImgUrl] = React.useState(null);

    const [boolTask, setBoolTask] = React.useState(false)
    const [files, setFiles] = React.useState([])
    const [url, setUrl] = React.useState('');







    const upload = () => {
        if (image == null)
            return;
        setUrl("Getting Download Link...")

        // Sending File to Firebase Storage
        var uploadTask = firebase.storage().ref(`/images/${image.name}`).put(image)
            .on("state_changed", (snap) => {
                setUploadState('Файл загружается...')


            }, console.log('file upload'), () => {



                // Getting Download Link
                firebase.storage().ref("images").child(image.name).getDownloadURL()
                    .then((url) => {

                        setFiles((f) => [...f, url])
                        setUploadState('Вы можете загрузить любые файлы')

                    })
            });


    }

    // React.useEffect(() => {
    //     setOpenModal(false)
    // }, [date])



    const reboot = () => {
        setTitle('')
        setDesc('')
        setDate()
        setFiles([])
    }

    const addNew = async () => {
        if (title && desc && date && auth) {
            setBoolTask(true)

            let id = random(0, 100000000000)
            let newTodo = {
                title: title,
                desc: desc,
                date: date.toString(),
                completed: false,
                id: id,
                docs: files
            }
            await firestore.collection(`user${user.uid}`).doc(id.toString()).set(newTodo)
                .then((docRef) => {
                    console.log('success')
                    setBoolTask(false)
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
            setTodos((past) => [...past, newTodo])
            reboot()

        }
    }
    const save = () => {

        if (title && desc && date) {
            setBoolTask(true)
            let newTodos = JSON.parse(JSON.stringify(todos))
            let newTodo = {
                title: title,
                desc: desc,
                date: date.toString(),
                completed: selectedTodo.completed,
                id: selectedTodo.id,
                docs: files
            }
            newTodos = newTodos.map((item) => item.id == selectedTodo.id ? newTodo : item)


            var oldRef = firestore.collection(`user${user.uid}`).doc(newTodo.id.toString());
            oldRef.update(newTodo)
                .then(() => {
                    console.log("Document successfully updated!");
                    setTodos(newTodos)
                    reboot()
                    setEditModalOpen(false)
                    setBoolTask(false)
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        }
    }

    const deleteDocument = (doc) => {
        var httpsReference = firebase.storage().refFromURL(doc)._delegate._location.path_
        setFiles(files.filter((f) => f != doc))
        firebase.storage().ref().child(httpsReference).delete().then(() => {
            console.log('file removed from database successful')
        }).catch((error) => {
            console.log('⛔ error:', error)
        });
    }

    React.useEffect(() => {
        if (editModalOpen.type == 'edit') {
            setTitle(selectedTodo.title)
            setDesc(selectedTodo.desc)
            setDate(new Date(selectedTodo.date))
            setFiles(selectedTodo.docs)
        }
        else {
            reboot()
        }

    }, [editModalOpen])

    return (
        <>
            {
                editModalOpen.state && <div
                    onClick={() => setEditModalOpen(false)}
                    className="modalEdit__wrap">

                    <div className="modalEdit">
                        {boolTask ? <div className="loader__ellipsis_wrap">
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div> :
                            <div>

                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="modalEdit__grid"
                                >
                                    <div className="modalEdit__Inputs">
                                        <input
                                            onChange={(e) => setTitle(e.target.value)}
                                            value={title}
                                            type="text" placeholder='Title...' />
                                        <input
                                            onChange={(e) => setDesc(e.target.value)}
                                            value={desc}
                                            type="text" placeholder='Description...' />
                                    </div>
                                    <div className="modalEdit__Timer">
                                        <div className="AddNewTodo__Modal">
                                            {/* <DatePickerCalendar date={date} onDateChange={setDate} locale={enGB} /> */}
                                            <DateTimePicker value={date} onChange={setDate} />
                                        </div>
                                        {/* <button
                                            className="modalEdit__Button_date"
                                            onClick={() => setOpenModal(true)}>{date ? dateFormat(date) : 'date'}</button>
                                        {
                                            openModal &&
                                        } */}

                                    </div>

                                    {editModalOpen.type == 'add' ? <button
                                        onClick={() => addNew()}
                                        className="modalEdit__Button"
                                    >
                                        Add new
                                    </button>
                                        :
                                        <button
                                            onClick={() => save()}
                                            className="modalEdit__Button"
                                        >
                                            Save
                                        </button>
                                    }



                                </div>

                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="modalEdit_w">
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="file__wrap"
                                    >
                                        <input type="file"
                                            onChange={(e) => { setImage(e.target.files[0]) }} />
                                        <button onClick={upload}>Upload</button>

                                        <div className="progressBar">
                                            <p>{uploadState}</p>
                                        </div>

                                    </div>
                                    <div>
                                        {files ? files.map((fileName, id) => <div key={id} className="image__wrap">
                                            <div className="image__delete">
                                                <AiOutlineClose
                                                    onClick={() => deleteDocument(fileName)}
                                                    className="imageIMG__delete" size={30} />
                                            </div>
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

                                </div>
                            </div>}



                    </div>
                </div>
            }
        </>

    )
}

export default EditModal