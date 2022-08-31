const PRODUCT_URL= PRODUCTS_URL.valueOf()+ localStorage.getItem("catID")+ ".json"
let currentProductsArray = [];
function showProductsList(array) {
    let htmlContentToAppend = "";
    for(let product of array.products){
        htmlContentToAppend += `
      
    <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${product.name}-${product.currency} ${product.cost}</h4> 
                        <p> ${product.description}</p> 
                        </div>
                        <small class="text-muted">${product.soldCount} vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
    
        `
        document.getElementById("productos").innerHTML = htmlContentToAppend;
    }
    document.getElementById("nomCat").innerHTML+= ` ${array.catName}.`
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data;
            showProductsList(currentProductsArray);
        }
    });
});




