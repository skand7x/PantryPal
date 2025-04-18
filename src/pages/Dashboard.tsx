
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecipeCard from "@/components/recipes/RecipeCard";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, History, Heart } from "lucide-react";

const Dashboard = () => {
  const { isAuthenticated, favoriteRecipes } = useAppContext();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Mock recent searches - in a real app, this would come from the database
  const recentSearches = [
    { id: "1", ingredients: ["Chicken", "Rice", "Bell Pepper"], date: "2023-04-17" },
    { id: "2", ingredients: ["Pasta", "Tomato", "Basil"], date: "2023-04-15" },
    { id: "3", ingredients: ["Beef", "Potato", "Carrot"], date: "2023-04-12" },
  ];

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold">My Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your recipes and preferences</p>
        </div>
        <Button
          variant="outline"
          className="mt-4 md:mt-0"
          onClick={() => navigate("/profile-settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Profile Settings
        </Button>
      </div>

      <Tabs defaultValue="favorites" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="favorites" className="flex items-center">
            <Heart className="mr-2 h-4 w-4" />
            Favorite Recipes
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <History className="mr-2 h-4 w-4" />
            Search History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="favorites">
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
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="flex flex-col items-center py-8">
                  <Heart className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No favorite recipes yet</h3>
                  <p className="text-gray-500 mb-6">
                    Save recipes you love to find them quickly later
                  </p>
                  <Button 
                    onClick={() => navigate("/recipes")}
                    className="bg-pantry-green hover:bg-pantry-green-dark"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Find Recipes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            {recentSearches.map((search) => (
              <Card key={search.id}>
                <CardHeader className="py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-base">
                        Search #{search.id}
                      </CardTitle>
                      <CardDescription>
                        {new Date(search.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // In a real app, we would apply these ingredients to a new search
                        navigate("/recipes");
                      }}
                    >
                      Search Again
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {search.ingredients.map((ingredient, index) => (
                      <div key={index} className="ingredient-tag">
                        {ingredient}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
