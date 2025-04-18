
import React, { createContext, useContext, useState, ReactNode } from "react";

type DietaryFilter = "all" | "vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "non-vegetarian";
type CuisineFilter = "all" | "italian" | "mexican" | "indian" | "chinese" | "japanese" | "thai" | "american" | "mediterranean" | "french";

interface Recipe {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  summary: string;
  instructions: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  isFavorite?: boolean;
}

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userIngredients: string[];
  setUserIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  dietaryFilter: DietaryFilter;
  setDietaryFilter: React.Dispatch<React.SetStateAction<DietaryFilter>>;
  cuisineFilter: CuisineFilter;
  setCuisineFilter: React.Dispatch<React.SetStateAction<CuisineFilter>>;
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  favoriteRecipes: Recipe[];
  setFavoriteRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (recipeId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userIngredients, setUserIngredients] = useState<string[]>([]);
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>("all");
  const [cuisineFilter, setCuisineFilter] = useState<CuisineFilter>("all");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  const addToFavorites = (recipe: Recipe) => {
    if (!favoriteRecipes.some(favRecipe => favRecipe.id === recipe.id)) {
      const updatedRecipe = { ...recipe, isFavorite: true };
      setFavoriteRecipes([...favoriteRecipes, updatedRecipe]);
      
      // Also update the recipe in the recipes list
      setRecipes(recipes.map(r => 
        r.id === recipe.id ? { ...r, isFavorite: true } : r
      ));
    }
  };

  const removeFromFavorites = (recipeId: string) => {
    setFavoriteRecipes(favoriteRecipes.filter(recipe => recipe.id !== recipeId));
    
    // Also update the recipe in the recipes list
    setRecipes(recipes.map(r => 
      r.id === recipeId ? { ...r, isFavorite: false } : r
    ));
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userIngredients,
        setUserIngredients,
        dietaryFilter,
        setDietaryFilter,
        cuisineFilter,
        setCuisineFilter,
        recipes,
        setRecipes,
        favoriteRecipes,
        setFavoriteRecipes,
        addToFavorites,
        removeFromFavorites
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
