let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let recipe_name = document.getElementById("search_recipe").value;
  let container = document.getElementById("container");
  container.innerHTML = "<h2>Loading...</h2>"; // Show Loading Indicator

  let fetchRecipes = async () => {
    let recipes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe_name}`);
    let finalRecipeData = await recipes.json();

    container.innerHTML = ""; // Clear previous results

    if (!finalRecipeData.meals) {
      container.innerHTML = "<h2>No recipes found. Try another search.</h2>";
      return;
    }

    finalRecipeData.meals.forEach((ele) => {
      let recipe_item = document.createElement("div");
      recipe_item.setAttribute("id", "recipe_item");
      container.appendChild(recipe_item);

      let food_img = document.createElement("img");
      food_img.src = ele.strMealThumb;
      food_img.setAttribute("id", "food_img");

      let recipe_name = document.createElement("h2");
      recipe_name.innerHTML = ele.strMeal;
      recipe_name.setAttribute("id", "recipe_name");

      let view_recipe = document.createElement("button");
      view_recipe.innerHTML = "View Recipe";
      view_recipe.setAttribute("id", "view_recipe");

      recipe_item.append(food_img, recipe_name, view_recipe);

      let ing_ins = document.querySelector("#ing_ins");
      view_recipe.addEventListener("click", () => {
        ing_ins.style.display = "block";
        
        let ing_info = document.getElementById("ing_info");
        ing_info.innerHTML = "<h1>INGREDIENTS</h1>"; // Fixed duplicate issue
        let ul = document.createElement("ul");

        for (let i = 1; i <= 20; i++) {
          let ingredient = ele[`strIngredient${i}`];
          let measure = ele[`strMeasure${i}`];

          if (ingredient && measure) { // Fixed empty ingredient issue
            let li = document.createElement("li");
            li.innerHTML = `${ingredient} - ${measure}`;
            ul.appendChild(li);
          }
        }
        ing_info.appendChild(ul);

        let ins_info = document.getElementById("ins_info");
        ins_info.innerHTML = `
          <h1>INSTRUCTIONS</h1>
          <p>${ele.strInstructions}</p>
        `;
      });

      let close = document.querySelector("#close");
      close.addEventListener("click", () => {
        ing_ins.style.display = "none";
      });
    });
  };

  fetchRecipes();
});
