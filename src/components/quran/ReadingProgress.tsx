import { useEffect, useState } from 'react';

export const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollPosition = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (scrollPosition / totalHeight) * 100;
      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-islamic-cream z-50">
      <div
        className="h-full bg-islamic-green transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};