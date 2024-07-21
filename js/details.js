
var param = new URLSearchParams(location.search);//بترجع اللي بعد علامة الاستفهام
var recipeId=param.get("rid");//هتجيب قيمة الrid
var receipeDetails={};//object
var recipeImg=document.getElementById("recipeImg")
var ingradients=[];
getReceipeDetails();
function getReceipeDetails(){
    var httpRequest=new XMLHttpRequest(); 
    httpRequest.open("GET",`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
    httpRequest.send();
    httpRequest.addEventListener("readystatechange",function(){
       if(httpRequest.readyState==4&&httpRequest.status==200)
       {
         receipeDetails= JSON.parse(httpRequest.response).recipe;
         recipeImg.src=receipeDetails.image_url;
         ingradients=receipeDetails.ingredients;
         displayIngradients()
       }
    })
 }
 function displayIngradients(){
     var ingaradientsContainer=``
     for(var i=0;i<ingradients.length;i++){
         ingaradientsContainer+=`<li>${ingradients[i]}</li>`
     }
     document.getElementById("ingradientsUl").innerHTML=ingaradientsContainer
 }