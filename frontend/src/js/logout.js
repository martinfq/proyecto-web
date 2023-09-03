import { signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"
import { auth } from './firebase.js'
import {removeCookie} from "./validadores.js"

const logout = document.querySelector('#logout')

logout.addEventListener('click', async () => {
    removeCookie("ci_session");
    try{removeCookie("admin_cookie"); }
    catch(error){}
    await signOut(auth)
})