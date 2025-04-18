
import { Link } from "react-router-dom";
import { Mail, ChefHat } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <ChefHat className="h-6 w-6 text-pantry-green" />
            <span className="ml-2 text-lg font-heading font-bold text-gray-800">PantryPal</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left mb-4 md:mb-0">
            <Link to="/" className="text-gray-700 hover:text-pantry-green py-1">Home</Link>
            <Link to="/recipes" className="text-gray-700 hover:text-pantry-green py-1">Recipes</Link>
            <Link to="/about" className="text-gray-700 hover:text-pantry-green py-1">About</Link>
            <Link to="/privacy" className="text-gray-700 hover:text-pantry-green py-1">Privacy</Link>
          </div>
          
          <div className="flex space-x-4">
            <a href="mailto:skand7x@gmail.com" className="text-gray-500 hover:text-pantry-green">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PantryPal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
