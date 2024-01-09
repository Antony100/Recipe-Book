// Fetch and insert nav.html content into the specified container
fetch('./nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
    })
    .catch(error => console.error('Error fetching nav.html:', error));

const Recipes = {}


// add ingredients section and ingredients
function addIngredientSection() {
    const ingredientSections = document.getElementById('ingredientSections');

    const newIngredientSection = document.createElement('div');
    newIngredientSection.className = 'ingredient-section';

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
        <div class="row ingredient-container">
            <div class="col s4">
                <label for="quantity">Quantity:</label>
                <input type="text" name="quantity" required>
            </div>

            <div class="col s4">
                <label for="measurement">Measurement:</label>
                <input type="text" name="measurement" list="measure-select">
                <datalist id="measure-select">
                    <option value="grams">
                    <option value="kilograms">
                    <option value="millilitres">
                    <option value="litres">
                    <option value="cups">
                    <option value="teaspoon">
                    <option value="tablespoon">
                    <option value="ounces">
                    <option value="pounds">
                </datalist>
            </div>

            <div class="col s4">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" required>
            </div>
        </div>
          `;

    // dynamically add button
    const addIngredientButton = document.createElement('button');
    addIngredientButton.type = 'button';
    addIngredientButton.textContent = 'Add Ingredient';
    addIngredientButton.onclick = function () {
        addIngredient(ingredientContainer);
    };
    newIngredientSection.appendChild(addIngredientButton);
    ingredientSections.appendChild(newIngredientSection);
}

function addIngredient(container) {
    const ingredientContainer = document.createElement('div');
    ingredientContainer.className = 'ingredient-container';

    // Add input fields for quantity, measurement, and ingredient
    ingredientContainer.innerHTML = `
        <div class="row">
            <div class="col s4">
                <label for="quantity">Quantity:</label>
                <input type="text" name="quantity" required>
            </div>

            <div class="col s4">
                <label for="measurement">Measurement:</label>
                <input type="text" name="measurement" list="measure-select">
                <datalist id="measure-select">
                    <option value="grams">
                    <option value="kilograms">
                    <option value="millilitres">
                    <option value="litres">
                    <option value="cups">
                    <option value="teaspoon">
                    <option value="tablespoon">
                    <option value="ounces">
                    <option value="pounds">
                </datalist>
            </div>


            <div class="col s4">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" required>
            </div>
        </div>
          `;
    container.appendChild(ingredientContainer);
}

// add more intructions dynamically
function addInstruction() {
    const instructionContainer = document.getElementById('instructionContainer');

    const newInstruction = document.createElement('div');
    newInstruction.className = 'instruction-container';
    newInstruction.innerHTML = `
            <label for="instruction">Instruction:</label>
            <textarea name="instruction" rows="4" required></textarea>
          `;

    instructionContainer.appendChild(newInstruction);
}

function getIngredients() {
    // Get all ingredient sections
    const ingredientSections = document.getElementsByClassName('ingredient-section');
    const ingredients = {};

    // Iterate over each ingredient section and gather values
    for (const section of ingredientSections) {
        const sectionName = section.querySelector('input[name="sectionName"]').value;
        const quantityInputs = section.querySelectorAll('.ingredient-container input[name="quantity"]');
        const measurementInputs = section.querySelectorAll('.ingredient-container input[name="measurement"]');
        const ingredientInputs = section.querySelectorAll('.ingredient-container input[name="ingredient"]');

        ingredients[sectionName] = [];

        for (let i = 0; i < quantityInputs.length; i++) {
            const quantity = quantityInputs[i].value;
            const measurement = measurementInputs[i].value;
            const ingredient = ingredientInputs[i].value;

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

function submitRecipe() {
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
    return false;
}





console.log(localStorage)