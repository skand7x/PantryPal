
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import RecipeCard from "@/components/recipes/RecipeCard";
import { Button } from "@/components/ui/button";
import { PlusCircle, Heart } from "lucide-react";

const Favorites = () => {
  const { isAuthenticated, favoriteRecipes } = useAppContext();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold flex items-center">
            <Heart className="h-8 w-8 mr-3 text-pantry-green" />
            My Favorite Recipes
          </h1>
          <p className="text-gray-600 mt-1">All your saved recipes in one place</p>
        </div>
      </div>

      {favoriteRecipes.length > 0 ? (
        <div className="recipe-card-grid">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              readyInMinutes={recipe.readyInMinutes}
              servings={recipe.servings}
              cuisines={recipe.cuisines}
              diets={recipe.diets}
              isFavorite={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-semibold mb-2">No favorite recipes yet</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start exploring recipes and save your favorites to find them quickly later
          </p>
          <Button 
            onClick={() => navigate("/recipes")}
            className="bg-pantry-green hover:bg-pantry-green-dark"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Find Recipes
          </Button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
