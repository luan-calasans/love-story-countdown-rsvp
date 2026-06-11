import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import { Play } from 'lucide-react';

const OurStory: React.FC = () => {
	return (
		<RevealOnScroll className="max-w-2xl mx-auto px-4">
			<article className="text-gray-600 leading-relaxed md:leading-loose text-base md:text-lg space-y-5 text-justify">
				<p>
					Luan e Cauane se conheceram na igreja, em um dia simples, mas que
					marcaria o início de uma linda história. Luan se sentou ao lado dela
					e perguntou se ela queria acompanhar, na Bíblia dele, o versículo que
					o pastor estava lendo. Ela disse que não, mas, de alguma forma, aquele
					momento já parecia carregar algo especial.
				</p>

				<p>
					Sem nenhuma pretensão de começar algo sério, eles foram à praia para
					conversar sobre Deus, sobre suas experiências com o Senhor e sobre
					aquilo que estava em seus corações.
				</p>

				<p>
					Na segunda vez em que foram à praia, tudo começou a se tornar ainda
					mais especial. O sentimento já havia brotado no coração dos dois, mas
					o propósito continuava o mesmo: falar sobre Deus.
				</p>

				<p>
					Até que, em um culto, após o término da reunião, eles perceberam que
					já tinham todas as respostas que precisavam. Naquele dia, Luan se
					declarou para Cauane. Ainda assim, antes de qualquer decisão, os dois
					decidiram compartilhar tudo com a liderança.
				</p>

				<p>
					Depois de um período ouvindo o Senhor, eles entenderam que era o
					momento certo. Então, o tão sonhado pedido de namoro aconteceu — e foi
					assim o pedido e o tão esperado “sim”.
				</p>

				<div className="flex justify-center py-1">
					<a
						href="https://www.youtube.com/watch?v=aTq3kXzIjN8"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-wedding-olive text-wedding-olive text-sm md:text-base font-medium hover:bg-wedding-olive hover:text-white transition-colors duration-200"
					>
						<Play className="w-4 h-4" />
						Assista ao pedido
					</a>
				</div>

				<p>
					Mas a história deles não parou por aí. Com o tempo, Luan e Cauane
					foram se conhecendo cada vez mais, corrigindo um ao outro com amor,
					fortalecendo suas semelhanças, aprendendo a ceder quando necessário e
					construindo, dia após dia, uma relação mais sólida.
				</p>

				<p>
					Até que chegou a primeira viagem do casal, planejada por Luan para
					Holambra, a cidade das flores. Ali, em meio aos girassóis — uma flor
					que Cauane sempre achou linda — Luan se ajoelhou e pediu Cauane em
					casamento.
				</p>

				<p className="text-center font-playfair text-wedding-gold text-lg md:text-xl !leading-relaxed pt-2">
					E hoje eles estão aqui, planejando o casamento e se preparando para
					viver o “sim” deles, do agora ao para sempre.
				</p>
			</article>
		</RevealOnScroll>
	);
};

export default OurStory;
