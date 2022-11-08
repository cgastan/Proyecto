let user=localStorage.getItem("usuario");
let perfil=JSON.parse(user);
let userProfileHTML=``;

if (!user) {
    document.getElementById("alertNoUser").classList.add("show");
    document.getElementById("profContent").style.display = "none";
  }
  function redirect() {
    window.location = "index.html";
  }

    document.addEventListener("DOMContentLoaded", function () {
    userProfileHTML=`<div class="col-md-6">
    <label for="primerNombre" class="form-label">Primer nombre*</label>
    <input type="text" class="form-control" id="primerNombre" value="${perfil.primerNombre}" required>
    <div class="invalid-feedback">
      Debe completar este campo
    </div>
  </div>
  <div class="col-md-6">
    <label for="segundoNombre" class="form-label">Segundo nombre</label>
    <input type="text" class="form-control" id="segundoNombre" value="${perfil.segundoNombre}">
  </div>
  <div class="col-md-6">
    <label for="primerApellido" class="form-label">Primer apellido*</label>
    <input type="text" class="form-control" id="primerApellido" value="${perfil.primerApellido}" required>
    <div class="invalid-feedback">
      Debe completar este campo
    </div>
  </div>
  <div class="col-md-6">
    <label for="segundoApellido" class="form-label">Segundo apellido</label>
    <input type="text" class="form-control" id="segundoApellido" value="${perfil.segundoApellido}">
  </div>
  <div class="col-md-6">
    <label for="inputEmailUsuario" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmailUsuario" value="${perfil.mail}">
  </div>
  <div class="col-md-6">
    <label for="telefonoContacto" class="form-label">Teléfono de contacto*</label>
    <input type="tel" class="form-control" inputmode="numeric" id="telefonoContacto" minlength="9"
      maxlength="14" value="${perfil.telContacto}" required>
    <div class="invalid-feedback">
      Debe completar este campo
    </div>
  </div>`
    document.getElementById("userProfile").innerHTML=userProfileHTML;

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
            if (document.getElementById("userProfile").checkValidity()){
                saveData();
              }
          }, false)
        })
      })()

      function saveData(){
      perfil.primerNombre=document.querySelector("#primerNombre").value;
      perfil.segundoNombre=document.querySelector("#segundoNombre").value;
      perfil.primerApellido=document.querySelector("#primerApellido").value;
      perfil.segundoApellido=document.querySelector("#segundoApellido").value;
      perfil.mail=document.querySelector("#inputEmailUsuario").value;
      perfil.telContacto=document.querySelector("#telefonoContacto").value;
      localStorage.setItem("usuario",JSON.stringify(perfil));
      }

  })