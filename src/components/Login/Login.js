import React from "react";
import "./Login.css";
import {auth, provider} from "../../firebase";
import {useStateValue} from "../../StateProvider";
import {actionTypes} from "../../reducer";


function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch((error) => alert(error.message))
    };

    return (
        <div className="login">
            {/*<h1>Chat_App_Logo_Here</h1>*/}
            <div className="login_container">
                <h1>Sign In to Chat_App</h1>
                <button onClick={signIn} className="signInBtn">
                    Sign In With Google
                </button>
            </div>
        </div>
    )
}

export default Login
