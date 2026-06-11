import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // October 17, 2026
    const weddingDate = new Date('2026-10-17T17:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='flex justify-center items-center space-x-4 md:space-x-8'>
      <div className='flex flex-col items-center'>
        <div className='bg-white dark:bg-dark-bg backdrop-blur-sm rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center'>
          <span className='font-playfair text-2xl md:text-4xl text-wedding-olive'>
            {timeLeft.days}
          </span>
        </div>
        <span className='mt-2 text-xs md:text-sm text-foreground/80 dark:text-white'>
          Dias
        </span>
      </div>

      <div className='flex flex-col items-center'>
        <div className='bg-white dark:bg-dark-bg backdrop-blur-sm rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center'>
          <span className='font-playfair text-2xl md:text-4xl text-wedding-olive'>
            {timeLeft.hours}
          </span>
        </div>
        <span className='mt-2 text-xs md:text-sm text-foreground/80 dark:text-white'>
          Horas
        </span>
      </div>

      <div className='flex flex-col items-center'>
        <div className='bg-white dark:bg-dark-bg backdrop-blur-sm rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center'>
          <span className='font-playfair text-2xl md:text-4xl text-wedding-olive'>
            {timeLeft.minutes}
          </span>
        </div>
        <span className='mt-2 text-xs md:text-sm text-foreground/80 dark:text-white'>
          Minutos
        </span>
      </div>

      <div className='flex flex-col items-center'>
        <div className='bg-white dark:bg-dark-bg backdrop-blur-sm rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center'>
          <span className='font-playfair text-2xl md:text-4xl text-wedding-olive'>
            {timeLeft.seconds}
          </span>
        </div>
        <span className='mt-2 text-xs md:text-sm text-foreground/80 dark:text-white'>
          Segundos
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
