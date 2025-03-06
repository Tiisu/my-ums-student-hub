
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setNews(data || []);
      } catch (error) {
        console.error('Error fetching news:', error);
        // If fetching fails, use placeholder data
        setNews([
          {
            id: 1,
            title: 'Upcoming Eid Prayer',
            content: 'Join us for Eid Prayer at the Central Mosque. All students are welcome to attend. Bring your prayer mats.',
            image_url: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            title: 'Islamic Awareness Week',
            content: 'GMSA is organizing Islamic Awareness Week from 10th to 16th June. Various activities including lectures, quizzes, and charity drives are planned.',
            image_url: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
            created_at: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 3,
            title: 'Weekly Hadith Circle',
            content: 'Our weekly Hadith circle continues every Saturday after Maghrib prayer. The topic this week is "Patience in Islam".',
            image_url: 'https://images.unsplash.com/photo-1584661156681-540e80a161d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
            created_at: new Date(Date.now() - 172800000).toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="py-10 px-6 container mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-islamic-navy">News & Events</h1>
        
        {loading ? (
          // Loading skeletons
          Array(3).fill(0).map((_, i) => (
            <Card key={i} className="mb-6">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full rounded-md" />
                <Skeleton className="h-4 w-full mt-4" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </CardContent>
            </Card>
          ))
        ) : news.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-islamic-charcoal/80">No news or events available at the moment.</p>
          </div>
        ) : (
          news.map((item) => (
            <Card key={item.id} className="mb-6 overflow-hidden">
              {item.image_url && (
                <div className="w-full h-56 overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-bold text-islamic-navy">{item.title}</CardTitle>
                <CardDescription className="flex items-center text-islamic-charcoal/70 gap-4">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(item.created_at)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatTime(item.created_at)}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-islamic-charcoal whitespace-pre-line">{item.content}</p>
              </CardContent>
              <CardFooter className="bg-islamic-cream/40 text-sm text-islamic-charcoal/60">
                Posted by GMSA UDS
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default News;
