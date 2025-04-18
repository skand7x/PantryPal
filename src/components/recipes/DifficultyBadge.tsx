
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, Beef } from "lucide-react";

type Difficulty = "easy" | "medium" | "hard";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  const badges = {
    easy: {
      icon: <Clock className="w-3 h-3" />,
      text: "Easy",
      color: "bg-green-100 text-green-800 hover:bg-green-100/80"
    },
    medium: {
      icon: <ChefHat className="w-3 h-3" />,
      text: "Medium",
      color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80"
    },
    hard: {
      icon: <Beef className="w-3 h-3" />,
      text: "Advanced",
      color: "bg-red-100 text-red-800 hover:bg-red-100/80"
    }
  };

  const { icon, text, color } = badges[difficulty];

  return (
    <Badge variant="outline" className={`${color} flex items-center gap-1`}>
      {icon}
      {text}
    </Badge>
  );
};

export default DifficultyBadge;
