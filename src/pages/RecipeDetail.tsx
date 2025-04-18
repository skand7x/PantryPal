
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, ChevronLeft, Heart, Share2, Printer } from "lucide-react";
import { mockRecipes } from "@/data/mockRecipes";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, addToFavorites, removeFromFavorites, favoriteRecipes } = useAppContext();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const isFavorite = favoriteRecipes.some(r => r.id === id);

  useEffect(() => {
    // In a real app, this would be an API call to get the recipe details
    // For the mock app, we'll use the mockRecipes data
    const fetchRecipe = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundRecipe = mockRecipes.find(r => r.id === id);
        if (foundRecipe) {
          setRecipe(foundRecipe);
        } else {
          toast({
            title: "Recipe not found",
            description: "We couldn't find the recipe you're looking for.",
            variant: "destructive",
          });
          navigate("/recipes");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while loading the recipe.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, navigate, toast]);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to save recipes to your favorites.",
      });
      return;
    }
    
    if (isFavorite) {
      removeFromFavorites(id!);
      toast({
        title: "Removed from favorites",
        description: `${recipe.title} has been removed from your favorites.`,
      });
    } else {
      addToFavorites(recipe);
      toast({
        title: "Added to favorites",
        description: `${recipe.title} has been added to your favorites.`,
      });
    }
  };

  const handleShare = () => {
    toast({
      title: "Share recipe",
      description: "Sharing functionality coming soon!",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pantry-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading recipe...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto p-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate("/recipes")}
            className="bg-pantry-green hover:bg-pantry-green-dark"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Recipes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        <div className="lg:col-span-3">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{recipe.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-pantry-green mr-2" />
              <span className="text-gray-700">{recipe.readyInMinutes} minutes</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-pantry-green mr-2" />
              <span className="text-gray-700">{recipe.servings} servings</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.cuisines.map((cuisine: string, index: number) => (
              <span key={index} className="text-sm px-3 py-1 bg-pantry-orange/10 text-pantry-orange-dark rounded-full">
                {cuisine}
              </span>
            ))}
            {recipe.diets.map((diet: string, index: number) => (
              <span key={index} className="text-sm px-3 py-1 bg-pantry-green/10 text-pantry-green-dark rounded-full">
                {diet}
              </span>
            ))}
          </div>
          
          <div className="flex space-x-2 mb-8">
            <Button 
              variant="outline" 
              className={`${isFavorite ? 'text-red-500 border-red-500' : ''}`}
              onClick={handleFavoriteClick}
            >
              <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-red-500' : ''}`} />
              {isFavorite ? 'Saved' : 'Save to Favorites'}
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
          
          <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
            <img
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-semibold mb-4">About this recipe</h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          </div>
          
          <Separator className="my-8" />
          
          <div>
            <h2 className="text-2xl font-heading font-semibold mb-6">Instructions</h2>
            <div className="prose max-w-none space-y-6">
              {recipe.instructions.split('\n').filter((step: string) => step.trim()).map((step: string, index: number) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-8 h-8 rounded-full bg-pantry-green text-white flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                  <div className="mt-1">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-heading font-semibold mb-4">Ingredients</h2>
            <p className="text-sm text-gray-600 mb-4">for {recipe.servings} servings</p>
            
            <Separator className="mb-6" />
            
            <ul className="space-y-4">
              {recipe.ingredients.map((ingredient: any, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="text-pantry-green-dark mr-2">•</span>
                  <span className="text-gray-900">{ingredient.amount} {ingredient.unit} {ingredient.name}</span>
                </li>
              ))}
            </ul>
            
            <Separator className="my-6" />
            
            <Button className="w-full bg-pantry-green hover:bg-pantry-green-dark mb-2">
              Add Ingredients to Shopping List
            </Button>
            <p className="text-xs text-center text-gray-500">
              Missing something? Check your local grocery store.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
