export function validarCorreo(email){
    const patronCorreo = /^[\w.-]+@(gmail\.com|outlook\.com|hotmail\.com|epn\.edu\.ec)$/i;
    return patronCorreo.test(email);
}

