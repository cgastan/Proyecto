const CURRENT_PRODUCT_INFO_URL = PRODUCT_INFO_URL.valueOf() + localStorage.getItem("prodID") + ".json";
const CURRENT_COMMENTS_URL = PRODUCT_INFO_COMMENTS_URL.valueOf() + localStorage.getItem("prodID") + ".json";
let productInfo= ``
let commentsInfo=``
let htmlContentToAppend = ``
let htmlComments = ``

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CURRENT_PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
            showProductInfo(productInfo);
        }
    }).then(getJSONData(CURRENT_COMMENTS_URL).then(function (resultCommentsObj) {
        if (resultCommentsObj.status === "ok") {
            commentsInfo = resultCommentsObj.data;
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
        htmlContentToAppend += `</div>`
        document.getElementById("divProductInfo").innerHTML = htmlContentToAppend;
    };

    function showComments(array) {
        htmlContentToAppend += `
        <br>
        <h3 class="p4">Comentarios</h3>
        <div class="card" >
        <ul class="list-group">`
        for (let comment of array) {
            htmlContentToAppend +=
                `<li class="list-group-item">
        <strong>${comment.user}</strong><p class="text-muted">${comment.dateTime}-`; showStarsRate(comment.score); htmlContentToAppend += `</p>
        <p class="text-muted">${comment.description}</p>
         </li>`
            htmlContentToAppend +=
                `</ul>
        </div>`
        }
        htmlContentToAppend+=`
        <br>
        <h3 class="p4">Comentar</h3>
        <div class="mb-3">
        <label for="userComment" class="form-label">Tu opinión</label>
        <textarea name="userComment" class="form-control w-50" id="userComment"rows="5"></textarea>
        </div>
        <div class="mb-3">
        <label for="userScore" class="form-label">Tu puntuación</label>
        <select class="form-select" id="userScore">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select>
        </div>
        <button class="btn btn-primary" type="submit" id="enviarComentario">Enviar</button>
        `
        document.getElementById("divProductInfo").innerHTML = htmlContentToAppend;
        /* Parte del desafio para despues
         document.getElementById("enviarComentario").addEventListener("click",function(){
            addComment();
            showComments(commentsInfo); 
        })*/
    }
});



function showStarsRate(scoreNumber) {
    let htmlComments = ``;
    let x = 5 - scoreNumber;
    if (scoreNumber <= 5) {
        htmlComments += (`<span class="fa fa-star checked"></span>`).repeat(scoreNumber);
    } if (scoreNumber < 5 && x > 0) {
        htmlComments += (`<span class="fa fa-star"></span>`).repeat(x);
    }

    htmlContentToAppend += htmlComments;
}




/* Parte del desafio para despues
function addComment(){
    let comentario=document.getElementById("userComment").valueOf;
    let puntuacion=parseInt(document.getElementById("userScore").valueOf());
    commentsInfo.push(
    {product: localStorage.getItem("prodID"),
    score: puntuacion,
    description: comentario,
    user: localStorage.getItem("usuarioMail"),
    dateTime: "2022-05-21 23:10:41"});
} */