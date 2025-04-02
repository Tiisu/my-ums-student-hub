
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, CreditCard, PhoneCall, AlertCircle } from 'lucide-react';

const Donate = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // In a real application, you would integrate with a payment processor here
      // For demo purposes, we'll just log the donation to the database
      const { error } = await supabase
        .from('donations')
        .insert([
          {
            user_id: user?.id || null,
            amount: parseFloat(amount),
            payment_method: paymentMethod,
            donor_name: name || user?.user_metadata?.username || 'Anonymous',
            phone_number: phoneNumber,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Thank you for your donation!",
        description: `Your donation of GH₵${amount} is being processed.`,
      });

      // Reset form
      setAmount('');
      setPhoneNumber('');
      setName('');
    } catch (error) {
      console.error('Error processing donation:', error);
      toast({
        title: "Donation failed",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-6 container mx-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-islamic-navy dark:text-white">Support GSA UDS</h1>
        <p className="text-islamic-charcoal/80 dark:text-gray-300 mb-8">
          Your donations help us organize events, provide resources, and support Muslim students at UDS Nyankpala Campus.
        </p>

        <Alert className="mb-8 bg-islamic-cream border-islamic-green/30 dark:bg-gray-800/50 dark:border-islamic-green/20">
          <InfoIcon className="h-4 w-4 text-islamic-green" />
          <AlertTitle className="text-islamic-navy dark:text-white">About Your Donation</AlertTitle>
          <AlertDescription className="text-islamic-charcoal/80 dark:text-gray-300">
            All donations go directly to GMSA UDS activities including:
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Islamic awareness programs</li>
              <li>Weekly study circles</li>
              <li>Community iftar during Ramadan</li>
              <li>Educational materials and resources</li>
              <li>Charity and outreach programs</li>
            </ul>
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Make a Donation</CardTitle>
            <CardDescription>Fill in the details below to support our cause</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDonate} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Donation Amount (GH₵)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="e.g. 50"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="1"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Your Name (Optional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name or 'Anonymous'"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroup value="momo" id="momo" />
                    <Label htmlFor="momo" className="flex items-center">
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Mobile Money
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroup value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === 'momo' && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Money Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 024XXXXXXX"
                    pattern="0[0-9]{9}"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                  <p className="text-xs text-islamic-charcoal/60 dark:text-gray-400 mt-1">Format: 10 digits starting with 0</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Card payments coming soon</AlertTitle>
                  <AlertDescription>
                    Card payment integration is currently under development. Please use Mobile Money for now.
                  </AlertDescription>
                </Alert>
              )}

              <Separator />

              <Button
                type="submit"
                className="w-full bg-islamic-green hover:bg-islamic-darkGreen"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Donate Now'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <p className="text-xs text-islamic-charcoal/60 dark:text-gray-400">
              For bulk donations or other payment methods, please contact the GSA treasurer directly at treasurer@gmsauds.org
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Donate;
