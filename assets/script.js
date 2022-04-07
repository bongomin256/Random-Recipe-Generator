var hotbod = document.querySelector("body");

        function doStuff() {
            hotbod.className += "animate";
        }

        window.onload = function () {
            doStuff();
        };


$(document).ready(function () {
    //Initialize state
var indexLastClick = 0;
var recipes = [];
var searchBtnEl = $("#searchBtn");
var recipesBtnEl = $("#recipesBtn");
var sortedArray = [];
var recipesObjects = new Object;
var isRecipeRemoved = "";
var countRemovingRecipes = 0;
var checkNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// localStorage.clear();

// Take recipes from localStrage to recipesObjects
if (localStorage.length > 0) {
    var localStorageArray = new Array();
    for (let i = 0; i < localStorage.length; i++) {
        localStorageArray[i] = localStorage.key(i) + localStorage.getItem(localStorage.key(i));
    }
    sortedArray = localStorageArray.sort();

    for (let i = 0; i < sortedArray.length; i++) {
        if (sortedArray[i].slice(0, 9) === "lastClick") {
            recipesObjects["lastClick"] = sortedArray[i].slice(9, sortedArray[i].length);
        } else if (sortedArray[i].slice(0, 13) === "isRecipeRemoved") {
            recipesObjects["isRecipeRemoved"] = sortedArray[i].slice(12, sortedArray[i].length);
        } else if (sortedArray[i].slice(0, 19) === "countRemovingRecipes") {
            recipesObjects["countRemovingRecipes"] = sortedArray[i].slice(19, sortedArray[i].length);
        }
        else {
            if (checkNum.indexOf(sortedArray[i][1]) > -1) {
                recipesObjects[sortedArray[i].slice(0, 2)] = sortedArray[i].slice(2, sortedArray[i].length);
            } else {
                recipesObjects[sortedArray[i][0]] = sortedArray[i].slice(1, sortedArray[i].length);
            }
        }
    }
    // console.log("recipesObjects " + JSON.stringify(recipesObjects));
}

// Push recipes to recipies Array
for (keys in recipesObjects) {
    let value = recipesObjects[keys];
    if (keys === "lastClick") {
        indexLastClick = value;
    } else if (keys === "isRecipeRemoved") {
        isRecipeRemoved = value;
    } else if (keys === "countRemovingRecipes") {
        countRemovingRecipes = value;
    } else {
        recipes.push(value);
    }
}

// Check Initial Recipes in recipes Array.
console.log("initial recipes : " + recipes);

// Search recipes
searchBtnEl.on("click", function () {
    var recipeName = $("#searchInput").val().trim();

    // Recipe Name - Change First letter into Uppercase, the rest into Lowercase.
    var recipeNameReset = "";
    for (let i = 0; i < recipeName.length; i++) {
        if (i === 0) {
            recipeNameReset += recipeName[i].toUpperCase();
        } else {
            recipeNameReset += recipeName[i].toLowerCase();
        }
    }
    // Check to see if recipes repeated
    if (recipe.indexOf(recipeNameReset) > -1) {
        console.log("Repeated Recipe!!")
        alert("You alread have " + recipeNameReset + " button");
        return;
    }

    // Save Last clicked recipe's Index
    indexLastClick = recipe.length;

    // Push recipe name to LocalStorage
    if (localStorage.length === 0) {
        localStorage.setItem("lastClick", indexLastClick);
        localStorage.setItem("isRecipeRemoved", "false");
        localStorage.setItem((parseInt(localStorage.length)), recipeNameReset);
        localStorage.setItem("countRemovingRecipes", 0);
    } else {
        localStorage.setItem("lastClick", indexLastClick);
        localStorage.setItem("isRecipeRemoved", "false");
        localStorage.setItem((parseInt(localStorage.length) + parseInt(countRemovingRecipes)), recipeNameReset);
    }

    // Push recipeName to recipe Array
    recipes.push(recipeNameReset);

    // Run CreateButton Function
    createButton(recipes);

    // Display Recipe
    displayRecipe(recipes[recipes.length - 1]);
});

// Create Recipe Button on the left
function createButton(arrRecipes) {
    recipesBtnEl.empty();

    arrRecipes.forEach(function (data) {
        var buttonEl = $("<button>");
        var spanEl = $("<span>");

        spanEl.addClass("close");
        buttonEl.addClass("btn recipes");
        buttonEl.attr("recipeName", data);
        // Need to find attribute for recipe title

        spanEl.text("x");
        buttonEl.text(data);

        buttonEl.append(spanEl);
        recipesBtnEl.prepend(buttonEl);
    });
}

    // Recipe Button Clicking Function
    $("#recipesBtn").on("click", "button", function (e) {
        e.preventDefault();

        var RecipeName = $(this).attr("recipeName");
        // need correct attribute for recipe name
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i] === RecipeName) {
                localStorage.setItem("lastClick", i);
            }
        }
        indexLastClick = localStorage.getItem("lastClick");

        displayRecipe(RecipeName);
    });

    // Function for Close button
    $("#recipesBtn").on("click", "button .close", function (e) {
        e.preventDefault();

        console.log($(this).parent().attr("recipeName"));
        console.log(recipes);

        var removeRecipeName = $(this).parent().attr("recipeName");
        // need correct attribute for recipe name
        for (let i = 0; i < localStorage.length; i++) {
            let keyName = localStorage.key(i);
            if (removeRecipeName === localStorage.getItem(keyName)) {
                localStorage.removeItem(keyName);

                let index = recipes.indexOf(removeRecipeName);
                recipes.splice(index, 1);
                removeRecipeName = "";

                countRemovingRecipes = parseInt(countRemovingRecipes) + 1;
                
                localStorage.setItem("lastClick", 0);
                localStorage.setItem("isRecipeRemoved", "true");
                localStorage.setItem("countRemovingRecipes", countRemovingRecipes);
            }
        }
        $(this).parent().css("display", "none");
    })

    $(".resetBtn").on("click", function (e) {
        e.preventDefault();
        localStorage.clear();
        recipes = [];
        console.log("recipes" + recipes);
        $("#recipesBtn").text("");
    })

}
