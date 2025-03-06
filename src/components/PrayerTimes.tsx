
import { useState, useEffect } from 'react';
import { Clock, Sun, Moon } from 'lucide-react';
import { fetchPrayerTimes, formatPrayerTimes, getNextPrayer, formatTimeToAmPm, getTimeDifference } from '@/utils/prayerTimes';
import { cn } from '@/lib/utils';

type PrayerTimesProps = {
  standalone?: boolean;
};

const PrayerTimes = ({ standalone = false }: PrayerTimesProps) => {
  const [loading, setLoading] = useState(true);
  const [prayerTimes, setPrayerTimes] = useState<any[]>([]);
  const [nextPrayer, setNextPrayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const loadPrayerTimes = async () => {
      try {
        setLoading(true);
        const times = await fetchPrayerTimes();
        const formattedTimes = formatPrayerTimes(times);
        setPrayerTimes(formattedTimes);
        
        const next = getNextPrayer(formattedTimes);
        setNextPrayer(next);
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPrayerTimes();

    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Re-calculate next prayer when current time changes
  useEffect(() => {
    if (prayerTimes.length > 0) {
      const next = getNextPrayer(prayerTimes);
      setNextPrayer(next);
    }
  }, [currentTime, prayerTimes]);

  const prayerIcons = {
    fajr: <Sun className="h-6 w-6 text-islamic-gold" />,
    dhuhr: <Sun className="h-6 w-6 text-islamic-gold" />,
    asr: <Sun className="h-6 w-6 text-islamic-gold" />,
    maghrib: <Moon className="h-6 w-6 text-islamic-blue" />,
    isha: <Moon className="h-6 w-6 text-islamic-blue" />,
  };

  const renderContent = () => (
    <>
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h6 className="text-islamic-green text-sm font-medium uppercase mb-3 tracking-wider">Daily guidance</h6>
        <h2 className="text-3xl md:text-4xl font-bold text-islamic-navy mb-6">Prayer Times for Today</h2>
        <p className="text-islamic-charcoal/70">
          Accurate prayer times for Nyankpala Campus, University for Development Studies.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Next Prayer Card */}
        {!loading && nextPrayer && (
          <div className="glass-card p-8 mb-10 animate-fade-up">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-islamic-green text-lg font-semibold mb-2">Next Prayer</h3>
                <h2 className="text-3xl font-bold mb-1">{nextPrayer.displayName}</h2>
                <p className="text-xl text-islamic-navy">{formatTimeToAmPm(nextPrayer.time)}</p>
              </div>
              <div className="flex items-center gap-3 text-islamic-navy/80">
                <Clock className="h-5 w-5" />
                <span className="text-lg">Coming up in <span className="font-semibold text-islamic-navy">{getTimeDifference(nextPrayer.time)}</span></span>
              </div>
            </div>
          </div>
        )}

        {/* Prayer Times Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {loading ? (
            // Loading skeletons
            Array(5).fill(0).map((_, index) => (
              <div key={index} className="prayer-card animate-pulse">
                <div className="h-6 w-20 bg-gray-200 rounded mb-3"></div>
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
              </div>
            ))
          ) : (
            // Actual prayer times
            prayerTimes.map((prayer, index) => (
              <div 
                key={prayer.name} 
                className={cn(
                  "prayer-card animate-fade-up",
                  nextPrayer?.name === prayer.name ? "ring-2 ring-islamic-green ring-offset-2" : ""
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-islamic-navy">{prayer.displayName}</h3>
                  <div className="opacity-80">
                    {prayerIcons[prayer.name as keyof typeof prayerIcons]}
                  </div>
                </div>
                <p className="text-2xl font-semibold text-islamic-navy">
                  {formatTimeToAmPm(prayer.time)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );

  if (standalone) {
    return (
      <div className="py-10 px-6">
        <div className="container mx-auto">
          <div className="flex justify-center items-center gap-3 mb-8 mt-10">
            <Clock className="h-8 w-8 text-islamic-green" />
            <h1 className="text-3xl text-center md:text-4xl font-bold font-serif text-islamic-navy">Prayer Times</h1>
          </div>
          <div className="glass-card p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="prayer-times" className="py-20 px-6 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
      
      <div className="container mx-auto">
        {renderContent()}
      </div>
    </section>
  );
};

export default PrayerTimes;
