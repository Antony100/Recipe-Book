fetch('./nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
    })
    .catch(error => console.error('Error fetching nav.html:', error));

document.addEventListener('DOMContentLoaded', function () {
    const items = { ...localStorage };

    for (const key in items) {
        if (items.hasOwnProperty(key)) {
            try {
                const currentItem = JSON.parse(items[key]);
                createCardElement(currentItem);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    }

    document.addEventListener('click', function (event) {
        const deleteButton = event.target.closest('#deleteRecipe');

        if (deleteButton) {
            const card = deleteButton.closest('.recipe-card');
            if (card) {
                const recipeData = JSON.parse(card.querySelector('.recipe-image').getAttribute('data-recipe'));
                const confirmDelete = confirm(`Are you sure you want to delete the recipe: ${recipeData.title}?`);

                if (confirmDelete) {
                    deleteRecipe(recipeData);
                    card.remove();
                }
            }
        } else if (event.target.classList.contains('recipe-image')) {
            const recipeData = JSON.parse(event.target.getAttribute('data-recipe'));
            localStorage.setItem('currentRecipe', JSON.stringify(recipeData));
            window.location.href = 'view.html';
        } else if (event.target.id === 'randomRecipe') {
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

});

function createCardElement(item) {
    let recipeListContainer = document.getElementById('recipeList');

    // Check if the recipe already exists
    if (recipeListContainer.querySelector(`[data-recipe='${JSON.stringify(item)}']`)) {
        return;
    }

    let card = document.createElement('div');
    card.className = 'col s4 m4 recipe-card';

    let cardContent = `
        <div class="card small no-shadows">
            <div class="card-image">
                <img src='${item.image}' class="recipe-image" data-recipe='${JSON.stringify(item)}'>
                <span class="card-title">${item.title}</span>
                <a id="deleteRecipe" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete_forever</i></a>
            </div>
        </div>
    `;

    card.innerHTML = cardContent;
    recipeListContainer.appendChild(card);
}

function deleteRecipe(recipeData) {
    // Remove the recipe from localStorage
    localStorage.removeItem(recipeData.title);
}

function getRandomRecipe(obj) {
    let keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
};