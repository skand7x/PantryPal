
export interface RecipePost {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  recipe_id: string | null;
  created_at: string;
  like_count: number;
  user_id: string;
  author?: {
    id: string;
    email: string;
  };
  comments?: {
    count: number;
  };
}
