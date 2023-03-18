
let dishesArray = []

async function displayDishes() {

let myApi =  await fetch ("https://www.themealdb.com/api/json/v1/1/search.php?s=")
let myResponse = await myApi.json()

dishesArray = myResponse.meals

let dishesDiv = ``

for (let i=0 ; i<dishesArray.length;i++) {

    dishesDiv += `  <div class="col-md-3 mb-3" >
    <div  onclick="mealInstructions(${dishesArray[i].idMeal})"   class="dish-content position-relative overflow-hidden" >
        <img src=${dishesArray[i].strMealThumb} alt="" class="w-100 ">
        <div class="dish-layer d-flex align-items-center">
            <h2>${dishesArray[i].strMeal}</h2>
        </div>
    </div>
</div>`

}
document.querySelector("#myRow").innerHTML = dishesDiv
}
displayDishes()



function closeNav () {
    if( $(".sideBarNav").css("left")=="0px") {

        $(".sideBarNav").animate({left:-sideBarInnerWidth},500)
        $("#closeBtn").html('<i class="fa-solid fa-bars fa-2x"></i>')

        for (let i = 0; i < 5; i++) {
            $(".navList li").eq(i).animate({
                top: 300
            }, 1000)
        }


    }
else {
    $(".sideBarNav").animate({left:"0px"},500)
    $("#closeBtn").html('<i class="fa-solid fa-x fa-2x "></i>')

  
    $(".navList li").animate({
        top: 0
    }, 500)


}
}


let sideBarInnerWidth = $(".sideBarInner").innerWidth()
$(".sideBarNav").css("left",-sideBarInnerWidth)
$("#closeBtn").html('<i class="fa-solid fa-bars fa-2x"></i>')
$("#closeBtn").click(function()  {
 closeNav()


})

$("#searchBtn").click (function() {
    $(".loading").fadeIn(300)

   $(".home-content").removeClass("show")
   $(".home-content").addClass("hide")
   $(".searchSection").addClass("show").nextAll().removeClass("show").addClass("hide")

   closeNav()


   $(".loading").fadeOut(300)




})



