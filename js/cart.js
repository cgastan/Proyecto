const CART_25801_URL = CART_INFO_URL + "25801.json";
let cartInfo = ``;
let htmlContentToAppend = ``;
let htmlFormToAppend = ``;
let cantModificada = undefined;
let cantSubtotal = undefined;
let priceHtml = ``;
let htmlCostToAppend = ``;
let totalCost = undefined;
let costoEnvio = 0;
let paymentHtml=``;
let buttonHTML= ``;



document.addEventListener("DOMContentLoaded", async function (e) {
  getJSONData(CART_25801_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cartInfo = resultObj.data.articles;
      showCartInfo(cartInfo);
      showForm();
      showCost(cartInfo);
      showPaymentOptions();
      pagoValidity();
    }
  })

  function showCartInfo(array) {
    htmlContentToAppend = `
    <div class="text-center p-4">
        <h2>Carrito de compras</h2>
            <p class="text-start fs-5">Artículos a comprar</p>
    </div>
    <div class="table-responsive">
    <table class="table">
  <thead>`
    for (let article of array) {
      if(article.currency=="UYU"){
        article.unitCost=article.unitCost/40;
        article.currency= "USD";
      };
      cantSubtotal = article.count * article.unitCost;
      htmlContentToAppend += `
    <tr>
      <th scope="col"></th>
      <th scope="col">Nombre</th>
      <th scope="col">Costo</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Subtotal</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
    <tr>
        <th scope="row"><img src="${article.image}" class="mini-img"></th>
      <td>${article.name}</td>
      <td>${article.currency} ${article.unitCost}</td>
      <td><input id="countInput" type="number" name="countInput" class="form-control" required value="${article.count}" oninput="subtotal(${article.count},${article.unitCost})" min="1"
      </td>
      <td><strong>${article.currency}</strong> <strong id="precioPorCant"> ${cantSubtotal} </strong></td>
    </tr>
    <div class="valid-tooltip"></div>
    <div class="invalid-tooltip">
      Seleccione una cantidad.
    </div>`};
    htmlContentToAppend += `
  </tbody>
</table>
  </div>
  <hr>
        `;

    document.getElementById("cartForm").innerHTML = htmlContentToAppend;
    




  }


  function showForm() {

    htmlFormToAppend = `
        <div class="text-center p-4">
          <p class="text-start fs-5">Tipo de envío</p>
          
          <div class="input-group" id="envioRadio" >
           <div class="form-check" name="envioRadiop" required onchange="actualizarCostos()"  >
              <input class="form-check-input mt-0" type="radio" name="envio" value="15" aria-label="Premium" required>
              <label for="premium" class="form-check-label" >Premium 2 a 5 días (15%)</label>
              
            <br>
              <input class="form-check-input mt-0" type="radio" name="envio" value="7" aria-label="Express" required>
              <label for="express" class="form-check-label">Express 5 a 8 días (7%)</label>
              
            <br>
              <input class="form-check-input mt-0" type="radio" name="envio" value="5" aria-label="Standard" required>
              <label for="standard" class="form-check-label">Standard 12 a 15 días (5%)</label>
              <div class="valid-feedback"></div>
              <div class="invalid-feedback">
              Seleccione un método de envío
              </div>
           </div>
          </div>
        </div>
        <div class="text-center p-4">
        <p class="text-start fs-5">Dirección de envío</p>
        <div class="form-group row g-3" required>
        <div class="col-md-6">
          <label for="calle" class="form-label">Calle</label>
          <input class="form-control" id="calle" type="text" required>
          <div class="valid-feedback"></div>
              <div class="invalid-feedback">
              Ingrese una calle
              </div>
        </div>
        <div class="col-md-3">
          <label for="numero class="form-label">Número</label>
          <input class="form-control" id="numero" type="number" min="0" required>
          <div class="valid-feedback"></div>
              <div class="invalid-feedback">
              Ingrese un número
              </div>
        </div>
        <div class="col-md-6">
          <label for="esquina" class="form-label">Esquina</label>
          <input class="form-control" id="esquina" type="text" required >
          <div class="valid-feedback"></div>
              <div class="invalid-feedback">
              Ingrese una esquina
              </div>
        </div>
      </div>
      </div>
      <hr>      
  `;
    document.getElementById("cartForm").innerHTML += htmlFormToAppend;
  }

  function showCost(array) {
    htmlCostToAppend = `
    <div class="p-4">
    <p class="text-start fs-5">Costos</p>
    <div class="list-group">`;
    for (let article of array) {
      htmlCostToAppend += `
    <li class="list-group-item" aria-current="true">
      <div class="d-flex w-100 justify-content-between">
        <p class="mb-1">Subtotal</p>
        <small class="text-muted" id="subTotal">USD ${article.count*article.unitCost}</small>
      </div>
      <p class="mb-1 text-muted">Costo unitario del producto por cantidad</p>
    </li>
    <li class="list-group-item ">
      <div class="d-flex w-100 justify-content-between">
        <p class="mb-1">Costo de envío</p>
        <small class="text-muted" id="envioCosto"></small>
      </div>
      <p class="mb-1 text-muted">Según el tipo de envío</p>
    </li>
    <li class="list-group-item ">
      <div class="d-flex w-100 justify-content-between">
        <p class="mb-1">Total ($)</p>
        <small class="fw-bold" id="totalCost">USD  ${cantSubtotal+costoEnvio}</small>
      </div>
    </li>
  </div>
  <hr>
    `;
      document.getElementById("cartForm").innerHTML += htmlCostToAppend;   
    }
  }

  function showPaymentOptions(){
   paymentHtml=`
   <p class="text-start fs-5">Forma de pago</p>

   <p id="metPag">No ha seleccionado</p> <a href="" data-bs-toggle="modal" data-bs-target="#myModal"> Seleccionar</a></p>
   <div class="text-danger" id="alertaSinPago"></div> 
   <div class="modal" tabindex="-1" id="myModal">
       <div class="modal-dialog">
           <div class="modal-content">
               <div class="modal-header">
                   <h5 class="modal-title fw-bold">Forma de pago</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
                   <div class="form-check" required onchange="desabilitar()">
                       <input class="form-check-input" type="radio" name="metodoPago" id="metodo1" value="1" required>
                       <label class="form-check-label" for="metodo1">Tarjeta de crédito
                           <hr>
                           <div class="form-group row" id="formTarjeta">
                               <div class="w-50">
                                   <label for="numTarjeta" class="form-label">Número de tarjeta</label>
                                   <input class="form-control" id="numTarjeta" type="number" min="0" required>
                                   <div class="valid-feedback"></div>
                                   <div class="invalid-feedback">
                                   Ingrese un número de tarjeta
                                   </div>
                               </div>
                               <div class="w-auto">
                                   <label for="codSeguridad" class="form-label">Código de seg.</label>
                                   <input class="form-control" id="codSeguridad" type="number" min="0" required>
                                   <div class="valid-feedback"></div>
                                   <div class="invalid-feedback">
                                   Ingrese un código de seguridad
                                   </div>
                               </div>
                               <div class="w-50">
                                   <label for="vencimiento" class="form-label">Vencimiento (MM/AA)</label>
                                   <input class="form-control" id="vencimiento" type="month" required>
                                   <div class="valid-feedback"></div>
                                   <div class="invalid-feedback">
                                   Ingrese un vencimiento
                                   </div>
                               </div>
                           </div>
                       </label>
                   
                   </div>
                   <hr>
                   <div class="form-check" onchange="desabilitar()">
                       <input class="form-check-input" type="radio" name="metodoPago" id="metodo2" value="2" required>
                       <label class="form-check-label" for="metodo2">Transferencia bancaria</label>
                       <hr>
                       <div class="w-50">
                           <label for="numCuenta">Número de cuenta</label>
                           <input class="form-control" id="numCuenta" name="numCuenta" type="number" min="0" required>
                           <div class="valid-feedback"></div>
                           <div class="invalid-feedback">
                           Ingrese un número de cuenta
                           </div>
                       </div>
   
                   </div>
               </div>
               <div class="modal-footer">
                   <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
               </div>
           </div>
       </div>
   </div>
   <div class="d-grid gap-2">
       <button class="btn btn-primary" type="submit" form="cartForm" onsubmit="return false">Finalizar compra</button>
   </div>
   <div class="alert alert-success collapse alert-dismissible" role="alert" id="succesAlert" >
   ¡Has comprado con éxito!
   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
   
   document.getElementById("cartForm").innerHTML += paymentHtml;
  }
  
  (() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
      cantValidity();
      pagoValidity();
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
        if (document.getElementById("cartForm").checkValidity()){
          showSucessAlert();
          event.preventDefault()
        }
      }, false)
    }
    
    );

  }
  )()
  
  function showSucessAlert(){
    document.getElementById("succesAlert").classList.add("show");
  }

})

function subtotal(artCount, artUnitPrice) {
  let cantModificada = Number(document.getElementById("countInput").value);
  if (cantModificada !== artCount) {
    cantSubtotal = cantModificada * artUnitPrice;  
  };
  document.getElementById("precioPorCant").innerHTML = cantSubtotal;
  actualizarCostos();
}

function actualizarCostos(){
  document.getElementById('subTotal').textContent = `USD ` + cantSubtotal;
  if(document.querySelector('input[name="envio"]:checked') !=null){
  let selectedOption=document.querySelector('input[name="envio"]:checked').value;
  let costoEnvio = (selectedOption* cantSubtotal) / 100;
  let totalCost=cantSubtotal+costoEnvio;
   document.getElementById('envioCosto').textContent = `USD ` + costoEnvio;
   document.getElementById(`totalCost`).textContent = `USD` + totalCost;
 }if (!document.querySelector('input[name="envio"]:checked')) {
  document.getElementById('envioCosto').textContent = `Seleccione un tipo de envio`;
  document.getElementById(`totalCost`).textContent = `Seleccione un tipo de envio`;
}}

 function desabilitar(){
  let selectedPayment= document.querySelector('input[name="metodoPago"]:checked').value;
  if (selectedPayment==1){
    document.querySelector(`input[name="numCuenta"]`).disabled=true;
    document.querySelector(`input[name="numCuenta"]`).value=null;
    document.querySelector("#numTarjeta").disabled=false;
    document.querySelector("#codSeguridad").disabled=false;
    document.querySelector("#vencimiento").disabled=false;
    document.getElementById("metPag").innerHTML=`Tarjeta de crédito`;

  }if(selectedPayment==2){
    document.querySelector("#numTarjeta").disabled=true;
    document.querySelector("#codSeguridad").disabled=true;
    document.querySelector("#vencimiento").disabled=true;
    document.querySelector("#numTarjeta").value=null;
    document.querySelector("#codSeguridad").value=null;
    document.querySelector("#vencimiento").value=null;
    document.querySelector(`input[name="numCuenta"]`).disabled=false;
    document.getElementById("metPag").innerHTML=`Transferencia bancaria`;
  }
  pagoValidity();
 }

 
function cantValidity(){
  let cantInput=document.getElementById("countInput")
  if (cantInput.value!=null && cantInput.value>0){
  cantInput.classList.add('was-validated')
  cantInput.valid=true;
} else{
  cantInput.valid=false;
}
cantInput.classList.add('was-validated');
}

function pagoValidity(){
  let invalidFormFeedback=document.getElementById("alertaSinPago");
  if (!document.querySelector('input[name="metodoPago"]:checked')){
    invalidFormFeedback.innerHTML=`Debe seleccionar un método de pago`;
  }else{
    invalidFormFeedback.innerHTML=``;
  }
}



 
