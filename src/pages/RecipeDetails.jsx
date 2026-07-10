import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getRecipe() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          setError("Recipe not found");
        }
      } catch (error) {
        console.log(error);
        setError("Unable to load recipe");
      } finally {
        setLoading(false);
      }
    }

    getRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <main className="recipe-error">
        <h1>😕</h1>
        <h2>{error}</h2>

        <button onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </main>
    );
  }

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient,
        measure
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