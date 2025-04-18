
import { useState } from "react";
import IngredientInput from "@/components/ingredients/IngredientInput";
import FilterBar from "@/components/recipes/FilterBar";
import RecipeGrid from "@/components/recipes/RecipeGrid";

const Recipes = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-pantry-green/10 py-12">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-center mb-6">
            Find Recipes with Your Ingredients
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Enter the ingredients you have on hand, and we'll show you delicious recipes you can make right now.
          </p>
          
          <IngredientInput />
        </div>
      </div>
      
      <FilterBar />
      <RecipeGrid />
    </div>
  );
};

export default Recipes;
