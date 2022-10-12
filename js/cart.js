const CART_25801_URL = CART_INFO_URL + "25801.json";
let cartInfo = ``;
let htmlContentToAppend = ``;

document.addEventListener("DOMContentLoaded", async function (e) {
    getJSONData(CART_25801_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data.articles;
            showCartInfo(cartInfo);
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
  for (let article of array){
    htmlContentToAppend+=`
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
      <td><input id="countInput" type="number" name="countInput" value="${article.count}" /></td>
      <td><strong>${article.currency} ${article.unitCost*article.count}</strong></td>
    </tr>`};
    htmlContentToAppend+=`
  </tbody>
</table>
  </div>
        `;
        document.getElementById("cartDiv").innerHTML = htmlContentToAppend;
    }
       
    
    
})