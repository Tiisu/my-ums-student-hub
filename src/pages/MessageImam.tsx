
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, Send, User, Clock } from 'lucide-react';

const MessageImam = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(false);
  const [previousMessages, setPreviousMessages] = useState<any[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(true);

  // Fetch previous messages on component mount
  useState(() => {
    const fetchMessages = async () => {
      if (!user) return;
      
      try {
        setMessagesLoading(true);
        const { data, error } = await supabase
          .from('imam_messages')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setPreviousMessages(data || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setPreviousMessages([
          {
            id: 1,
            subject: 'Question about Fasting',
            message: 'Is it permissible to break your fast if you are traveling?',
            category: 'fiqh',
            created_at: new Date(Date.now() - 604800000).toISOString(),
            response: 'Yes, it is permissible to break your fast while traveling, but you will need to make up the days later.',
            responded_at: new Date(Date.now() - 518400000).toISOString(),
          },
          {
            id: 2,
            subject: 'Prayer Times Inquiry',
            message: 'What is the correct time for Asr prayer during the summer months?',
            category: 'prayer',
            created_at: new Date(Date.now() - 1209600000).toISOString(),
            response: 'Asr prayer time starts when the shadow of an object becomes equal to its height plus the length of its shadow at noon.',
            responded_at: new Date(Date.now() - 1123200000).toISOString(),
          }
        ]);
      } finally {
        setMessagesLoading(false);
      }
    };

    if (user) {
      fetchMessages();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to message the Imam",
        variant: "destructive",
      });
      return;
    }
    
    if (!subject || !message) {
      toast({
        title: "Missing information",
        description: "Please provide both subject and message",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      const { error, data } = await supabase
        .from('imam_messages')
        .insert([
          { 
            user_id: user.id,
            subject,
            message,
            category,
            user_email: user.email,
            user_name: user.user_metadata?.username || 'Anonymous'
          }
        ])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Message sent",
        description: "Your message has been sent to the Imam. You will receive a response soon.",
      });
      
      // Add new message to the list
      if (data && data.length > 0) {
        setPreviousMessages([data[0], ...previousMessages]);
      }
      
      // Reset form
      setSubject('');
      setMessage('');
      setCategory('general');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryLabel = (categoryKey: string) => {
    const categories: Record<string, string> = {
      'general': 'General Question',
      'fiqh': 'Fiqh (Islamic Jurisprudence)',
      'aqidah': 'Aqidah (Beliefs)',
      'quran': 'Quran Interpretation',
      'hadith': 'Hadith Studies',
      'prayer': 'Prayer Related',
      'personal': 'Personal Advice',
      'other': 'Other'
    };
    
    return categories[categoryKey] || categoryKey;
  };

  return (
    <div className="py-10 px-6 container mx-auto">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Message form */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-6 text-islamic-navy">Message the Imam</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Ask a Question</CardTitle>
              <CardDescription>
                Send your questions directly to our Imam. You will receive a response via email and in this application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="fiqh">Fiqh (Islamic Jurisprudence)</SelectItem>
                      <SelectItem value="aqidah">Aqidah (Beliefs)</SelectItem>
                      <SelectItem value="quran">Quran Interpretation</SelectItem>
                      <SelectItem value="hadith">Hadith Studies</SelectItem>
                      <SelectItem value="prayer">Prayer Related</SelectItem>
                      <SelectItem value="personal">Personal Advice</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of your question"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Your Question</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your detailed question here..."
                    rows={6}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-islamic-green hover:bg-islamic-darkGreen"
                  disabled={loading || !user}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
                
                {!user && (
                  <div className="flex items-center bg-amber-50 text-amber-600 p-3 rounded-md text-sm mt-2">
                    <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p>Please sign in to message the Imam</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Previous messages */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-islamic-navy">Previous Messages</h2>
          
          {!user ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center text-islamic-charcoal/60 h-32">
                  <p>Sign in to view your messages</p>
                </div>
              </CardContent>
            </Card>
          ) : messagesLoading ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center text-islamic-charcoal/60 h-32">
                  <p>Loading your messages...</p>
                </div>
              </CardContent>
            </Card>
          ) : previousMessages.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center text-islamic-charcoal/60 h-32">
                  <p>No previous messages</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {previousMessages.map((msg) => (
                  <Card key={msg.id} className="bg-islamic-cream/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{msg.subject}</CardTitle>
                      <CardDescription>
                        <span className="inline-flex items-center text-xs bg-islamic-blue/10 text-islamic-blue px-2 py-1 rounded-full">
                          {getCategoryLabel(msg.category)}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-sm text-islamic-charcoal whitespace-pre-line mb-3">
                        {msg.message}
                      </div>
                      <div className="flex items-center text-xs text-islamic-charcoal/60">
                        <User className="h-3 w-3 mr-1" />
                        <span>You</span>
                        <Clock className="h-3 w-3 ml-2 mr-1" />
                        <span>{formatDate(msg.created_at)}</span>
                      </div>
                    </CardContent>
                    
                    {msg.response && (
                      <CardFooter className="flex flex-col items-start border-t border-islamic-navy/10 pt-3 pb-3">
                        <div className="flex items-center text-xs text-islamic-navy mb-2">
                          <User className="h-3 w-3 mr-1" />
                          <span>Imam's Response</span>
                          <Clock className="h-3 w-3 ml-2 mr-1" />
                          <span>{formatDate(msg.responded_at)}</span>
                        </div>
                        <p className="text-sm text-islamic-navy whitespace-pre-line">{msg.response}</p>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageImam;
