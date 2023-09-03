import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { validarCorreo } from "./validadores.js";
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";

const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = signupForm["signup-email"].value;
  if (!validarCorreo(email)) {
    showMessage("Formato de correo invalido", "error");
    return;
  }
  const password = signupForm["signup-password"].value;
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //location.replace('http://127.0.0.1:5500/home.html')
    window.location.href = "home.html";
  } catch (error) {
    if (error.code === "auth/invalid-email") {
      showMessage("Credenciales Incorrectas", "error");
    } else if (error.code === "auth/weak-password") {
      showMessage("Contraseña debil", "error");
    } else if (error.code === "auth/email-already-in-use") {
      showMessage("Usuario ya existente", "error");
    } else {
      alert(error.code);
      showMessage(error.code, "error");
    }
  }
});
