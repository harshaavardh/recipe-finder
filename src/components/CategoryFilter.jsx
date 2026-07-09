function CategoryFilter({ onCategorySelect, activeCategory }) {
  const categories = [
    "Chicken",
    "Seafood",
    "Vegetarian",
    "Pasta",
    "Dessert"
  ];

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={activeCategory === category ? "active" : ""}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;