import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  }, []);

  function removeFavorite(id) {
    const updatedFavorites = favorites.filter(
      (recipe) => recipe.idMeal !== id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  }

  return (
    <main className="favorites-page">
      <h1>My Favorite Recipes ❤️</h1>

      {favorites.length === 0 ? (
        <p className="empty-message">
          You haven't added any favorite recipes yet.
        </p>
      ) : (
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <div key={recipe.idMeal}>
              <RecipeCard
  recipe={recipe}
  showFavoriteButton={false}
/>

              <button
                className="remove-btn"
                onClick={() =>
                  removeFavorite(recipe.idMeal)
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;