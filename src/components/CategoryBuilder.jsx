import { useState } from "react";

function CategoryBuilder({ categories, setCategories }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");

  const addCategory = () => {
    if (!name || !weight) return;

    const newCategory = {
      id: Date.now(),
      name: name.trim(),
      weight: Number(weight),
    };

    setCategories([...categories, newCategory]);
    setName("");
    setWeight("");
  };

  const removeCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const totalWeight = categories.reduce(
    (sum, cat) => sum + cat.weight,
    0
  );

  return (
    <div className="category-builder">
      <h4>Add Assessment Category</h4>

      <div className="category-builder-row">
        <input
          className="input-field"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input-field"
          type="number"
          placeholder="Weight %"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <button type="button" className="btn-secondary" onClick={addCategory}>
          Add
        </button>
      </div>

      <div className="template-category-list">
        {categories.map((cat) => (
          <div key={cat.id} className="template-category-row">
            <span>{cat.name}</span>
            <div className="template-category-actions">
              <strong>{cat.weight}%</strong>
              <button type="button" className="btn-link-danger" onClick={() => removeCategory(cat.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="summary-helper">Total Weight: {totalWeight}%</p>
      {totalWeight !== 100 && (
        <p className="error-text">
          Total weight must equal 100%
        </p>
      )}
    </div>
  );
}

export default CategoryBuilder;
