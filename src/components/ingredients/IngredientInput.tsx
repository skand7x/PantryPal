
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/AppContext";
import { ChevronDown, X, Plus, Mic, Scan } from "lucide-react";

// Mock ingredient suggestions - in a real app, this would come from an API
const INGREDIENT_SUGGESTIONS = [
  "Tomato", "Onion", "Garlic", "Potato", "Carrot", "Chicken", "Beef", "Rice", 
  "Pasta", "Egg", "Milk", "Cheese", "Butter", "Olive Oil", "Flour", "Sugar", 
  "Salt", "Pepper", "Basil", "Cilantro", "Lemon", "Lime", "Bell Pepper"
];

const IngredientInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const { userIngredients, setUserIngredients } = useAppContext();
  const { toast } = useToast();

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = INGREDIENT_SUGGESTIONS.filter(
        (ingredient) => ingredient.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue]);

  const addIngredient = (ingredient: string) => {
    if (ingredient.trim() === "") return;
    
    const formattedIngredient = ingredient.trim();
    if (userIngredients.includes(formattedIngredient)) {
      toast({
        title: "Ingredient already added",
        description: `${formattedIngredient} is already in your list.`,
      });
      return;
    }
    
    setUserIngredients([...userIngredients, formattedIngredient]);
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setUserIngredients(userIngredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice input",
      description: "Voice input feature is coming soon!",
    });
  };

  const handleBarcodeScanning = () => {
    toast({
      title: "Barcode scanning",
      description: "Barcode scanning feature is coming soon!",
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="flex">
          <Input
            type="text"
            placeholder="Add ingredients (e.g., tomato, chicken, rice)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full border-r-0 rounded-r-none focus-visible:ring-pantry-green"
            onFocus={() => inputValue.length > 0 && setShowSuggestions(true)}
          />
          <div className="flex border border-l-0 rounded-r-md overflow-hidden">
            <button 
              onClick={handleVoiceInput}
              className="px-3 bg-white hover:bg-gray-50"
              title="Voice input"
            >
              <Mic className="h-4 w-4 text-gray-500" />
            </button>
            <button 
              onClick={handleBarcodeScanning}
              className="px-3 bg-white hover:bg-gray-50"
              title="Scan barcode"
            >
              <Scan className="h-4 w-4 text-gray-500" />
            </button>
            <Button 
              onClick={() => addIngredient(inputValue)}
              className="rounded-l-none bg-pantry-green hover:bg-pantry-green-dark"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  addIngredient(suggestion);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      {userIngredients.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {userIngredients.map((ingredient, index) => (
              <div
                key={index}
                className="ingredient-tag flex items-center"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-2 text-pantry-green-dark hover:text-pantry-green-dark/80"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
