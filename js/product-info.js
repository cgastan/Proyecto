const CURRENT_PRODUCT_INFO_URL = PRODUCT_INFO_URL.valueOf() + localStorage.getItem("prodID") + ".json";
const CURRENT_COMMENTS_URL= PRODUCT_INFO_COMMENTS_URL.valueOf()+ localStorage.getItem("prodID") + ".json";
let htmlContentToAppend=``

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CURRENT_PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
            showProductInfo(productInfo);
        }
    }).then(getJSONData(CURRENT_COMMENTS_URL).then(function(resultCommentsObj){
        if (resultCommentsObj.status==="ok"){
            commentsInfo=resultCommentsObj.data;
            showComments(commentsInfo);
        }
    }));

    function showProductInfo(array) {
        htmlContentToAppend = `
        <br>
        <div>
        <h2 class="p4">${array.name}</h2>
        <br>
        <hr>
        <div>
        <strong>Precio</strong>
        <p>${array.currency} ${array.cost}</p>
        <strong>Descripción</strong>
        <p>${array.description}</p>
        <strong>Categoría</strong>
        <p>${array.category}</p>
        <strong>Cantidad de vendidos</strong>
        <p>${array.soldCount}</p>
        </div>
        <strong>Imagines ilustrativas</strong>
        </div>
        <div class="row row-cols-1 row-cols-md-4 g-4">`;
        for (let image of array.images) {
            htmlContentToAppend += `
            <div class="col">
            <div class="card h-80">
            <img src="${image}" class="card-img-top">
            </div>
            </div>`
        }
        htmlContentToAppend+=`</div>`
        document.getElementById("divProductInfo").innerHTML = htmlContentToAppend;
    }
});

function showComments(array){
    htmlContentToAppend+=`
    <br>
    <h3 class="p4">Comentarios</h2>
    <div class="card" style="width: 18rem;">
    <ul class="list-group list-group-flush">`
    for(let comment of array){
        htmlContentToAppend+=
        `<li class="list-group-item">
        <strong>${comment.user}</strong><p class="text-muted">-${comment.dateTime}-${showStarsRate(comment.score)}</p>
        <p class="text-muted">${comment.description}</p>
        </li>`
    htmlContentToAppend+=
    `</ul>
</div>`
}
    document.getElementById("divProductInfo").innerHTML = htmlContentToAppend;
}

function showStarsRate(number){
let htmlComments=``
   let i=0;
   let x=5-i
   while (i<=5 && i<=number){
    i++;
    htmlComments+=`<span class="fa fa-star checked"></span>`
   }if(x>0){
   htmlComments+=`<span class="fa fa-star"></span>`
   }
   htmlContentToAppend+=htmlComments;
}
