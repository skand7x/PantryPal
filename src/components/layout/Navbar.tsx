
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { Menu, X, User, ChefHat, Heart, LogIn, LogOut, Home } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAppContext();
  const { toast } = useToast();

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ChefHat className="h-8 w-8 text-pantry-green" />
              <span className="ml-2 text-xl font-heading font-bold text-gray-800">PantryPal</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-pantry-green px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/recipes" className="text-gray-700 hover:text-pantry-green px-3 py-2 rounded-md text-sm font-medium">
              Recipes
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-pantry-green px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/favorites" className="text-gray-700 hover:text-pantry-green px-3 py-2 rounded-md text-sm font-medium">
                  Favorites
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="text-gray-700">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-700">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" className="bg-pantry-green hover:bg-pantry-green-dark">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-pantry-green hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pantry-green hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="h-4 w-4 inline mr-2" />
              Home
            </Link>
            <Link
              to="/recipes"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pantry-green hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <ChefHat className="h-4 w-4 inline mr-2" />
              Recipes
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pantry-green hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4 inline mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/favorites"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pantry-green hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-4 w-4 inline mr-2" />
                  Favorites
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pantry-green hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 inline mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pantry-green hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4 inline mr-2" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pantry-green hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4 inline mr-2" />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
