fetch('./nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
    })
    .catch(error => console.error('Error fetching nav.html:', error));

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

function addIngredientSection() {
    const ingredientSections = document.getElementById('ingredientSections');

    const newIngredientSection = document.createElement('div');
    newIngredientSection.className = 'ingredient-section';

    newIngredientSection.innerHTML = `
        <label for="sectionName">Ingredient Section Name:</label>
        <input type="text" name="sectionName" required>
        <button type="button" class="delete-section-btn" onclick="deleteSection(this)">Delete Section</button>
    `;

    const ingredientContainer = document.createElement('div');
    ingredientContainer.className = 'ingredient-container';
    newIngredientSection.appendChild(ingredientContainer);

    ingredientContainer.innerHTML = `
        <div class="row ingredient-container">
            <div class="col s3">
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

            <div class="col s1">
                <a class="delete-ingredient-btn" onclick="deleteIngredient(this)"><i class="material-icons icon-medium">delete_forever</i></a>
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

    ingredientContainer.innerHTML = `
        <div class="row">
            <div class="col s3">
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

            <div class="col s1">
                <a class="delete-ingredient-btn" onclick="deleteIngredient(this)"><i class="material-icons icon-medium">delete_forever</i></a>
            </div>
        </div>
    `;

    // Add event listener for the delete ingredient button
    const deleteIngredientButton = ingredientContainer.querySelector('.delete-ingredient-btn');
    deleteIngredientButton.addEventListener('click', function () {
        deleteIngredient(this);
    });

    container.appendChild(ingredientContainer);
}

function addInstruction() {
    const instructionContainer = document.getElementById('instructionContainer');

    const newInstruction = document.createElement('div');
    newInstruction.className = 'instruction-container';
    newInstruction.innerHTML = `
    <div class="col s11">
        <label for="instruction">Instruction:</label>
        <textarea name="instruction" rows="4" required></textarea>
    </div>

    <div class="col s1">
        <a class="delete-instruction-btn" onclick="deleteInstruction(this)"><i class="material-icons icon-medium">delete_forever</i></a>
    </div>
    `;

    instructionContainer.appendChild(newInstruction);
}

function deleteSection(button) {
    const section = button.closest('.ingredient-section');
    section.remove();
}

function deleteIngredient(button) {
    const ingredient = button.closest('.ingredient-container');
    ingredient.remove();
}

function deleteInstruction(button) {
    const instruction = button.closest('.instruction-container');
    instruction.remove();
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
    const instructionContainers = document.querySelectorAll('.instruction-container');
    const instructions = [];

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
        serves: document.getElementById('serves').value,
        dishType: document.getElementById('dishType').value,
        isVegetarian: document.getElementById('isVegetarian').value === 'yes',
        isVegan: document.getElementById('isVegan').value === 'yes',
        ingredients: getIngredients(),
        instructions: getInstructions(),
        image: document.getElementById('image').value,
    };

    localStorage.setItem(recipe.title, JSON.stringify(recipe));
    window.location.href = "http://127.0.0.1:5500/Recipe-Book/home.html"
    return false;
}
