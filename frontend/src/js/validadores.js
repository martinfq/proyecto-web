export function validarCorreo(email){
    const patronCorreo = /^[\w.-]+@(gmail\.com|outlook\.com|hotmail\.com|epn\.edu\.ec)$/i;
    return patronCorreo.test(email);
}

export function setSessionCookie(){
    var nombreCookie = "ci_session";
    var valorCookie = "autenticado";
    var fechaExpiracion = new Date(); 
    fechaExpiracion.setTime(fechaExpiracion.getTime() + 60 * 60 * 1000);
    var camino = "/";

    document.cookie = `${nombreCookie}=${valorCookie}; expires=${fechaExpiracion.toUTCString()}; path=${camino}`;
}

export function removeSessionCookie() {
    document.cookie = "ci_session" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }