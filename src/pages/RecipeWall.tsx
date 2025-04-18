
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecipePostCard from "@/components/recipe-wall/RecipePostCard";
import RecipePostModal from "@/components/recipe-wall/RecipePostModal";
import { supabase } from "@/integrations/supabase/client";
import type { RecipePost } from "@/types/recipeWall";
import { Skeleton } from "@/components/ui/skeleton";

const RecipeWall = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState<RecipePost[]>([]);
  const [filter, setFilter] = useState<"all" | "popular" | "recent">("all");

  useEffect(() => {
    // Check if user is authenticated
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setIsLoading(false);
    };

    fetchSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
      }
    );

    // Fetch posts
    fetchPosts();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch posts based on filter
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('recipe_posts')
        .select(`
          id,
          title,
          description,
          image_url,
          created_at,
          recipe_id,
          like_count,
          author:user_id(id, email),
          comments(count)
        `);

      if (filter === "popular") {
        query = query.order('like_count', { ascending: false });
      } else if (filter === "recent") {
        query = query.order('created_at', { ascending: false });
      } else {
        // Default order by created_at for "all"
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Failed to load posts",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const handleCreatePost = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to share your culinary creations",
        variant: "default",
      });
      navigate("/login", { state: { returnUrl: "/recipe-wall" } });
    } else {
      setModalOpen(true);
    }
  };

  const handlePostCreated = async (newPost: Partial<RecipePost>) => {
    try {
      const { data, error } = await supabase
        .from('recipe_posts')
        .insert({
          title: newPost.title,
          description: newPost.description,
          image_url: newPost.image_url,
          recipe_id: newPost.recipe_id,
          user_id: user.id,
          like_count: 0
        })
        .select();

      if (error) throw error;

      toast({
        title: "Post created!",
        description: "Your culinary creation has been shared",
      });

      setModalOpen(false);
      fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Failed to create post",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleLikePost = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to like posts",
        variant: "default",
      });
      return;
    }

    try {
      // Check if user already liked the post
      const { data: existingLike } = await supabase
        .from('post_likes')
        .select()
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

      if (existingLike) {
        // Unlike
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        // Update like count
        await supabase.rpc('decrement_like_count', {
          post_id_param: postId
        });
      } else {
        // Like
        await supabase
          .from('post_likes')
          .insert({
            post_id: postId,
            user_id: user.id
          });

        // Update like count
        await supabase.rpc('increment_like_count', {
          post_id_param: postId
        });
      }

      // Refresh posts
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
      toast({
        title: "Failed to like post",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Recipe Wall</h1>
          <p className="text-gray-600">Share and discover amazing homemade culinary creations</p>
        </div>
        <Button
          className="mt-4 md:mt-0 bg-pantry-green hover:bg-pantry-green-dark"
          onClick={handleCreatePost}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Share Your Creation
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="popular">Most Liked</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <RecipePostCard
                  key={post.id}
                  post={post}
                  currentUser={user}
                  onLike={() => handleLikePost(post.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-600 mb-4">No posts yet</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Be the first to share your culinary creation with the community
              </p>
              <Button
                className="bg-pantry-green hover:bg-pantry-green-dark"
                onClick={handleCreatePost}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create First Post
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="popular" className="mt-0">
          {/* Content will be handled by the filter in useEffect */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          {/* Content will be handled by the filter in useEffect */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </TabsContent>
      </Tabs>

      <RecipePostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handlePostCreated}
      />
    </div>
  );
};

export default RecipeWall;
