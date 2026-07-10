import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe, showFavoriteButton = true }) {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.some(
      (item) => item.idMeal === recipe.idMeal
    );

    setIsFavorite(exists);
  }, [recipe.idMeal]);

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
      const updatedFavorites = [...favorites, recipe];

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(true);
      setMessage("Added to favorites ❤️");
    } else {
      setMessage("Already in favorites ❤️");
    }

    setTimeout(() => {
      setMessage("");
    }, 2000);
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
            className={`favorite-btn ${
              isFavorite ? "saved" : ""
            }`}
            onClick={addToFavorites}
          >
            {isFavorite
              ? "♥ Saved"
              : "♡ Add to Favorites"}
          </button>
        )}
      </div>

      {message && (
        <div className="toast">
          {message}
        </div>
      )}
    </article>
  );
}

export default RecipeCard;