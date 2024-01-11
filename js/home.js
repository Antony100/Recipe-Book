fetch('./nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
    })
    .catch(error => console.error('Error fetching nav.html:', error));

const recipes = {
    pizza: {
        title: "Margherita Pizza",
        ingredients: {
            dough: [
                '500g strong flour',
                '7g fast action yeast',
            ],
            sauce: [
                '400g tinned tomatoes',
                '1 tbsp extra virgin olive oil',
                'bunch of basil',
                '0.5 tsp dried oregano',
            ],
            toppings: [
                '50g parmesan cheese',
                '200g mozzarella, cut into chunks'
            ],
        },
        prepTime: '1 hour',
        cookTime: '40 minutes',
        difficulty: 'medium',
        serves: 2,
        dishType: 'main',
        isVegetarian: true,
        isVegan: false,
        instructions: [
            'First, make the dough. Tip the flour into a bowl and add 300ml tepid water. Mix together and set aside at room temperature for 1 hr. Dissolve the yeast in 2 tbsp water and mix this and 15g of salt through the dough. Cover with cling film and leave somewhere warm to double in size for a few hours. For a sourer flavour, leave in the fridge for at least 8 hrs and up to 24 hrs – the longer you leave it the sourer it will be.',
            'When the dough is ready, tip it onto a lightly floured surface and divide into four. Roll into balls and leave to rest, covered with a tea towel or cling film for another hour.',
            'Now make the tomato sauce. Drain some of the juice from the can and tip the rest into a bowl with the olive oil, oregano and a generous pinch of salt, then either scrunch everything together with your fingers for a chunky sauce or blitz with a stick blender if you want it smooth. Tie the basil stalks together, bruise with the back of a knife and place in the sauce. Leave the sauce at room temperature until needed.',
            'To make the pizza, heat a grill to its highest setting and get a heavy frying pan. On a floured surface push and stretch one of the balls of dough out into a circle roughly the same size as the frying pan. Slip the round onto a floured baking sheet and top with a quarter of the sauce, a scattering of cheese, a few basil leaves and a quarter of the mozzarella.',
            'Get the pan very hot and carefully slide the pizza onto it. Cook for 2 mins, then put the pan under the grill for another 2 mins until the sides are puffed up and the cheese has melted. Lift onto a board, drizzle with a little olive oil if you like, then cut into wedges and serve while you make the next one.',

        ],
        image: 'https://images.pexels.com/photos/18431672/pexels-photo-18431672/free-photo-of-sourdough-pizza-time.jpeg',

    }
};


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

    // Add an event listener to handle recipe clicks
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('recipe-image')) {
            const recipeData = JSON.parse(event.target.getAttribute('data-recipe'));
            localStorage.setItem('currentRecipe', JSON.stringify(recipeData));
            window.location.href = 'view.html';
        }
    });
});

function createCardElement(item) {
    var recipeListContainer = document.getElementById('recipeList'); // Assuming you have a container for your cards

    // Check if the recipe already exists
    if (recipeListContainer.querySelector(`[data-recipe='${JSON.stringify(item)}']`)) {
        return;
    }

    // Create a new card element
    var card = document.createElement('div');
    card.className = 'col s4 m4';

    // Define card content using a template string
    var cardContent = `
        <div class="card small no-shadows">
            <div class="card-image">
                <img src='${item.image}' class="recipe-image" data-recipe='${JSON.stringify(item)}'>
                <span class="card-title">${item.title}</span>
                <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">create</i></a>
            </div>
        </div>
    `;

    // Set the HTML content of the card element
    card.innerHTML = cardContent;

    // Append the card element to the recipeList container
    recipeListContainer.appendChild(card);
}



document.addEventListener('click', function (event) {
    if (event.target.classList.contains('recipe-image')) {
        const recipeData = JSON.parse(event.target.getAttribute('data-recipe'));
        localStorage.setItem('currentRecipe', JSON.stringify(recipeData));
        window.location.href = 'view.html';
    }
});

