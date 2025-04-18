
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, Heart } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";

interface RecipeProps {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  cuisines: string[];
  diets: string[];
  isFavorite?: boolean;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const RecipeCard = ({
  id,
  title,
  image,
  readyInMinutes,
  servings,
  cuisines,
  diets,
  isFavorite = false,
  nutrition,
}: RecipeProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated, addToFavorites, removeFromFavorites, recipes } = useAppContext();
  const { toast } = useToast();

  const fullRecipe = recipes.find(recipe => recipe.id === id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to save recipes to your favorites.",
      });
      return;
    }
    
    if (isFavorite) {
      removeFromFavorites(id);
      toast({
        title: "Removed from favorites",
        description: `${title} has been removed from your favorites.`,
      });
    } else if (fullRecipe) {
      addToFavorites(fullRecipe);
      toast({
        title: "Added to favorites",
        description: `${title} has been added to your favorites.`,
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-transform duration-200 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
          onClick={handleFavoriteClick}
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </Button>
      </div>

      <CardContent className="p-4">
        <h3 className="font-heading font-medium text-lg line-clamp-2 mb-2">{title}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <div className="flex items-center mr-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>{readyInMinutes} min</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{servings} servings</span>
          </div>
        </div>

        {nutrition && (
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div className="bg-gray-50 p-2 rounded">
              <span className="text-gray-600">Calories:</span>
              <span className="ml-1 font-medium">{nutrition.calories}</span>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <span className="text-gray-600">Protein:</span>
              <span className="ml-1 font-medium">{nutrition.protein}g</span>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <span className="text-gray-600">Carbs:</span>
              <span className="ml-1 font-medium">{nutrition.carbs}g</span>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <span className="text-gray-600">Fat:</span>
              <span className="ml-1 font-medium">{nutrition.fat}g</span>
            </div>
          </div>
        )}
        
        <Separator className="my-3" />
        
        <div className="flex flex-wrap gap-1 mt-2">
          {cuisines.length > 0 && (
            <span className="text-xs px-2 py-1 bg-pantry-orange/10 text-pantry-orange-dark rounded-full">
              {cuisines[0]}
            </span>
          )}
          
          {diets.slice(0, 2).map((diet, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-pantry-green/10 text-pantry-green-dark rounded-full"
            >
              {diet}
            </span>
          ))}
          
          {diets.length > 2 && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
              +{diets.length - 2} more
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
