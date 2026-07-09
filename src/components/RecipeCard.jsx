import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe, showFavoriteButton = true }) {
  const navigate = useNavigate();

  function viewRecipe() {
    navigate(`/recipe/${recipe.idMeal}`);
  }

  function addToFavorites() {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const alreadyExists = favorites.some(
      (item) => item.idMeal === recipe.idMeal
    );

    if (!alreadyExists) {
      favorites.push(recipe);

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      alert("Recipe added to favorites!");
    } else {
      alert("Recipe already in favorites!");
    }
  }

  return (
    <article className="recipe-card">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <div className="card-content">
        <h2>{recipe.strMeal}</h2>

        {recipe.strCategory && recipe.strArea && (
  <p>
    {recipe.strCategory} • {recipe.strArea}
  </p>
)}
        <button onClick={viewRecipe}>
          View Recipe
        </button>

        {showFavoriteButton && (
          <button
            className="favorite-btn"
            onClick={addToFavorites}
          >
            ♡ Add to Favorites
          </button>
        )}
      </div>
    </article>
  );
}

export default RecipeCard;