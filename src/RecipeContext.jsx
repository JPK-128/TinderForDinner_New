import { createContext, useState } from 'react';
import sampleRecipes from './sampleRecipes';

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(sampleRecipes);

  const addRecipe = (recipe) => {
    const newRecipe = { id: Date.now(), ...recipe };
    setRecipes((prev) => [...prev, newRecipe]);
  };

  const removeRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, removeRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}
