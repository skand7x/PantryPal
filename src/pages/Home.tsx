
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Utensils, Globe, Filter, Clock, Heart } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Utensils className="h-6 w-6 text-pantry-green" />,
      title: "Ingredient-Based Search",
      description: "Discover recipes based on what's already in your pantry"
    },
    {
      icon: <Globe className="h-6 w-6 text-pantry-green" />,
      title: "Global Cuisines",
      description: "Explore dishes from around the world with diverse flavors"
    },
    {
      icon: <Filter className="h-6 w-6 text-pantry-green" />,
      title: "Dietary Filters",
      description: "Find recipes that match your dietary preferences and restrictions"
    },
    {
      icon: <Clock className="h-6 w-6 text-pantry-green" />,
      title: "Quick Recipes",
      description: "Sort by cooking time to find meals that fit your schedule"
    },
    {
      icon: <Heart className="h-6 w-6 text-pantry-green" />,
      title: "Save Favorites",
      description: "Create a personal collection of your favorite recipes"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pantry-green/90 to-pantry-green-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Turn Your Ingredients into Delicious Meals
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              PantryPal helps you discover recipes from around the world using the ingredients you already have.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-white text-pantry-green-dark hover:bg-white/90 text-lg px-6 py-6 h-auto"
                onClick={() => navigate("/recipes")}
              >
                Find Recipes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                className="bg-white text-pantry-green-dark hover:bg-white/90 text-lg px-6 py-6 h-auto"
                onClick={() => navigate("/signup")}
              >
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80" 
                alt="Fresh ingredients on rustic wooden table" 
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1514516345957-556ca7f36293?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Colorful healthy meal preparation" 
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            How PantryPal Works
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Our intelligent recipe finder makes cooking simple and waste-free
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="bg-pantry-green/10 p-3 rounded-lg mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-xl mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Wall Showcase Section */}
      <section className="bg-pantry-neutral-lightest py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            Community Creations
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            See what other food enthusiasts are cooking and share your own culinary masterpieces
          </p>
          
          <div className="flex justify-center mb-8">
            <Button 
              className="bg-pantry-green hover:bg-pantry-green-dark text-lg px-8 py-6 h-auto"
              onClick={() => navigate("/recipe-wall")}
            >
              Explore Recipe Wall
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* Sample images - in a real app these would come from the database */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative group overflow-hidden rounded-lg">
                <img 
                  src={`https://images.unsplash.com/photo-151${i}385352656-41229b4f7e7${i}?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80`}
                  alt={`Community recipe ${i}`}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-3 text-white">
                    <p className="font-medium text-sm truncate">Homemade pasta</p>
                    <p className="text-xs text-white/80">By @chef{i}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-pantry-neutral-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Start Cooking?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Enter your ingredients and discover thousands of delicious recipes from around the world.
          </p>
          <Button 
            className="bg-pantry-green hover:bg-pantry-green-dark text-lg px-8 py-6 h-auto"
            onClick={() => navigate("/recipes")}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
