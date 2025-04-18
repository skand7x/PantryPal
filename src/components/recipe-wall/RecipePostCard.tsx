
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { RecipePost } from '@/types/recipeWall';

interface RecipePostCardProps {
  post: RecipePost;
  currentUser: any | null;
  onLike: () => void;
}

const RecipePostCard = ({ post, currentUser, onLike }: RecipePostCardProps) => {
  // Extract the first letter of the email for avatar fallback
  const avatarFallback = post.author?.email ? post.author.email[0].toUpperCase() : '?';
  
  // Format the date
  const formattedDate = post.created_at 
    ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
    : 'recently';

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={post.image_url} 
          alt={post.title} 
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <CardContent className="pt-4 pb-2">
        <div className="flex items-center mb-2">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.author?.email || 'Anonymous'}</p>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>
        
        <h3 className="font-heading font-semibold text-lg mb-1">{post.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{post.description}</p>
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 pt-3 pb-3 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          className="hover:text-pantry-green text-gray-600 font-medium"
          onClick={onLike}
        >
          <Heart className={`h-4 w-4 mr-1 ${false ? 'fill-pantry-green text-pantry-green' : ''}`} />
          {post.like_count || 0}
        </Button>
        <Button variant="ghost" size="sm" className="hover:text-pantry-green text-gray-600 font-medium">
          <MessageCircle className="h-4 w-4 mr-1" />
          {post.comments?.count || 0}
        </Button>
        <Button variant="ghost" size="sm" className="hover:text-pantry-green text-gray-600 font-medium">
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipePostCard;
