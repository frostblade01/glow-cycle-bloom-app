
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Play, Clock, ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  image: string;
  publishDate: string;
}

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  category: string;
}

export const EducationHub: React.FC = () => {
  // Updated articles data with better, more relevant images
  const articles: Article[] = [
    {
      id: '1',
      title: 'How Your Menstrual Cycle Affects Your Skin',
      excerpt: 'Understanding the hormonal fluctuations throughout your cycle and their impact on skin health.',
      category: 'Hormones & Skin',
      readTime: 5,
      image: 'https://imgs.search.brave.com/e9xEBuxV0GX8In-K4LCCWJfAtpPDBJ5TcadD1Hx5biM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9oZWxs/b3BlcmlvZC5jb20v/Y2RuL3Nob3AvZmls/ZXMvSGVsbG9fUGVy/aW9kX1RlYW1fMjAw/eDIwMC5wbmc_dj0x/NzI3MDc4NDgz',
      publishDate: '2023-04-15',
    },
    {
      id: '2',
      title: 'Building a Cycle-Synced Skincare Routine',
      excerpt: 'Learn how to adapt your skincare routine to work with your hormonal fluctuations for optimal results.',
      category: 'Skincare Tips',
      readTime: 8,
      image: 'https://imgs.search.brave.com/b6_sIQbAgMzHRU7uXzY_E76aoHzseZcvCMX1Gjn1kqU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudm9ndWUuY29t/L3Bob3Rvcy82N2Yw/M2UwOTY5YmQ2NDM2/MjM1MmM4NDAvNDoz/L3Bhc3MvdW5kZWZp/bmVk',
      publishDate: '2023-05-02',
    },
    {
      id: '3',
      title: 'Hormonal Acne: Causes and Treatments',
      excerpt: 'Discover what triggers hormonal acne and the most effective ways to treat and prevent breakouts.',
      category: 'Acne Management',
      readTime: 7,
      image: 'https://imgs.search.brave.com/vTHOaO2tfhwdy7hzp7m3XJWVE98xiI7XeyMyInQUItc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9ob3ct/dG8tZ2V0LXJpZC1v/Zi1ob3Jtb25hbC1h/Y25lLTE2NDY4NDc1/NzYucG5nP2Nyb3A9/MC44MDN4dzowLjUz/NnhoOzAuMTA1eHcs/MC4xNjN4aCZyZXNp/emU9NjQwOio',
      publishDate: '2023-06-10',
    },
    {
      id: '4',
      title: 'The Connection Between Gut Health and Clear Skin',
      excerpt: 'Exploring how your digestive system influences skin health and hormonal balance.',
      category: 'Holistic Health',
      readTime: 6,
      image: 'https://imgs.search.brave.com/lISbQuX4WXw1hEffmAkguoWm6UscBwATtlg5MAwuk50/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2xpbmlrYWxseS5j/b20vY2RuL3Nob3Av/YXJ0aWNsZXMvVGhl/X0Nvbm5lY3Rpb25f/QmV0d2Vlbl9HdXRf/YW5kX1NraW5fSGVh/bHRoX1doYXRfWW91/X05lZWRfdG9fS25v/dy5wbmc_dj0xNjgw/MDkwNjA2JndpZHRo/PTE1MDA',
      publishDate: '2023-07-22',
    },
  ];
  
  // Updated videos data with better thumbnails
  const videos: Video[] = [
    {
      id: '1',
      title: 'Understanding Your Skin Throughout Your Cycle',
      duration: '12:45',
      thumbnail: 'https://imgs.search.brave.com/KUhdCG6vCzhdBhZpevjfNXpzjkOwUd0ioMhDhza25h8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/NGQ0ZjJkNTMwODVk/ZGRiYTY0NDg4NTcv/NjdlYWRjNzg3OGZk/YzFkYTBjYjc2NWI2/X3doYXQtaXMtb3Z1/bGF0aW9uLXRyYWNr/aW5nLmpwZw',
      category: 'Education',
    },
    {
      id: '2',
      title: 'AM & PM Skincare Routine for Luteal Phase',
      duration: '8:32',
      thumbnail: 'https://images.unsplash.com/photo-1532413992378-f169ac26fff0?q=80&w=420&h=230&auto=format&fit=crop',
      category: 'Routines',
    },
    {
      id: '3',
      title: 'How to Manage Hormonal Acne Naturally',
      duration: '15:20',
      thumbnail: 'https://images.unsplash.com/photo-1556228578-dd539282b964?q=80&w=420&h=230&auto=format&fit=crop',
      category: 'Treatments',
    },
    {
      id: '4',
      title: 'Foods That Help Balance Hormones',
      duration: '10:15',
      thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=420&h=230&auto=format&fit=crop',
      category: 'Nutrition',
    },
  ];
  
  // Featured content
  const featuredArticle = articles[0];
  const featuredVideo = videos[0];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="relative">
          <Input 
            placeholder="Search articles and videos..." 
            className="pl-10 pr-4"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button variant="outline">Search</Button>
      </div>
      
      <Card className="bg-gradient-to-r from-glow-purple-50 to-glow-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            GlowUp Education Hub
          </CardTitle>
          <CardDescription>
            Learn about skin health, hormones, and how to optimize your beauty routine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="articles">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="articles" className="space-y-6">
              {/* Featured Article */}
              {featuredArticle && (
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <Badge variant="outline" className="bg-white/20 text-white self-start mb-2">
                      {featuredArticle.category}
                    </Badge>
                    <h3 className="text-white font-bold text-lg">{featuredArticle.title}</h3>
                    <div className="flex items-center text-white/80 text-sm mt-1">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{featuredArticle.readTime} min read</span>
                    </div>
                  </div>
                </div>
              )}
              
              <h3 className="font-medium text-lg">Latest Articles</h3>
              
              {/* Article List */}
              <div className="grid gap-4">
                {articles.slice(1).map(article => (
                  <div key={article.id} className="flex gap-4">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                    />
                    <div>
                      <Badge variant="outline" className="mb-1 text-xs bg-muted">
                        {article.category}
                      </Badge>
                      <h4 className="font-medium line-clamp-2">{article.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{article.excerpt}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full">
                View All Articles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </TabsContent>
            
            <TabsContent value="videos" className="space-y-6">
              {/* Featured Video */}
              {featuredVideo && (
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={featuredVideo.thumbnail} 
                    alt={featuredVideo.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="h-6 w-6 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <Badge variant="outline" className="bg-white/20 text-white self-start mb-2">
                      {featuredVideo.category}
                    </Badge>
                    <h3 className="text-white font-bold text-lg">{featuredVideo.title}</h3>
                    <div className="flex items-center text-white/80 text-sm mt-1">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{featuredVideo.duration}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <h3 className="font-medium text-lg">Latest Videos</h3>
              
              {/* Video List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {videos.slice(1).map(video => (
                  <div key={video.id} className="relative overflow-hidden rounded-lg">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="h-5 w-5 text-white fill-white" />
                      </div>
                    </div>
                    <div className="absolute right-2 top-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <div className="p-3">
                      <Badge variant="outline" className="mb-1 text-xs">
                        {video.category}
                      </Badge>
                      <h4 className="font-medium">{video.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full">
                View All Videos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
