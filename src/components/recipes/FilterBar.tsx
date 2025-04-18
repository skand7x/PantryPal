
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FilterBar = () => {
  const { dietaryFilter, setDietaryFilter, cuisineFilter, setCuisineFilter } = useAppContext();

  const dietaryOptions = [
    { value: "all", label: "All Diets" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "gluten-free", label: "Gluten-Free" },
    { value: "dairy-free", label: "Dairy-Free" },
    { value: "non-vegetarian", label: "Non-Vegetarian" },
  ];

  const cuisineOptions = [
    { value: "all", label: "All Cuisines" },
    { value: "italian", label: "Italian" },
    { value: "mexican", label: "Mexican" },
    { value: "indian", label: "Indian" },
    { value: "chinese", label: "Chinese" },
    { value: "japanese", label: "Japanese" },
    { value: "thai", label: "Thai" },
    { value: "american", label: "American" },
    { value: "mediterranean", label: "Mediterranean" },
    { value: "french", label: "French" },
  ];

  return (
    <div className="w-full bg-white py-3 border-b sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="mr-3">
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          
          {/* Dietary Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className={`rounded-full text-sm px-4 py-1 h-auto ${
                  dietaryFilter === option.value ? "diet-filter-active" : ""
                }`}
                onClick={() => setDietaryFilter(option.value as any)}
              >
                {option.label}
              </Button>
            ))}
          </div>
          
          {/* Cuisine Dropdown */}
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white">
                  {cuisineOptions.find(option => option.value === cuisineFilter)?.label}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {cuisineOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setCuisineFilter(option.value as any)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
