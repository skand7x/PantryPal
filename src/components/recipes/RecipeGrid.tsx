
import { useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Mock recipes data - in a real app, this would come from an API
import { mockRecipes } from "@/data/mockRecipes";

const RecipeGrid = () => {
  const {
    userIngredients,
    dietaryFilter,
    cuisineFilter,
    recipes,
    setRecipes,
    favoriteRecipes
  } = useAppContext();
  const { toast } = useToast();

  const searchRecipes = () => {
    if (userIngredients.length === 0) {
      toast({
        title: "No ingredients selected",
        description: "Please add at least one ingredient to search for recipes.",
      });
      return;
    }

    // In a real app, this would be an API call
    // For now, we'll use the mock data and filter it based on user selections
    const searchResults = mockRecipes.filter(recipe => {
      // Check if recipe contains at least one of the user's ingredients
      const hasIngredient = userIngredients.some(ingredient => 
        recipe.ingredients.some(recipeIngredient => 
          recipeIngredient.name.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
      
      // Apply dietary filter
      const matchesDiet = dietaryFilter === "all" || recipe.diets.some(diet => 
        diet.toLowerCase() === dietaryFilter.toLowerCase()
      );
      
      // Apply cuisine filter
      const matchesCuisine = cuisineFilter === "all" || recipe.cuisines.some(cuisine => 
        cuisine.toLowerCase() === cuisineFilter.toLowerCase()
      );
      
      return hasIngredient && matchesDiet && matchesCuisine;
    });

    // Mark favorites
    const resultsWithFavorites = searchResults.map(recipe => ({
      ...recipe,
      isFavorite: favoriteRecipes.some(fav => fav.id === recipe.id)
    }));

    setRecipes(resultsWithFavorites);

    toast({
      title: `Found ${searchResults.length} recipes`,
      description: `Based on your ${userIngredients.length} ingredient${userIngredients.length > 1 ? 's' : ''} and filters.`,
    });
  };

  // Apply filters when they change (without new search)
  useEffect(() => {
    if (recipes.length > 0) {
      const filteredRecipes = recipes.filter(recipe => {
        // Apply dietary filter
        const matchesDiet = dietaryFilter === "all" || recipe.diets.some(diet => 
          diet.toLowerCase() === dietaryFilter.toLowerCase()
        );
        
        // Apply cuisine filter
        const matchesCuisine = cuisineFilter === "all" || recipe.cuisines.some(cuisine => 
          cuisine.toLowerCase() === cuisineFilter.toLowerCase()
        );
        
        return matchesDiet && matchesCuisine;
      });

      setRecipes(filteredRecipes);
    }
  }, [dietaryFilter, cuisineFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <Button
          className="bg-pantry-green hover:bg-pantry-green-dark text-white px-6 py-2"
          onClick={searchRecipes}
        >
          <Search className="mr-2 h-5 w-5" />
          Find Recipes
        </Button>
      </div>

      {recipes.length > 0 ? (
        <div className="recipe-card-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              readyInMinutes={recipe.readyInMinutes}
              servings={recipe.servings}
              cuisines={recipe.cuisines}
              diets={recipe.diets}
              isFavorite={recipe.isFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-600 mb-4">No recipes found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Add ingredients and click "Find Recipes" to discover delicious meals you can make.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;
