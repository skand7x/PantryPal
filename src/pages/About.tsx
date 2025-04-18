
import { Mail } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold mb-6">About PantryPal</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            PantryPal is your smart kitchen companion that helps you discover delicious recipes based on the ingredients you already have. Our mission is to reduce food waste, inspire creative cooking, and make meal planning easier for everyone.
          </p>
          
          <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">What We Offer</h2>
          <ul className="space-y-3">
            <li>Smart recipe suggestions based on your available ingredients</li>
            <li>Detailed nutritional information for health-conscious cooking</li>
            <li>Dietary preference filters for personalized recipe discovery</li>
            <li>Save your favorite recipes for quick access</li>
            <li>Easy-to-follow cooking instructions</li>
          </ul>
          
          <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <a href="mailto:skand7x@gmail.com" className="text-pantry-green hover:underline">
              skand7x@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
