// Fetch and insert nav.html content into the specified container
fetch('./nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
    })
    .catch(error => console.error('Error fetching nav.html:', error));

function addIngredientSection() {
    const ingredientSections = document.getElementById('ingredientSections');

    // Create a new ingredient section
    const newIngredientSection = document.createElement('div');
    newIngredientSection.className = 'ingredient-section';

    // Add input field for the section name
    newIngredientSection.innerHTML = `
            <label for="sectionName">Ingredient Section Name:</label>
            <input type="text" name="sectionName" required>
          `;

    // Create a container for ingredients within the section
    const ingredientContainer = document.createElement('div');
    ingredientContainer.className = 'ingredient-container';
    newIngredientSection.appendChild(ingredientContainer);

    // Add input fields for quantity, measurement, and ingredient
    ingredientContainer.innerHTML = `
            <label for="quantity">Quantity:</label>
            <input type="number" name="quantity" required>
            
            <label for="measurement">Measurement:</label>
            <input type="text" name="measurement" required>
            
            <label for="ingredient">Ingredient:</label>
            <input type="text" name="ingredient" required>
          `;

    // Add button to dynamically add more ingredients
    const addIngredientButton = document.createElement('button');
    addIngredientButton.type = 'button';
    addIngredientButton.textContent = 'Add Ingredient';
    addIngredientButton.onclick = function () {
        addIngredient(ingredientContainer);
    };
    newIngredientSection.appendChild(addIngredientButton);

    // Append the new ingredient section to the container
    ingredientSections.appendChild(newIngredientSection);
}

function addIngredient(container) {
    // Create a container for the new ingredient
    const ingredientContainer = document.createElement('div');
    ingredientContainer.className = 'ingredient-container';

    // Add input fields for quantity, measurement, and ingredient
    ingredientContainer.innerHTML = `
            <label for="quantity">Quantity:</label>
            <input type="number" name="quantity" required>
            
            <label for="measurement">Measurement:</label>
            <input type="text" name="measurement" required>
            
            <label for="ingredient">Ingredient:</label>
            <input type="text" name="ingredient" required>
          `;

    // Append the new ingredient container to the section's container
    container.appendChild(ingredientContainer);
}

function addInstruction() {
    // Create a container for the new instruction
    const instructionContainer = document.getElementById('instructionContainer');

    // Add textarea for the new instruction
    const newInstruction = document.createElement('div');
    newInstruction.className = 'instruction-container';
    newInstruction.innerHTML = `
            <label for="instruction">Instruction:</label>
            <textarea name="instruction" rows="4" required></textarea>
          `;

    // Append the new instruction container to the instructions container
    instructionContainer.appendChild(newInstruction);
}

function submitRecipe() {
    // Get values from the form and construct the recipe object
    const recipe = {
        title: document.getElementById('title').value,
        prepTime: document.getElementById('prepTime').value,
        cookTime: document.getElementById('cookTime').value,
        difficulty: document.getElementById('difficulty').value,
        serves: parseInt(document.getElementById('serves').value),
        dishType: document.getElementById('dishType').value,
        isVegetarian: document.getElementById('isVegetarian').value === 'yes',
        isVegan: document.getElementById('isVegan').value === 'yes',
        ingredients: getIngredients(),
        instructions: getInstructions(),
        image: document.getElementById('image').value,
    };

    // Add the new recipe to the recipes object or do something else with it
    console.log(recipe);
}

function getIngredients() {
    // Get all ingredient sections
    const ingredientSections = document.getElementsByClassName('ingredient-section');
    const ingredients = {};

    // Iterate over each ingredient section and gather values
    for (const section of ingredientSections) {
        const sectionName = section.querySelector('input[name="sectionName"]').value;
        const quantityInputs = section.querySelectorAll('input[name="quantity"]');
        const measurementInputs = section.querySelectorAll('input[name="measurement"]');
        const ingredientInputs = section.querySelectorAll('input[name="ingredient"]');

        // Initialize array for ingredients within the section
        ingredients[sectionName] = [];

        // Iterate over each input field for quantity, measurement, and ingredient
        for (let i = 0; i < quantityInputs.length; i++) {
            const quantity = quantityInputs[i].value;
            const measurement = measurementInputs[i].value;
            const ingredient = ingredientInputs[i].value;

            // Add the ingredient to the object using the section name as the key
            ingredients[sectionName].push({ quantity, measurement, ingredient });
        }
    }

    return ingredients;
}

function getInstructions() {
    // Get all instruction containers
    const instructionContainers = document.querySelectorAll('.instruction-container');
    const instructions = [];

    // Iterate over each instruction container and gather values
    for (const container of instructionContainers) {
        const instruction = container.querySelector('textarea[name="instruction"]').value;
        instructions.push(instruction);
    }

    return instructions;
}
