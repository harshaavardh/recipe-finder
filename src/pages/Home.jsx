import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import CategoryFilter from "../components/CategoryFilter";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  async function searchRecipes(search) {
    setLoading(true);
    setSearched(true);
    setActiveCategory("");

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );

      const data = await response.json();

      setRecipes(data.meals || []);
    } catch (error) {
      console.log("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }

  async function filterByCategory(category) {
    setLoading(true);
    setSearched(true);
    setActiveCategory(category);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      const data = await response.json();

      setRecipes(data.meals || []);
    } catch (error) {
      console.log("Error filtering recipes:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchRecipes("chicken");
  }, []);

  return (
    <main className="home">
      <section className="hero">
        <h1>Find Your Favorite Recipe</h1>

        <p>
          Search for delicious recipes from around the world
        </p>

        <SearchBar onSearch={searchRecipes} />

        <CategoryFilter
          onCategorySelect={filterByCategory}
          activeCategory={activeCategory}
        />
      </section>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Finding delicious recipes...</p>
        </div>
      ) : recipes.length > 0 ? (
        <section className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
            />
          ))}
        </section>
      ) : (
        searched && (
          <h2 className="status-message">
            No recipes found 😕
          </h2>
        )
      )}
    </main>
  );
}

export default Home;