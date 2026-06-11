import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import { Calendar } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
}

const Timeline: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      year: '2022',
      title: 'Nos conhecemos',
    },
    {
      year: '2023',
      title: 'Começamos a\nnamorar',
    },
    {
      year: '2024',
      title: 'Pedido de\ncasamento',
    },
    {
      year: '2026',
      title: 'Casamento',
    },
  ];

  return (
    <div className='max-w-4xl mx-auto px-2 md:px-4'>
      <div className='relative'>
        {/* Vertical line */}
        <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-wedding-olive/50'></div>

        {events.map((event, index) => (
          <RevealOnScroll key={index} className='mb-8 md:mb-12'>
            <div
              className={`flex items-center ${
                index % 2 === 0 ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? 'pr-4 md:pr-8 text-right' : 'pl-4 md:pl-8'
                }`}
              >
                <h3 className='text-lg md:text-2xl lg:text-3xl font-playfair mb-1 text-wedding-olive'>
                  {event.year}
                </h3>
                <h4 className='text-base md:text-xl lg:text-2xl font-medium mb-1 dark:text-white whitespace-pre-line'>
                  {event.title}
                </h4>
              </div>

              {/* Center point */}
              <div className='absolute left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-wedding-cream dark:bg-[#111827] border-2 border-wedding-olive flex items-center justify-center'>
                <Calendar className='w-4 h-4 md:w-5 md:h-5 text-wedding-olive' />
              </div>

              {/* Empty space for the other side */}
              <div className='w-1/2'></div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
