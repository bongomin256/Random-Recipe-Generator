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
    
    var recipeName = recipeInputName.value.trim()

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
          giphyDisplay = giphyData.images.fixed_width.mp4
          console.log(giphyDisplay)

          giphyImage.setAttribute('src', giphyDisplay)

        }
    });
}
// calling the getRecipeHistory function
getRecipeHistory()

// Adding eventlistener to searchBtn
searchBtn.addEventListener('click', generateRecipeHandler)





















// $(document).ready(function () {
//     //Initialize state
// var indexLastClick = 0;
// var recipes = [];
// var searchBtnEl = $("#searchBtn");
// var recipesBtnEl = $("#recipesBtn");
// var sortedArray = [];
// var recipesObjects = new Object;
// var isRecipeRemoved = "";
// var countRemovingRecipes = 0;
// var checkNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// // localStorage.clear();

// // Take recipes from localStrage to recipesObjects
// if (localStorage.length > 0) {
//     var localStorageArray = new Array();
//     for (let i = 0; i < localStorage.length; i++) {
//         localStorageArray[i] = localStorage.key(i) + localStorage.getItem(localStorage.key(i));
//     }
//     sortedArray = localStorageArray.sort();

//     for (let i = 0; i < sortedArray.length; i++) {
//         if (sortedArray[i].slice(0, 9) === "lastClick") {
//             recipesObjects["lastClick"] = sortedArray[i].slice(9, sortedArray[i].length);
//         } else if (sortedArray[i].slice(0, 13) === "isRecipeRemoved") {
//             recipesObjects["isRecipeRemoved"] = sortedArray[i].slice(12, sortedArray[i].length);
//         } else if (sortedArray[i].slice(0, 19) === "countRemovingRecipes") {
//             recipesObjects["countRemovingRecipes"] = sortedArray[i].slice(19, sortedArray[i].length);
//         }
//         else {
//             if (checkNum.indexOf(sortedArray[i][1]) > -1) {
//                 recipesObjects[sortedArray[i].slice(0, 2)] = sortedArray[i].slice(2, sortedArray[i].length);
//             } else {
//                 recipesObjects[sortedArray[i][0]] = sortedArray[i].slice(1, sortedArray[i].length);
//             }
//         }
//     }
//     // console.log("recipesObjects " + JSON.stringify(recipesObjects));
// }

// // Push recipes to recipies Array
// for (keys in recipesObjects) {
//     let value = recipesObjects[keys];
//     if (keys === "lastClick") {
//         indexLastClick = value;
//     } else if (keys === "isRecipeRemoved") {
//         isRecipeRemoved = value;
//     } else if (keys === "countRemovingRecipes") {
//         countRemovingRecipes = value;
//     } else {
//         recipes.push(value);
//     }
// }

// // Check Initial Recipes in recipes Array.
// console.log("initial recipes : " + recipes);

// // Search recipes
// searchBtnEl.on("click", function () {
//     var recipeName = $("#searchInput").val().trim();

//     // Recipe Name - Change First letter into Uppercase, the rest into Lowercase.
//     var recipeNameReset = "";
//     for (let i = 0; i < recipeName.length; i++) {
//         if (i === 0) {
//             recipeNameReset += recipeName[i].toUpperCase();
//         } else {
//             recipeNameReset += recipeName[i].toLowerCase();
//         }
//     }
//     // Check to see if recipes repeated
//     if (recipe.indexOf(recipeNameReset) > -1) {
//         console.log("Repeated Recipe!!")
//         alert("You alread have " + recipeNameReset + " button");
//         return;
//     }

//     // Save Last clicked recipe's Index
//     indexLastClick = recipe.length;

//     // Push recipe name to LocalStorage
//     if (localStorage.length === 0) {
//         localStorage.setItem("lastClick", indexLastClick);
//         localStorage.setItem("isRecipeRemoved", "false");
//         localStorage.setItem((parseInt(localStorage.length)), recipeNameReset);
//         localStorage.setItem("countRemovingRecipes", 0);
//     } else {
//         localStorage.setItem("lastClick", indexLastClick);
//         localStorage.setItem("isRecipeRemoved", "false");
//         localStorage.setItem((parseInt(localStorage.length) + parseInt(countRemovingRecipes)), recipeNameReset);
//     }

//     // Push recipeName to recipe Array
//     recipes.push(recipeNameReset);

//     // Run CreateButton Function
//     createButton(recipes);

//     // Display Recipe
//     displayRecipe(recipes[recipes.length - 1]);
// });

// // Create Recipe Button on the left
// function createButton(arrRecipes) {
//     recipesBtnEl.empty();

//     arrRecipes.forEach(function (data) {
//         var buttonEl = $("<button>");
//         var spanEl = $("<span>");

//         spanEl.addClass("close");
//         buttonEl.addClass("btn recipes");
//         buttonEl.attr("recipeName", data);
//         // Need to find attribute for recipe title

//         spanEl.text("x");
//         buttonEl.text(data);

//         buttonEl.append(spanEl);
//         recipesBtnEl.prepend(buttonEl);
//     });
// }

//     // Recipe Button Clicking Function
//     $("#recipesBtn").on("click", "button", function (e) {
//         e.preventDefault();

//         var RecipeName = $(this).attr("recipeName");
//         // need correct attribute for recipe name
//         for (let i = 0; i < recipes.length; i++) {
//             if (recipes[i] === RecipeName) {
//                 localStorage.setItem("lastClick", i);
//             }
//         }
//         indexLastClick = localStorage.getItem("lastClick");

//         displayRecipe(RecipeName);
//     });

//     // Function for Close button
//     $("#recipesBtn").on("click", "button .close", function (e) {
//         e.preventDefault();

//         console.log($(this).parent().attr("recipeName"));
//         console.log(recipes);

//         var removeRecipeName = $(this).parent().attr("recipeName");
//         // need correct attribute for recipe name
//         for (let i = 0; i < localStorage.length; i++) {
//             let keyName = localStorage.key(i);
//             if (removeRecipeName === localStorage.getItem(keyName)) {
//                 localStorage.removeItem(keyName);

//                 let index = recipes.indexOf(removeRecipeName);
//                 recipes.splice(index, 1);
//                 removeRecipeName = "";

//                 countRemovingRecipes = parseInt(countRemovingRecipes) + 1;
                
//                 localStorage.setItem("lastClick", 0);
//                 localStorage.setItem("isRecipeRemoved", "true");
//                 localStorage.setItem("countRemovingRecipes", countRemovingRecipes);
//             }
//         }
//         $(this).parent().css("display", "none");
//     })

//     $(".resetBtn").on("click", function (e) {
//         e.preventDefault();
//         localStorage.clear();
//         recipes = [];
//         console.log("recipes" + recipes);
//         $("#recipesBtn").text("");
//     })

// })
