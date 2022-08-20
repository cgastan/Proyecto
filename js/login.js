function alertaEmail() {
    document.getElementById("email0").innerHTML = `Ingresa tu e-mail`;
    document.getElementById("email").style.borderColor = "red";
}
function alertaContrasena() {
    document.getElementById("pass0").innerHTML = `Ingresa tu contraseña`;
    document.getElementById("contrasena").style.borderColor = "red";
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("ingresar").addEventListener("click", function () {
        let email = document.getElementById("email").value;
        let password = document.getElementById("contrasena").value;
        let datosCompletos = true;
        if (email == "") {
            datosCompletos = false;
            alertaEmail()
        }
        if (password == "") {
            datosCompletos = false;
            alertaContrasena();
        }
        if (datosCompletos) {
            window.location = "portada.html";
        }
    })
})