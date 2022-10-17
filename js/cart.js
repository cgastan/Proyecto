const CART_25801_URL = CART_INFO_URL + "25801.json";
let cartInfo = ``;
let htmlContentToAppend = ``;
let htmlFormToAppend = ``;
let cantModificada=undefined;
let cantFinal=undefined;
let priceHtml=``;


document.addEventListener("DOMContentLoaded", async function (e) {
  getJSONData(CART_25801_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cartInfo = resultObj.data.articles;
      showCartInfo(cartInfo);
      showForm();
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
      <td><input id="countInput" type="number" name="countInput" value="${article.count}" oninput="subtotal(${article.count},${article.unitCost})"</td>
      <td><strong>${article.currency}</strong> <strong id="precioPorCant"> ${article.count*article.unitCost} </strong></td>
    </tr>`};
    htmlContentToAppend += `
  </tbody>
</table>
  </div>
  <hr>
        `;
        
    document.getElementById("cartDiv").innerHTML = htmlContentToAppend;
   
     

    
  }


  function showForm() {

    htmlFormToAppend = `
        <div class="text-center p-4">
          <p class="text-start fs-5">Tipo de envío</p>
          <div class="input-group">
           <div class="form-check">
              <input class="form-check-input mt-0" type="radio" name="envio" value="1" aria-label="Premium">
              <label for="premium">Premium 2 a 5 días (15%)</label>
            <br>
              <input class="form-check-input mt-0" type="radio" name="envio" value="2" aria-label="Express">
              <label for="express">Express 5 a 8 días (7%)</label>
            <br>
              <input class="form-check-input mt-0" type="radio" name="envio" value="3" aria-label="Standard">
              <label for="standard">Standard 12 a 15 días (5%)</label>
           </div>
          </div>
        </div>
        <div class="text-center p-4">
        <p class="text-start fs-5">Dirección de envío</p>
        <div class="form-group row">
        <div class="w-50">
          <label for="calle">Calle</label>
          <input class="form-control" id="calle" type="text">
        </div>
        <div class="w-25">
          <label for="numero">Número</label>
          <input class="form-control" id="numero" type="number">
        </div>
        <div class="w-50">
          <label for="esquina">Esquina</label>
          <input class="form-control" id="esquina" type="text">
        </div>
      </div>
      </div>
      <hr>      
  `;
    document.getElementById("cartDiv").innerHTML += htmlFormToAppend;
  }
})

function subtotal(artCount,artUnitPrice) {
let cantModificada=Number(document.getElementById("countInput").value); 
 if(cantModificada!==artCount){
  cantFinal= cantModificada*artUnitPrice;
 }
 document.getElementById("precioPorCant").innerHTML=cantFinal.toString();
 
  
}