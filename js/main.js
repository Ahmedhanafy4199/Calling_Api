
// AJAX
var recipts = [];
getRecipts("pizza");
var links=document.getElementsByClassName("nav-link");//htmlCollection
for(var i=0;i<links.length;i++){
    links[i].addEventListener("click",function(e){
        var currentMeal=e.target.text;
        getRecipts(currentMeal);
    })
}

function getRecipts(meal) {
    var httpRequest = new XMLHttpRequest(); // شايل كدة نسخة
    httpRequest.open("GET", `https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    httpRequest.send();
    httpRequest.addEventListener("readystatechange", function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            recipts = JSON.parse(httpRequest.response).recipes
            displayRecipts()
        }
    })
}

function displayRecipts() {
    var reciptsCont = '';
    for (var i = 0; i < recipts.length; i++) {
        reciptsCont +=
            `
        <div class="col-md-3 my-4">
            <div>
                <img class="w-100 img-recipts" src="${recipts[i].image_url}">
                <h4 class="mt-3">${recipts[i].title}</h4>
                <button class="btn btn-info">
                    <a class="text-white" href="${recipts[i].source_url}" target="_blank">source</a>
                </button>
                <button class="btn btn-warning">
                    <a class="text-white" href="details.html?rid=${recipts[i].recipe_id}" target="_blank">details</a>
                </button>
            </div>
        </div>
        `
    }
    document.getElementById("reciptsRow").innerHTML = reciptsCont
}



var imgs = Array.from(document.getElementsByClassName("img-fluid"));
var lightBoxContainer = document.getElementById("lightBoxContainer");
var closeIcon = document.getElementById("close");

var lightBoxItem = document.getElementById("lightBoxItem");
var nextIcon = document.getElementById("next");
var prevIcon = document.getElementById("prev");
var currentIndex = 0;

for (var i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener("click", function (e) {
        var imgSrc = e.target.src;
        lightBoxItem.style.backgroundImage = `url(${imgSrc})`;
        currentIndex = imgs.indexOf(e.target)
        lightBoxContainer.style.display = "flex"
    })
}
closeIcon.addEventListener("click", closeSlider)
function closeSlider() {
    lightBoxContainer.style.display = "none"
}

nextIcon.addEventListener("click", nextSlider)
function nextSlider() {
    currentIndex++;
    if (currentIndex == imgs.length) {
        currentIndex = 0;
    }
    var imgSrc = imgs[currentIndex].src;
    lightBoxItem.style.backgroundImage = `url(${imgSrc})`;
}

prevIcon.addEventListener("click", prevSlider)
function prevSlider() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = imgs.length - 1;
    }
    var imgSrc = imgs[currentIndex].src;
    lightBoxItem.style.backgroundImage = `url(${imgSrc})`;
}

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeSlider()
    }
    else if (e.key == "ArrowRight") {
        nextSlider()
    }
    else if (e.key == "ArrowLeft") {
        prevSlider()
    }
})