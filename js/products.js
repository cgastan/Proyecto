const PRODUCT_URL = PRODUCTS_URL.valueOf() + localStorage.getItem("catID") + ".json"
let currentProductsArray = [];
let min = undefined;
let max = undefined;



  /*Productos ID*/ 
  function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data;
            showProductsList(currentProductsArray);
        }
    });

    /*Mostrar lista*/
    function showProductsList(array) {
        let htmlContentToAppend = "";
        for (let product of array.products) {
            product.cost = parseInt(product.cost);
            product.id= parseInt(product.id);

            if (!(product.cost < min) && !(product.cost > max)) {

                htmlContentToAppend += `
          
        <div class="list-group-item list-group-item-action" onclick="setProdID(${product.id})">
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
        }
        document.getElementById("nomCat").innerHTML = `Verás aquí todos los productos de la categoría ${array.catName}.`
    }

    /*Boton filtrar*/
    document.getElementById("rangeFilterCountProd").addEventListener("click", function () {

        min = document.getElementById("rangeFilterCountMinProd").value;
        max = document.getElementById("rangeFilterCountMaxProd").value;

        if ((min != undefined) && (min != "") && (parseInt(min)) >= 0) {
            min = parseInt(min);
        }
        else {
            min = undefined;
        }

        if ((max != undefined) && (max != "") && (parseInt(max)) >= 0) {
            max = parseInt(max);
        }
        else {
            max = undefined;
        }
        showProductsList(currentProductsArray);
    });

    /*Boton limpiar*/

    document.getElementById("clearRangeFilterProd").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMinProd").value = "";
        document.getElementById("rangeFilterCountMaxProd").value = "";

        min = undefined;
        max = undefined;

        showProductsList(currentProductsArray);
    });

    /*Boton relevancia*/

    document.getElementById("sortBySoldCount").addEventListener("click", function () {
        for (let product of currentProductsArray.products) {
            currentProductsArray.products.sort(function (a, b) {
                a.soldCount = parseInt(a.soldCount);
                b.soldCount = parseInt(b.soldCount);
                return b.soldCount - a.soldCount;

            })
        }
        showProductsList(currentProductsArray);
    });

    /*Boton precio desc*/

    document.getElementById("sortByPriceDesc").addEventListener("click", function () {
        for (let product of currentProductsArray.products) {
            currentProductsArray.products.sort(function (a, b) {
                a.cost = parseInt(a.cost);
                b.cost = parseInt(b.cost);
                return b.cost - a.cost;
            })
        }
        showProductsList(currentProductsArray);
    })

    /*Boton precio asc*/
    document.getElementById("sortByPriceAsc").addEventListener("click", function () {
        for (let product of currentProductsArray.products) {
            currentProductsArray.products.sort(function (a, b) {
                a.cost = parseInt(a.cost);
                b.cost = parseInt(b.cost);
                return a.cost - b.cost;
            })
        }
        showProductsList(currentProductsArray);
    })

});


