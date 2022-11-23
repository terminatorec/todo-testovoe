import React from 'react'
import firebase from 'firebase/compat/app';
import { FirebaseContext } from '..'
import { useAuthState } from 'react-firebase-hooks/auth';


const Login = () => {
    const { auth } = React.useContext(FirebaseContext)
    const [user, loading, error] = useAuthState(auth);

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const { user } = await auth.signInWithPopup(provider)
        
    }
    return (
        <div className="loginpage">
            
            {user ? <button onClick={() => auth.signOut()}>Выйти</button> :
                <button onClick={() => login()}>
                    Войти с помощью Google
                </button>}
            {user && <p>Ваш email: {user.email}</p>}

        </div>
    )
}

export default Login