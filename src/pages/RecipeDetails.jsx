import { useEffect, useState } from "react";
import { useParam, useNavigate } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParam();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function getRecipe() {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      const data = await response.json();

      setRecipe(data.meals[0]);
    }

    getRecipe();
  }, [id]);

  if (!recipe) {
    return <h2 className="loading">Loading...</h2>;
  }

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient: ingredient,
        measure: measure
      });
    }
  }

  return (
    <main className="details-page">
      <button
  className="back-btn"
  onClick={() => navigate(-1)}
>
  ← Back
</button>

      <div className="details-header">

        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />

        <div>
          <h1>{recipe.strMeal}</h1>

          <p>
            <strong>Category:</strong> {recipe.strCategory}
          </p>

          <p>
            <strong>Area:</strong> {recipe.strArea}
          </p>
        </div>

      </div>

      <section className="ingredients-section">

        <h2>Ingredients</h2>

        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>
              {item.measure} {item.ingredient}
            </li>
          ))}
        </ul>

      </section>

      <section className="instructions-section">

        <h2>Instructions</h2>

        <p>{recipe.strInstructions}</p>

      </section>

    </main>
  );
}

export default RecipeDetails;