var hotbod = document.querySelector("body");
var searchBtn = document.querySelector('#find-food');
var recipeInputName = document.querySelector('#ingredient');
var recipeEl = document.querySelector('#recipeName');
var foodImage = document.querySelector('#food-image');
var giphyImage = document.querySelector('#food-giphy');
var ingredientEl = document.querySelector('#ingredient');
var recipeSiteEl = document.querySelector('#recipeSite');
var orderListRecipe = document.querySelector('.orderList');
var ingredHeader = document.querySelector('#strongEl');
var searchHistoryEl = document.querySelector('#search-history');

function doStuff() {
    hotbod.className += "animate";
}

window.onload = function () {
    doStuff();
};

// creating an empty array to hold the search history
var recipeHistory = []

// Getting recipe from local storage 
function getRecipeHistory() {
  var recipeHistorySearch = JSON.parse(localStorage.getItem('recipeHistory'))
  if (recipeHistorySearch){
    recipeHistory = recipeHistorySearch
  }
  //calling display function 
  displayRecipeHistory();
}

// Saving the into the local storage
function saveRecipeHistory(recipeName) {
  recipeHistory.unshift({recipeName});

  localStorage.setItem("recipeHistory", JSON.stringify(recipeHistory)) 
} 

// Making the search history clickable
function clickedRecipeHistory(event) {
  event.preventDefault();
  //calling the callEdamam and callGiphy function when search history is clicked.
  callEdemam(event.target.textContent)
  callGiphy(event.target.textContent)
}

// Displaying the search history
function displayRecipeHistory(){
  searchHistoryEl.innerHTML = '';
  var historyLength = recipeHistory.length
  
  //setting numbers of search history to be displayed
  if(historyLength > 10){
    historyLength = 10
  } 

  for(var i = 0; i < historyLength; i++){
    // Adding button to the search history
    var recipeHistoryBtn = document.createElement('button')
    recipeHistoryBtn.setAttribute('class', 'btn-history')
    recipeHistoryBtn.textContent = recipeHistory[i].recipeName
    searchHistoryEl.appendChild(recipeHistoryBtn)

    // Adding eventlistener to the search history
    recipeHistoryBtn.addEventListener('click', clickedRecipeHistory)
  }

}

// Handling the user input
var generateRecipeHandler = function (event){
    event.preventDefault()

    console.log(event)
    
    var recipeName = recipeInputName.value.trim().toUpperCase()

    if (recipeName){
        // calling the callEdemam to use the input to fetch
        callEdemam(recipeName);

        //emptying the input
        recipeInputName.value ='';

        // calling the callGiphy to use the input to fetch
        callGiphy(recipeName)
       
        saveRecipeHistory(recipeName)
        getRecipeHistory()
        
        
      } else {
        alert('Please enter the recipe name')
    }
    
}

// Fetching data from Edemam API
var callEdemam = function (recipeName) {
    var edemamAPI = 'https://api.edamam.com/api/recipes/v2?app_key=fba9ff25a00d873626a8894fbb6b349b&type=public&q=' + recipeName + '&app_id=db55d603';

    fetch(edemamAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)

        var newData = data.hits[0]
        console.log(newData.recipe.label)
        var giphySearchData = newData.recipe.label


        var newDataEl = data.hits
        console.log(newDataEl)
        // Looping through the data 
        for(var i = 0; i < newDataEl.length; i++){
          // picking a random recipe from the loop
          var myOption = newDataEl[Math.floor(Math.random() * newDataEl.length)]
          
          recipeEl.innerHTML = '';
          // recipe name section
          recipeEl.textContent = 'Recipe Name: ' + myOption.recipe.label
          recipeEl.setAttribute('style', 'font-weight: bold; padding-bottom: 5px;')
          console.log(recipeEl.textContent)

          //section for the recipe image
          var image = myOption.recipe.image
          console.log(image)
          foodImage.setAttribute('src', image)

        }

        // recipe site section
        var recipeSiteLink = myOption.recipe.url
        //creating an anchor tag
        var aTag = document.createElement('a')
        aTag.textContent = 'Click here for the directions'
        aTag.setAttribute('href', recipeSiteLink)
        aTag.setAttribute('target', '_blank')
        aTag.setAttribute('style', 'background: red; color: white; padding: 5px; font-weight: bold;')
        recipeSiteEl.innerHTML = '';
        recipeSiteEl.appendChild(aTag)
        
        // section for ingredients
        var ingredient = myOption.recipe.ingredientLines
        orderListRecipe.innerHTML = '';
        for (var i = 0; i < ingredient.length; i++) {
          var ingredientData = ingredient[i]
          console.log(ingredientData)
          
          var ingredList = document.createElement('li')
          ingredList.textContent = ingredientData
          ingredHeader.textContent = 'Ingredients'
         
          orderListRecipe.appendChild(ingredList)
          orderListRecipe.setAttribute('style','padding-bottom: 5px;')
        }
    });
}



// Fetching data from Giphy API
var callGiphy = function (recipeName) {
    var giphyAPI = 'https://api.giphy.com/v1/gifs/search?api_key=GnpAWOD7mrTxsiy7QLUNO5oykDI63gAk&limit=10&q=' + recipeName;

    fetch(giphyAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        
        var dataArr = data.data
        console.log(dataArr)
        for (var i = 0; i < dataArr.length; i++) {
          var giphyData = dataArr[Math.floor(Math.random() * dataArr.length)]
          giphyDisplay = giphyData.images.fixed_width.url
          console.log(giphyDisplay)

          giphyImage.setAttribute('src', giphyDisplay)

        }
    });
}
// calling the getRecipeHistory function
getRecipeHistory()

// Adding eventlistener to searchBtn
searchBtn.addEventListener('click', generateRecipeHandler)
