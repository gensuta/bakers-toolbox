var options = {
    inDuration: 300,
    outDuration: 200,
};

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
});

function getSubstitutes() {
    var mykey = config.MY_KEY;
    const ingredient = document.getElementById("searchInput").value;
    console.log('Ingredient:', ingredient);
    if (!ingredient) {
        alert("Please enter an ingredient.");
        return;
    }
    const url = `https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=${ingredient}&apiKey=7f11394b36b34b8db8ac66cee8c16f0b`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySubstitutes(data);
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
}

function displaySubstitutes(data) {
    const substitutesList = document.getElementById("substitutesList");
    substitutesList.innerHTML = "";
    console.log(data);
    if (data.substitutes && data.substitutes.length > 0) {
        const list = document.createElement("ul");

        data.substitutes.forEach(substitute => {
            const item = document.createElement("li");
            item.textContent = substitute;
            list.appendChild(item);
        });

        substitutesList.appendChild(list);
    } else {
        substitutesList.textContent = "No substitutes found.";
    }
}
