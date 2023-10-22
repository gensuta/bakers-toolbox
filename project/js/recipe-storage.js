class RecipeBook
{
    constructor(recipes)
    {
        this.recipes = recipes;
    }

    AddRecipe(recipe) 
    {
        this.recipes.push(recipe);
    }

    RemoveRecipe(recipe)
    {
        const index = this.recipes.indexOf(recipe);
        this.recipes.splice(index,1);
    }
}

class Recipe{

    /// name is a string, servingSize is a float, ingredients is an array
    constructor(name,servingSize,ingredients)
    {
        this.name = name;
        this.servingSize = servingSize;
        this.ingredients = ingredients
    }

    AddIngredient(ingredient)
    {
        this.ingredients.push(ingredient);
    }

    RemoveIngredient(ingredient)
    {
        const index = this.ingredients.indexOf(ingredient);
        this.ingredients.splice(index,1);
    }
}

class Ingredient
{
    // name is a string, amount is a float, measurement is a string
    //amount is like 1 and 1 1/2 while measurement is like cup, gram, milileter
    constructor(name,amount,measurement)
    {
        this.name = name;
        this.amount = amount;
        this.measurement = measurement
    }
}


let myRecipeBook = GetRecipeBook();

if(!myRecipeBook) // if it's empty...
{
    if(!myRecipeBook) // if it's empty...
    {
        myRecipeBook = new RecipeBook([]); // create a new recipe book!
        //myRecipeBook = getPlaceHolderBook();
        SaveRecipeBook();
    }
    else // else...
    {
        DisplayAllRecipes() // display all recipes
    }
}
else // else...
{
    const saveBtn = document.getElementById('save-recipe');
    saveBtn.onclick = function(){
       SaveRecipe(CollectRecipeInfo());
    }
}


function CollectRecipeInfo()
{
    const rows = document.querySelectorAll('tr');
    let ingredients = [];
    rows.forEach((r) =>
    {
        if (r.getElementsByTagName("th").length == 0)
        {
            const name = r.getElementsByTagName("td")[0].querySelector('input').value;

            const amt = r.getElementsByTagName("td")[1].querySelector('input').value;

            const units = (!r.getElementsByTagName("td")[2].querySelector('input').value) 
                ? " " 
                : r.getElementsByTagName("td")[0].querySelector('input').value;

            ingredients.push(new Ingredient(name,amt,units));
        }
    });

    const recipeName = document.getElementById('recipeName').value;
    const servingSize = (document.getElementById('Conversion_factor').value > 0) 
        ? document.getElementById('Conversion_factor').value
        : 1;

    return new Recipe(recipeName,servingSize,ingredients);
}


function getPlaceHolderBook()
{
    const butter = new Ingredient("butter", 1, "stick");
    const egg = new Ingredient("egg",1,"");
    const milk = new Ingredient("milk",2,"cup");
    const chocolateSyrup = new Ingredient("chocolate syrup", 1, "tablespoon");

    const friedEgg = new Recipe("Fried Eggs",1,[egg,butter]);
    const chocolateMilk = new Recipe("Chocolate Milk", 1, [milk, chocolateSyrup]);
    const failedPancake = new Recipe("Not a Pancake", 4, [butter,egg,milk,chocolateSyrup]);

    const recipeBook = new RecipeBook([friedEgg,chocolateMilk,failedPancake]);

    return recipeBook;
}



// Is called at the start of the recipes page.
function DisplayAllRecipes()
{
    myRecipeBook.recipes.forEach(recipe => {
        if(recipe) // if the recipe isn't null/undefined
        {
            DisplayRecipe(recipe);
        }
    });
}

// Creates a list item and a card to display all the recipe details in the recipe page's collection
function DisplayRecipe(recipe)
{
    // Setting up the layout for the recipe before inputing the information in
    const collection = document.getElementById("recipe-list");


    const li = document.createElement("li");
    li.classList.add("collection-item");

    const a = document.createElement("a");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card","small","hoverable");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("card-image");

    const cardImg = document.createElement("img");

    const titleSpan = document.createElement("span");
    titleSpan.classList.add("card-title");

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("card-content");


    collection.appendChild(li);
    li.appendChild(a);
    a.appendChild(cardDiv);
    cardDiv.appendChild(imgDiv);
    imgDiv.appendChild(cardImg);
    imgDiv.appendChild(titleSpan);
    cardDiv.appendChild(contentDiv);


    // Filling out information for the recipe
    titleSpan.textContent = recipe.name;
    cardImg.src = "https://loremflickr.com/320/240/food"; // placeholder

    let i = 0;

    while(i < 3 && i < recipe.ingredients.length)
    {
        const ingredient = document.createElement("span");
        contentDiv.appendChild(ingredient);
        ingredient.textContent = ` | ${recipe.ingredients[i].amount} ${recipe.ingredients[i].name}`
        i++;
    }

    if(i == 3 && recipe.ingredients.length > 3)
    {
        const ingredient = document.createElement("span");
        contentDiv.appendChild(ingredient);
        ingredient.textContent = ' etc.'
    }


}

//Adds a new recipe to the list of recipes
function SaveRecipe(recipe)
{
    if(!myRecipeBook)
    {
        myRecipeBook = new RecipeBook([]);
    }
    myRecipeBook.recipes.push(recipe);
    SaveRecipeBook();
   // myRecipeBook.AddRecipe(recipe); // this sin't working for some reason and we're runnign out of time
}

//Stores recipe book to local storage
function SaveRecipeBook()
{
    window.localStorage.setItem("myRecipeBook",JSON.stringify(myRecipeBook));
}

//Gets the list of recipes from our saved recipe book
function GetRecipeBook()
{
    return JSON.parse(window.localStorage.getItem("myRecipeBook"));
}

// Handles Responsiveness for the navbar
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });