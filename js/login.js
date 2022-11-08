
 let usuario={
    primerNombre:``,
    segundoNombre:``,
    primerApellido:``,
    segundoApellido:``,
    mail:undefined,
    telContacto:``,
   

};

document.addEventListener("DOMContentLoaded", function () {

  let email = document.getElementById("email");
 

    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
                if (document.getElementById("loginForm").checkValidity()) {
                    event.preventDefault();
                    usuario.mail= email.value;
                    localStorage.setItem("usuario",JSON.stringify(usuario));
                    window.location = "portada.html";
                }
            }, false)
        }

        );

    }
    )()
})
