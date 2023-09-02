import { signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"
import { auth } from './firebase.js'
import {removeSessionCookie} from "./validadores.js"

const logout = document.querySelector('#logout')

logout.addEventListener('click', async () => {
    removeSessionCookie();
    await signOut(auth)
})