fetch('./nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
    })
    .catch(error => console.error('Error fetching nav.html:', error));

document.addEventListener('DOMContentLoaded', function () {
    const currentRecipeData = JSON.parse(localStorage.getItem('currentRecipe'));

    if (currentRecipeData) {
        document.getElementById('recipeTitle').innerHTML = `<h2>${currentRecipeData.title}</h2>`;
        document.getElementById('prepTime').textContent = `Prep time: ${currentRecipeData.prepTime}`;
        document.getElementById('cookTime').textContent = `Cook time: ${currentRecipeData.cookTime}`;
        document.getElementById('dishType').textContent = `Dish Type: ${currentRecipeData.dishType}`;
        document.getElementById('difficulty').textContent = `Difficulty: ${currentRecipeData.difficulty}`;
        document.getElementById('isVegetarian').textContent = `Vegetarian: ${currentRecipeData.isVegetarian ? 'Yes' : 'No'}`;
        document.getElementById('isVegan').textContent = `Vegan: ${currentRecipeData.isVegan ? 'Yes' : 'No'}`;
        document.getElementById('recipeImage').innerHTML = `<img src="${currentRecipeData.image}">`;

        const ingredientList = document.getElementById('ingredientList');
        ingredientList.innerHTML = '<h5>Ingredients</h5>';
        for (const category in currentRecipeData.ingredients) {
            ingredientList.innerHTML += `<h6>${category}</h6><ul>`;
            currentRecipeData.ingredients[category].forEach(ingredient => {
                ingredientList.innerHTML += `<li>${ingredient.quantity} ${ingredient.measurement} ${ingredient.ingredient}</li>`;
            });
            ingredientList.innerHTML += '</ul>';
        }

        const methodSection = document.getElementById('method');
        methodSection.innerHTML = '<h5>Method</h5>';
        currentRecipeData.instructions.forEach(instruction => {
            methodSection.innerHTML += `<p>${instruction}</p>`;
        });

    }

});

document.addEventListener('click', function (event) {
    if (event.target.id === 'randomRecipe') {
        const allRecipes = Object.values(localStorage).map(JSON.parse);

        if (localStorage.length > 0) {
            let randomRecipe = getRandomRecipe(allRecipes)

            localStorage.setItem('currentRecipe', JSON.stringify(randomRecipe));
            window.location.href = 'view.html';
        } else {
            alert('No recipes available. Add some recipes first.');
        }
    }

});

function getRandomRecipe(obj) {
    let keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
};