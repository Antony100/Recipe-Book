const recipes = {
    pizza: {
        title: "Margherita Pizza",
        ingredients: {
            dough: [
                { quantity: 500, measurement: 'grams', ingredient: 'strong flour' },
                { quantity: 7, measurement: 'grams', ingredient: 'fast action yeast' },
            ],
            sauce: [
                { quantity: 400, measurement: 'grams', ingredient: 'tinned tomatoes' },
                { quantity: 1, measurement: 'tbsp', ingredient: 'extra virgin olive oil' },
                { quantity: 1, ingredient: 'bunch of basil' },
                { quantity: 0.5, measurement: 'tsp', ingredient: 'dried oregano' },
            ],
            toppings: [
                { quantity: 50, measurement: 'grams', ingredient: 'parmesan cheese' },
                { quantity: 200, measurement: 'grams', ingredient: 'mozzarella, cut into chunks' }
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
        ],
        image: 'https://images.pexels.com/photos/18431672/pexels-photo-18431672/free-photo-of-sourdough-pizza-time.jpeg',

    }
};