let  searchedMeals = []
async function fetchMySearchApi(term) {
    $(".loading").fadeIn(300)
    let myApi = await fetch ( `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let myResponse = await myApi.json()
    searchedMeals = myResponse.meals
    displaySearchedProducts ()
    $(".loading").fadeOut(300)



}



function searchByMealName (searchName) {

let mySearchByNameInput = document.querySelector("#searchByName")
mySearchByNameInput.addEventListener("input",function() {
    searchName = this.value
 fetchMySearchApi(searchName)

})

}
searchByMealName()

async function  displaySearchedProducts () {

    let cartona = ``

    for (let i=0 ; i<searchedMeals.length;i++ ) {
        cartona += `<div class="col-md-3 mb-3">
        <div class="dish-content position-relative overflow-hidden "   onclick="mealInstructions(${searchedMeals[i].idMeal})">
            <img src=${searchedMeals[i].strMealThumb} alt="" class="w-100 ">
            <div class="dish-layer d-flex align-items-center">
                <h2>${searchedMeals[i].strMeal}</h2>
            </div>
        </div>
    </div>`


    }
    document.querySelector("#searchedMeals").innerHTML = cartona

}

let myFirstLetterMeal = []
async function fetchFristLetterApi(term) {
    $(".loading").fadeIn(300)

    let letterApi = await fetch ( `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    let myResponse = await letterApi.json()

    myFirstLetterMeal = myResponse.meals
    displayProducts ()
    $(".loading").fadeOut(300)


}
fetchFristLetterApi()


function searchByFirstLetter (searchLetter) {

    let mySearchByNameInput = document.querySelector("#searchByLetter")
    mySearchByNameInput.addEventListener("keyup",function() {
        searchLetter = this.value
    fetchFristLetterApi(searchLetter)
    
    })
    
    }
   searchByFirstLetter()


   async function  displayProducts () {

    let cartona = ``

    for (let i=0 ; i<myFirstLetterMeal.length;i++ ) {
        cartona += `<div class="col-md-3 mb-3">
        <div class="dish-content position-relative overflow-hidden "   onclick="mealInstructions(${myFirstLetterMeal[i].idMeal})">
            <img src=${myFirstLetterMeal[i].strMealThumb} alt="" class="w-100 ">
            <div class="dish-layer d-flex align-items-center">
                <h2>${myFirstLetterMeal[i].strMeal}</h2>
            </div>
        </div>
    </div>`


    }
    document.querySelector("#searchedMeals").innerHTML = cartona

}

const loading = document.querySelector(".loading")

$("#catgBtn").click(function() {
    $(".loading").fadeIn(300)

   $(".home-content").removeClass("show")
   $(".home-content").addClass("hide")
   $(".searchSection").removeClass("show")
    $(".categories").removeClass("hide")
    $(".categories").addClass("show").nextAll().removeClass("show").addClass("hide")


//     $(".category-desc").removeClass("show")
//     $(".category-desc").addClass("hide")
//     $(".instructions").removeClass("show")
//     $(".instructions").addClass("hide")
//     $(".area").removeClass("show")
// $(".area").addClass("hide")
// $(".ing").removeClass("show")
// $(".ing").addClass("hide")
// $(".contactUs").removeClass("show").addClass("hide")

  
   
   
    closeNav()
    $(".loading").fadeOut(300)

})


let myCategories = []

async function fetchCategoriesApi() {
    $(".loading").fadeIn(300)

let myApi = await fetch ("https://www.themealdb.com/api/json/v1/1/categories.php")
myResponse= await myApi.json()
myCategories = myResponse.categories

$(".loading").fadeOut(300)
displayCategories()


}
fetchCategoriesApi()




async function displayCategories() {

let cartona = `` 


for (let i =0 ; i< myCategories.length ;i++) {


    cartona += `
    <div class="col-md-3 mb-3" >
    <div class="ctg-content position-relative overflow-hidden"onclick="categoryDesc('${myCategories[i].strCategory}')" >
        <img src=${myCategories[i].strCategoryThumb} alt="" class="w-100 ">
        <div class="ctg-layer text-center">
            <h2>${myCategories[i].strCategory}</h2>
            <p>${myCategories[i].strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
        </div>
    </div>
</div>

    `

}
document.querySelector('#innerCatgeorie').innerHTML = cartona


}


let myCategoryDesc = []


async function categoryDesc (word) {
    $(".loading").fadeIn(300)
let myApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${word}`)
let myResponse = await myApi.json()

myCategoryDesc = myResponse.meals
displayCatgeoryDesc(myCategoryDesc)
$(".loading").fadeOut(300)



}


function displayCatgeoryDesc (arr) {

let cartona = ` `
for(let i=0 ; i<arr.length ; i++) {

    cartona += `  <div class="col-md-3 mb-3">
    <div class="dish-content position-relative overflow-hidden " onclick="mealInstructions('${arr[i].idMeal}')" >
        <img src=${arr[i].strMealThumb} alt="" class="w-100 ">
        <div class="dish-layer d-flex align-items-center">
            <h2>${arr[i].strMeal}</h2>
        </div>
    </div>
</div>`
}

document.querySelector("#catDesc").innerHTML = cartona

$(".home-content").removeClass("show")
$(".home-content").addClass("hide")
$(".searchSection").removeClass("show")
$(".searchSection").addClass("hide")
 $(".categories").removeClass("hide")
 $(".categories").addClass("hide")
 $(".categories").removeClass("show")
 $(".category-desc").removeClass("hide")
$(".category-desc").addClass("show")
$(".area").removeClass("show")
$(".area").addClass("hide")
$(".ing").removeClass("show")
$(".ing").addClass("hide")
$(".contactUs").removeClass("show").addClass("hide")

  


}

let mealInstruction = []

async function mealInstructions(id) {
    $(".loading").fadeIn(300)

  let myApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)  
let myResponse = await myApi.json()

mealInstruction = myResponse.meals
displayInstructions(mealInstruction) 
$(".home-content").removeClass("show")
$(".home-content").addClass("hide")
$(".searchSection").removeClass("show")
$(".searchSection").addClass("hide")
 $(".categories").removeClass("hide")
 $(".categories").addClass("hide")
 $(".categories").removeClass("show")
 $(".category-desc").addClass("hide")
$(".category-desc").removeClass("show")
$(".instructions").removeClass("hide")
$(".instructions").addClass("show")
$(".area").removeClass("show")
$(".area").addClass("hide")
$(".ing").removeClass("show")
$(".ing").addClass("hide")
$(".contactUs").removeClass("show").addClass("hide")

  
$(".loading").fadeOut(300)




}

function displayInstructions(arr) {


let cartona = ``

for(let i=0 ; i<arr.length;i++){


    let tags = arr[i].strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
cartona += `
<div class="col-md-4">
<div class="spc-div" >
    <img src=${arr[i].strMealThumb} alt="" class="w-100">
    <h3 >
        ${arr[i].strMeal}
    </h3>
</div>
</div>
<div class="col-md-8">
<div class="inner">
    <h2>
        Instructions
    </h2>
    <p>
    ${arr[i].strInstructions}
    </p>

    <h3>
        <span>Area :</span>
        ${arr[i].strArea}
    </h3>
    <h3>
        <span>Category :</span>
       ${arr[i].strCategory}
    </h3>
    <h3>
        Recipes:
    </h3>
    <ul class="list-unstyled d-flex flex-wrap">
    
    
    ${arr[i].strIngredient1}
    </ul>
    <h3>
        Tags:
    </h3>
    <ul class="list-unstyled d-flex flex-wrap">

    ${tagsStr}
    </ul>
    <a href="${arr[i].strSource}" class="btn btn-success" target="_blank">Source</a>
    <a href="${arr[i].strYoutube}" class="btn btn-danger" target="_blank">youTube</a>
</div>
</div>
`


}

document.querySelector("#instrc").innerHTML=cartona


}

//start area
let myAreaMeals=[]
async function getAreaMeals() {
    $(".loading").fadeIn(300)

let myApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
let myResponse =await myApi.json()
myAreaMeals = myResponse.meals
displayAreaMeals(myAreaMeals)
$(".loading").fadeOut(300)



}

function displayAreaMeals(arr) {

let cartona = ``

for(let i=0 ; i<arr.length;i++) {


    cartona+= ` <div class="col-md-3 mt-2">
    <div class="inner-area text-white text-center curson" onclick='detailAreaMeal("${arr[i].strArea}")' >
        <i class="fa-solid fa-house-laptop fa-5x"></i>
        <h4>${arr[i].strArea}</h4>
    </div>
</div>`
}


document.querySelector("#areaRow").innerHTML=cartona

}

$("#areaBtn").click(function(){
    $(".loading").fadeIn(300)

    getAreaMeals()

    $(".home-content").removeClass("show")
    $(".home-content").addClass("hide")
    $(".searchSection").removeClass("show")
    $(".searchSection").addClass("hide")
     $(".categories").removeClass("show").addClass("hide")
    $(".area").addClass("show").removeClass("hide").nextAll().removeClass("show").addClass("hide")


  
    closeNav()
    $(".loading").fadeOut(300)



})


let detailArray = []

async function detailAreaMeal(country) {
    $(".loading").fadeIn(300)

let myApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
let myResponse = await myApi.json()
detailArray = myResponse.meals
displayCatgeoryDesc (detailArray)
$(".area").removeClass("show")
$(".area").addClass("hide")
$(".loading").fadeOut(300)

}


let myIng=[]

async function getIng() {

    $(".loading").fadeIn(300)

let myApi = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
let myResponse = await myApi.json()
myIng = myResponse.meals
displayIng(myIng)
$(".loading").fadeOut(300)

}

function displayIng(arr) {

let cartona = ``

for(let i=0 ; i<20 ; i++) {

cartona += ` <div class="col-md-3 mt-3 me-2 curson">
<div class="inner-ing" onclick="getIngDetails('${arr[i].strIngredient}')">
    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
    <h1>${arr[i].strIngredient}</h1>
    <p>${arr[i].strDescription.split(" ").slice(0,15).join(" ")}</p>
</div>
</div>`


}

document.querySelector("#myIngRow").innerHTML = cartona

}

$("#ingBtn").click(function(){
    $(".loading").fadeIn(300)

    $(".home-content").removeClass("show")
    $(".home-content").addClass("hide")
    $(".searchSection").removeClass("show")
    $(".searchSection").addClass("hide")
     $(".categories").removeClass("hide")
     $(".categories").addClass("hide")
     $(".categories").removeClass("show")
     $(".category-desc").addClass("hide")
     $(".category-desc").removeClass("show")
     $(".instructions").addClass("hide")
     $(".instructions").removeClass("show")
    $(".area").removeClass("show")
    $(".area").addClass("hide")
    $(".ing").removeClass("hide")
    $(".ing").addClass("show")
    $(".contactUs").removeClass("show").addClass("hide")

    closeNav()


    getIng()
    $(".loading").fadeOut(300)

})

let myIngDetails=[]
async function getIngDetails (ingredient) {
    $(".loading").fadeIn(300)

let myApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
let myResponse = await myApi.json()
myIngDetails = myResponse.meals
displayCatgeoryDesc (myIngDetails)
$(".loading").fadeOut(300)


}


function validateName () {


const regexStyle= /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;

if (regexStyle.test(inputs[0].value)) {
    inputs[0].classList.add("is-valid");
    inputs[0].classList.remove("is-invalid");
    return true;
 } else {

    inputs[0].classList.add("is-invalid");
    inputs[0].classList.remove("is-valid");

    return false;
 }




}


function validateEmail () {

    const regexStyle= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (regexStyle.test(inputs[1].value)) {
        inputs[1].classList.add("is-valid");
        inputs[1].classList.remove("is-invalid");
        return true;
     } else {
    
        inputs[1].classList.add("is-invalid");
        inputs[1].classList.remove("is-valid");
    
        return false;
     }
    
}

function validatePhoneNumber ( ) {

    const regexStyle= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (regexStyle.test(inputs[2].value)) {
        inputs[2].classList.add("is-valid");
        inputs[2].classList.remove("is-invalid");
        return true;
     } else {
    
        inputs[2].classList.add("is-invalid");
        inputs[2].classList.remove("is-valid");
    
        return false;
     }
    



}

function validateAge() {


    const regexStyle = /^([1-7][0-9]|80)$/;

    if (regexStyle.test(inputs[3].value)) {
    inputs[3].classList.add("is-valid");
    inputs[3].classList.remove("is-invalid");
    return true;
 } else {

    inputs[3].classList.add("is-invalid");
    inputs[3].classList.remove("is-valid");

    return false;
 }


}

function validatePassword () {



   const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (regexStyle.test(inputs[4].value)) {
        inputs[4].classList.add("is-valid");
        inputs[4].classList.remove("is-invalid");
        return true;
     } else {
    
        inputs[4].classList.add("is-invalid");
        inputs[4].classList.remove("is-valid");
    
        return false;
     }
    
}


function validateRePassword() {


if(inputs[5].value == inputs[4].value) {
    inputs[5].classList.add("is-valid");
    inputs[5].classList.remove("is-invalid")
    return true
}
else {
    inputs[5].classList.add("is-invalid");
    inputs[5].classList.remove("is-valid");
    return false
}

}
const formData = document.querySelector("form")
const formBtn = document.querySelector("#formBtn")
const inputs = document.querySelectorAll(".contactUs input")
formData.addEventListener("submit",function(e){
    
    e.preventDefault()
    
   if (isValid) {
    setForm()}
})

formData.addEventListener("input", function () {
    if (validateName() && validateEmail() && validatePhoneNumber() && validatePassword() && validateAge() && validateRePassword()) {
       isValid = true;
        formBtn.removeAttribute("disabled")


    } else {
       isValid = false;
       formBtn.setAttribute("disabled",true)
    }
 });

document.querySelector("#formBtn").addEventListener("click" , function() {
    setForm()
})
function setForm() {
    const user = {
       first_name: inputs[0].value,
       email: inputs[1].value,
       phone: inputs[2].value,
       age: inputs[3].value,
       password: inputs[4].value,
       rePassword: inputs[5].value,
    };
 
    console.log(user);}
setForm()

$("#contactBtn").click(function(){
    $(".loading").fadeIn(300)

    $(".home-content").removeClass("show").addClass("hide")
    $(".searchSection").removeClass("show").addClass("hide")
     $(".categories").removeClass("hide")
     $(".categories").addClass("hide").removeClass("show")
     $(".category-desc").addClass("hide").removeClass("show")
     $(".instructions").addClass("hide").removeClass("show")
    $(".area").removeClass("show").addClass("hide")
    $(".ing").removeClass("show").addClass("hide")

$(".contactUs").removeClass("hide").addClass("show")
closeNav()
$(".loading").fadeOut(300)

})

$(document).ready(function( ){

$(".loading").fadeOut(1000)
$("body").css("overflow","auto")

})