import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Post {
  id: number;
  user: string;
  caption: string;
  likes: number;
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "sami",
      caption: "First post on S IG 🔥",
      likes: 3,
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now(),
      user: "you",
      caption: newPost,
      likes: 0,
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const likePost = (id: number) => {
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-md mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-black uppercase italic">S IG</h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Social Image Grid</p>
        </header>

        <Card className="mb-8 border-none shadow-sm bg-white rounded-3xl overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600" />
              <span className="font-bold text-sm">@you</span>
            </div>
            <Input
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="border-none bg-gray-100 rounded-2xl focus-visible:ring-0 text-base py-6"
            />
            <Button 
              onClick={addPost} 
              className="w-full bg-black hover:bg-gray-800 text-white rounded-2xl py-6 font-bold transition-all active:scale-95"
            >
              Share Moment
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 text-xs">
                          {post.user[0].toUpperCase()}
                        </div>
                        <div className="font-bold text-sm">@{post.user}</div>
                      </div>
                      <div className="text-[10px] text-gray-400 uppercase font-medium">Just now</div>
                    </div>
                    
                    <div className="bg-gray-100 aspect-square rounded-3xl mb-4 flex items-center justify-center text-gray-300">
                      <p className="text-sm font-medium italic">Image Placeholder</p>
                    </div>

                    <p className="text-gray-800 mb-6 leading-relaxed">{post.caption}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => likePost(post.id)}
                          className="flex items-center gap-2 group transition-colors"
                        >
                          <Heart 
                            size={20} 
                            className={`transition-all ${post.likes > 0 ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400 group-hover:text-red-400'}`} 
                          /> 
                          <span className={`text-sm font-bold ${post.likes > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                            {post.likes}
                          </span>
                        </button>
                        <button className="text-gray-400 hover:text-black transition-colors">
                          <MessageCircle size={20} />
                        </button>
                        <button className="text-gray-400 hover:text-black transition-colors">
                          <Send size={20} />
                        </button>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-gray-200" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
