import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import { Calendar, Play } from 'lucide-react';

interface TimelineEvent {
	year: string;
	title: string;
	videoUrl?: string;
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
			videoUrl: 'https://www.youtube.com/watch?v=aTq3kXzIjN8',
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
		<div className="max-w-4xl mx-auto px-2 md:px-4">
			<div className="relative">
				{/* Vertical line */}
				<div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-wedding-olive/50"></div>

				{events.map((event, index) => (
					<RevealOnScroll key={index} className="mb-8 md:mb-12">
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
								<h3 className="text-lg md:text-2xl lg:text-3xl font-playfair mb-1 text-wedding-olive">
									{event.year}
								</h3>
								<h4 className="text-base md:text-xl lg:text-2xl font-medium mb-1 dark:text-white whitespace-pre-line">
									{event.title}
								</h4>
								{event.videoUrl && (
									<a
										href={event.videoUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full border border-wedding-olive text-wedding-olive text-xs md:text-sm font-medium hover:bg-wedding-olive hover:text-white transition-colors duration-200 ${
											index % 2 === 0 ? 'flex-row-reverse' : ''
										}`}
									>
										<Play className="w-3.5 h-3.5" />
										Assista o vídeo
									</a>
								)}
							</div>

							{/* Center point */}
							<div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-wedding-cream dark:bg-[#3F3A34] border-2 border-wedding-olive flex items-center justify-center">
								<Calendar className="w-4 h-4 md:w-5 md:h-5 text-wedding-olive" />
							</div>

							{/* Empty space for the other side */}
							<div className="w-1/2"></div>
						</div>
					</RevealOnScroll>
				))}
			</div>
		</div>
	);
};

export default Timeline;
