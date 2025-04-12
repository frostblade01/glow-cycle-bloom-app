
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Users, MessageSquare, Heart, Send, Image, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Post {
  id: string;
  user: {
    name: string;
    image?: string;
    isAnonymous?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
  isLiked?: boolean;
}

interface Comment {
  id: string;
  user: {
    name: string;
    image?: string;
    isAnonymous?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
}

export const Community: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showComments, setShowComments] = useState(false);
  
  // Sample posts data
  const posts: Post[] = [
    {
      id: '1',
      user: {
        name: 'Sophia',
        image: 'https://images.unsplash.com/photo-1557555187-23d685287bc3?q=80&w=400&h=400&auto=format&fit=crop',
      },
      content: "Just started tracking my cycle with this app and it's been eye-opening! I never realized how much my skin changes throughout the month. Anyone else notice their acne gets worse in the luteal phase?",
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      tags: ['Cycle Tracking', 'Skin Changes'],
    },
    {
      id: '2',
      user: {
        name: 'Anonymous',
        isAnonymous: true,
      },
      content: "I've been struggling with hormonal acne for years and nothing seemed to help. Since I started using the app and syncing my skincare with my cycle, I've seen such improvement. The salicylic acid products in my luteal phase made a huge difference!",
      timestamp: '5 hours ago',
      likes: 32,
      comments: 12,
      tags: ['Success Story', 'Hormonal Acne'],
    },
    {
      id: '3',
      user: {
        name: 'Emily',
        image: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80&w=400&h=400&auto=format&fit=crop',
      },
      content: "Does anyone have recommendations for gentle cleansers during the menstruation phase? My skin gets so sensitive and everything seems to irritate it 😢",
      timestamp: '1 day ago',
      likes: 15,
      comments: 21,
      tags: ['Product Recommendation', 'Sensitive Skin'],
    },
  ];
  
  // Sample comments data for first post
  const comments: Comment[] = [
    {
      id: '1',
      user: {
        name: 'Jamie',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop',
      },
      content: "Yes! My skin always breaks out around 7-10 days before my period. The app has been so helpful for preparing my skin before the breakouts even start.",
      timestamp: '1 hour ago',
      likes: 8,
    },
    {
      id: '2',
      user: {
        name: 'Taylor',
      },
      content: "Same here! I started using a salicylic acid cleanser in my luteal phase and it's helped so much with preventing the hormonal breakouts.",
      timestamp: '2 hours ago',
      likes: 5,
    },
    {
      id: '3',
      user: {
        name: 'Anonymous',
        isAnonymous: true,
      },
      content: "I've noticed this too! My dermatologist explained that progesterone rises in the luteal phase which increases oil production. Try using oil-control products during this phase.",
      timestamp: '2 hours ago',
      likes: 12,
    },
  ];
  
  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    // In a real app, would submit the post to backend
    setNewPost('');
    // Show success toast
  };
  
  const togglePostLike = (postId: string) => {
    // In a real app, would toggle like on backend
  };
  
  const handleCommentClick = (post: Post) => {
    setSelectedPost(post);
    setShowComments(true);
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-glow-purple-50 to-glow-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Skin Confidence Community
          </CardTitle>
          <CardDescription>
            Connect with others, share experiences, and find support for your skin journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="feed">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="feed">Community Feed</TabsTrigger>
              <TabsTrigger value="groups">Support Groups</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feed" className="space-y-6">
              {/* New Post Form */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      {isAnonymous ? (
                        <AvatarFallback className="bg-muted">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </AvatarFallback>
                      ) : (
                        <>
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-glow-pink-100 text-glow-pink-700">
                            ME
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea 
                        placeholder="Share your experience or ask for advice..." 
                        className="resize-none"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8">
                            <Image className="h-4 w-4 mr-1" />
                            Photo
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={cn(
                              "h-8",
                              isAnonymous && "bg-muted"
                            )}
                            onClick={() => setIsAnonymous(!isAnonymous)}
                          >
                            <User className="h-4 w-4 mr-1" />
                            {isAnonymous ? 'Anonymous' : 'Post as Yourself'}
                          </Button>
                        </div>
                        <Button 
                          onClick={handlePostSubmit}
                          disabled={!newPost.trim()}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Posts Feed */}
              <div className="space-y-4">
                {posts.map(post => (
                  <Card key={post.id}>
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <Avatar className="h-10 w-10">
                          {post.user.isAnonymous ? (
                            <AvatarFallback className="bg-muted">
                              <User className="h-5 w-5 text-muted-foreground" />
                            </AvatarFallback>
                          ) : (
                            <>
                              <AvatarImage src={post.user.image} />
                              <AvatarFallback className="bg-glow-purple-100 text-glow-purple-700">
                                {post.user.name.charAt(0)}
                              </AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{post.user.name}</p>
                              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                            </div>
                          </div>
                          
                          <p className="mt-2">{post.content}</p>
                          
                          <div className="flex flex-wrap gap-1 mt-3">
                            {post.tags.map(tag => (
                              <Badge 
                                key={tag} 
                                variant="outline" 
                                className="bg-muted/50 hover:bg-muted text-xs"
                              >
                                #{tag.replace(/\s/g, '')}
                              </Badge>
                            ))}
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="flex gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-foreground"
                              onClick={() => togglePostLike(post.id)}
                            >
                              <Heart className={cn(
                                "h-4 w-4 mr-1", 
                                post.isLiked && "fill-red-500 text-red-500"
                              )} />
                              {post.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-foreground"
                              onClick={() => handleCommentClick(post)}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {post.comments}
                            </Button>
                          </div>
                          
                          {selectedPost?.id === post.id && showComments && (
                            <div className="mt-4 space-y-4">
                              <Separator />
                              
                              {/* Comment input */}
                              <div className="flex gap-2 items-start mt-4">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-glow-pink-100 text-glow-pink-700">
                                    ME
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <Textarea 
                                    placeholder="Write a comment..." 
                                    className="resize-none text-sm min-h-[60px]"
                                  />
                                  <div className="flex justify-end mt-2">
                                    <Button size="sm">Post</Button>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Comments list */}
                              <div className="space-y-4 mt-4">
                                {comments.map(comment => (
                                  <div key={comment.id} className="flex gap-2 items-start">
                                    <Avatar className="h-8 w-8">
                                      {comment.user.isAnonymous ? (
                                        <AvatarFallback className="bg-muted">
                                          <User className="h-4 w-4 text-muted-foreground" />
                                        </AvatarFallback>
                                      ) : (
                                        <>
                                          <AvatarImage src={comment.user.image} />
                                          <AvatarFallback className="bg-glow-purple-100 text-glow-purple-700">
                                            {comment.user.name.charAt(0)}
                                          </AvatarFallback>
                                        </>
                                      )}
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="bg-muted rounded-lg p-3">
                                        <p className="font-medium text-sm">{comment.user.name}</p>
                                        <p className="text-sm">{comment.content}</p>
                                      </div>
                                      <div className="flex items-center gap-4 mt-1 ml-1">
                                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-auto py-0 text-xs text-muted-foreground hover:text-foreground"
                                        >
                                          Like ({comment.likes})
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-auto py-0 text-xs text-muted-foreground hover:text-foreground"
                                        >
                                          Reply
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="groups" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {['Hormonal Acne Support', 'Cycle Syncing Beginners', 'Skin Positivity', 'PCOS & Skin Health'].map((group, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{group}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">A supportive community to discuss experiences and share advice.</p>
                      <div className="flex items-center gap-1 mt-3">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-muted">U1</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-muted">U2</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-muted">U3</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground ml-1">+148 members</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Join Group
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Button variant="outline" className="w-full">
                Browse All Groups
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
