import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-datetime-picker/dist/DateTimePicker.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Helmet } from "react-helmet";
import 'firebase/compat/auth';

const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyDaUgdw94POVNLLLLnweaa9HRp4f9hpVOY",
        authDomain: "test-todo-1de6d.firebaseapp.com",
        projectId: "test-todo-1de6d",
        storageBucket: "test-todo-1de6d.appspot.com",
        messagingSenderId: "659409719760",
        appId: "1:659409719760:web:9fbef39a71b105a89329d5",
        measurementId: "G-K6SXB4RLH1"
    }
)

export const FirebaseContext = React.createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <FirebaseContext.Provider value={{
        firebase,
        firestore,
        auth
    }}>
        <Helmet>
            <title>Test todo</title>
            <meta name="description" content="Тестовое задание на вакансию javascript frontend" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
        </Helmet>
        <App />

    </FirebaseContext.Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
