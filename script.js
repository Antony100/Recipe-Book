const recipeName = document.getElementById("recipeName");
const prepTime = document.getElementById("prepTime");
const cookTime = document.getElementById("cookTime");
const difficulty = document.getElementById("difficulty");
const serves = document.getElementById("serves");
const dishType = document.getElementById("dishType");
const ingredientList = document.getElementById("ingredientList");
const instructions = document.getElementById("instructions");

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


// localStorage.setItem("recipes", JSON.stringify(recipes));

// console.log(localStorage)

let localStorageRecipes = JSON.parse(localStorage.recipes)
const pizzaRecipe = localStorageRecipes.pizza;

// Assign the values to the corresponding elements
recipeName.innerText = pizzaRecipe.title;
prepTime.innerText = pizzaRecipe.prepTime;
cookTime.innerText = pizzaRecipe.cookTime;
difficulty.innerText = pizzaRecipe.difficulty;
serves.innerText = pizzaRecipe.serves;
dishType.innerText = pizzaRecipe.dishType;

let ingredientsHTML = '';

for (const ingredientCategory in pizzaRecipe.ingredients) {
    if (Object.hasOwn(pizzaRecipe.ingredients, ingredientCategory)) {
        const ingredients = pizzaRecipe.ingredients[ingredientCategory];

        // Add header for the category
        ingredientsHTML += `<h3>${ingredientCategory}</h3>`;

        // Add ingredients for the category
        const ingredientsListHTML = ingredients.map(ingredient => `<p>${ingredient}</p>`).join('');
        ingredientsHTML += ingredientsListHTML;
    }
}

ingredientList.innerHTML = ingredientsHTML;

// Populate the instructions
const instructionsHTML = pizzaRecipe.instructions.map(instruction => `<p>${instruction}</p>`).join('');
instructions.innerHTML = instructionsHTML;