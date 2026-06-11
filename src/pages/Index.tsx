import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import CountdownTimer from '@/components/CountdownTimer';
import RevealOnScroll from '@/components/RevealOnScroll';
import RsvpForm from '@/components/RsvpForm';
import Timeline from '@/components/Timeline';
import ImageCarousel from '@/components/ImageCarousel';
import { galleryImages } from '@/data/galleryImages';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, Gift, X, Filter, ArrowUpDown, Copy, Check } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const PIX_KEY = 'luancalasans.site@gmail.com';

interface GiftItem {
  id: string;
  name: string;
  description: string;
  minValue: number;
  maxValue: number;
  observation: string;
  image?: string;
}

const gifts: GiftItem[] = [
  { id: '1',  name: 'Rack de TV',                               description: '', minValue: 800,  maxValue: 800,  observation: '' },
  { id: '2',  name: 'TV',                                       description: '', minValue: 2500, maxValue: 2500, observation: '' },
  { id: '3',  name: 'Sofá',                                     description: '', minValue: 2500, maxValue: 2500, observation: '' },
  { id: '4',  name: 'Buffet Aparador',                          description: '', minValue: 700,  maxValue: 700,  observation: '' },
  { id: '5',  name: 'Interfone eletrônico',                     description: '', minValue: 200,  maxValue: 200,  observation: '' },
  { id: '6',  name: 'Caixa de som bluetooth',                   description: '', minValue: 400,  maxValue: 400,  observation: '' },
  { id: '7',  name: 'Câmera',                                   description: '', minValue: 200,  maxValue: 200,  observation: '' },
  { id: '8',  name: 'Assistente virtual Alexa',                 description: '', minValue: 460,  maxValue: 460,  observation: '' },
  { id: '9',  name: 'Ventilador',                               description: '', minValue: 160,  maxValue: 160,  observation: '' },
  { id: '10', name: 'Umidificador de ar',                       description: '', minValue: 130,  maxValue: 130,  observation: '' },
  { id: '11', name: 'Purificador de água',                      description: '', minValue: 470,  maxValue: 470,  observation: '' },
  { id: '12', name: 'Mesa de cozinha',                          description: '', minValue: 900,  maxValue: 900,  observation: '' },
  { id: '13', name: '4 cadeiras',                               description: '', minValue: 637,  maxValue: 637,  observation: '' },
  { id: '14', name: 'Geladeira',                                description: '', minValue: 3500, maxValue: 3500, observation: '' },
  { id: '15', name: 'Fogão',                                    description: '', minValue: 1200, maxValue: 1200, observation: '' },
  { id: '16', name: 'Micro-ondas',                              description: '', minValue: 700,  maxValue: 700,  observation: '' },
  { id: '17', name: 'Air fryer',                                description: '', minValue: 500,  maxValue: 500,  observation: '' },
  { id: '18', name: 'Liquidificador',                           description: '', minValue: 180,  maxValue: 180,  observation: '' },
  { id: '19', name: 'Lava Louça',                               description: '', minValue: 4500, maxValue: 4500, observation: '' },
  { id: '20', name: 'Batedeira',                                description: '', minValue: 100,  maxValue: 100,  observation: '' },
  { id: '21', name: 'Mixer',                                    description: '', minValue: 170,  maxValue: 170,  observation: '' },
  { id: '22', name: 'Chaleira elétrica',                        description: '', minValue: 150,  maxValue: 150,  observation: '' },
  { id: '23', name: 'Moedor de café',                           description: '', minValue: 190,  maxValue: 190,  observation: '' },
  { id: '24', name: 'Escorredor de louças',                     description: '', minValue: 80,   maxValue: 80,   observation: '' },
  { id: '25', name: 'Tábua de corte',                           description: '', minValue: 50,   maxValue: 50,   observation: '' },
  { id: '26', name: 'Forma de pudim',                           description: '', minValue: 50,   maxValue: 50,   observation: '' },
  { id: '27', name: 'Forma de bolo',                            description: '', minValue: 30,   maxValue: 30,   observation: '' },
  { id: '28', name: 'Assadeira grande e média',                 description: '', minValue: 70,   maxValue: 70,   observation: '' },
  { id: '29', name: 'Panela de pressão',                        description: '', minValue: 200,  maxValue: 200,  observation: '' },
  { id: '30', name: 'Churrasqueira',                            description: '', minValue: 300,  maxValue: 300,  observation: '' },
  { id: '31', name: 'Garrafa térmica',                          description: '', minValue: 70,   maxValue: 70,   observation: '' },
  { id: '32', name: 'Cama',                                     description: '', minValue: 1200, maxValue: 1200, observation: '' },
  { id: '33', name: 'Colchão',                                  description: '', minValue: 2000, maxValue: 2000, observation: '' },
  { id: '34', name: 'Jogo de lençol',                           description: '', minValue: 250,  maxValue: 250,  observation: '' },
  { id: '35', name: 'Edredom / cobertor',                       description: '', minValue: 300,  maxValue: 300,  observation: '' },
  { id: '36', name: 'Travesseiros (2)',                         description: '', minValue: 250,  maxValue: 250,  observation: '' },
  { id: '37', name: 'Protetor de colchão',                      description: '', minValue: 120,  maxValue: 120,  observation: '' },
  { id: '38', name: 'Almofadas decorativas',                    description: '', minValue: 150,  maxValue: 150,  observation: '' },
  { id: '39', name: 'Guarda-roupa',                             description: '', minValue: 2500, maxValue: 2500, observation: '' },
  { id: '40', name: 'Sapateira',                                description: '', minValue: 300,  maxValue: 300,  observation: '' },
  { id: '41', name: 'Chuveiro',                                 description: '', minValue: 250,  maxValue: 250,  observation: '' },
  { id: '42', name: 'Torneira de banheiro',                     description: '', minValue: 180,  maxValue: 180,  observation: '' },
  { id: '43', name: 'Espelho de banheiro',                      description: '', minValue: 300,  maxValue: 300,  observation: '' },
  { id: '44', name: 'Suporte de shampoo',                       description: '', minValue: 80,   maxValue: 80,   observation: '' },
  { id: '45', name: 'Tapete de banheiro',                       description: '', minValue: 80,   maxValue: 80,   observation: '' },
  { id: '46', name: 'Toalhas de rosto',                         description: '', minValue: 100,  maxValue: 100,  observation: '' },
  { id: '47', name: 'Toalhas de banho',                         description: '', minValue: 250,  maxValue: 250,  observation: '' },
  { id: '48', name: 'Porta escova de dente',                    description: '', minValue: 50,   maxValue: 50,   observation: '' },
  { id: '49', name: 'Máquina de lavar',                         description: '', minValue: 2500, maxValue: 2500, observation: '' },
  { id: '50', name: 'Varal ou estendal',                        description: '', minValue: 150,  maxValue: 150,  observation: '' },
  { id: '51', name: 'Aspirador vertical',                       description: '', minValue: 500,  maxValue: 500,  observation: '' },
  { id: '52', name: 'Robô inteligente varre/passa pano/aspira', description: '', minValue: 1500, maxValue: 1500, observation: '' },
  { id: '53', name: 'Vassoura',                                 description: '', minValue: 40,   maxValue: 40,   observation: '' },
  { id: '54', name: 'Rodo',                                     description: '', minValue: 30,   maxValue: 30,   observation: '' },
  { id: '55', name: 'Pá',                                       description: '', minValue: 20,   maxValue: 20,   observation: '' },
  { id: '56', name: 'Mesa externa',                             description: '', minValue: 700,  maxValue: 700,  observation: '' },
  { id: '57', name: 'Kit cadeira e mesa externa',               description: '', minValue: 1200, maxValue: 1200, observation: '' },
  { id: '58', name: 'Cadeira de bambu alumínio (4 lugares)',    description: '', minValue: 1500, maxValue: 1500, observation: '' },
  { id: '59', name: 'Ajudar no terno do noivo',                 description: '', minValue: 300,  maxValue: 300,  observation: '' },
  { id: '60', name: 'Ajudar com a festa',                       description: '', minValue: 600,  maxValue: 600,  observation: '' },
  { id: '61', name: 'Ajudar no vestido da noiva',               description: '', minValue: 300,  maxValue: 300,  observation: '' },
  { id: '62', name: 'Cabelo e make da noiva',                   description: '', minValue: 600,  maxValue: 600,  observation: '' },
  { id: '63', name: 'Buquê da noiva',                           description: '', minValue: 200,  maxValue: 200,  observation: '' },
];

const pixGift: GiftItem = {
  id: 'pix',
  name: 'Pix livre com mensagem',
  description: 'Contribua com o valor que desejar',
  minValue: 0,
  maxValue: 0,
  observation: '',
};

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

// Calcular valores mínimos e máximos uma vez
const minPrice = Math.min(...gifts.map((g) => g.minValue));
const maxPrice = Math.max(...gifts.map((g) => g.maxValue));

const Index = () => {
  const location = useLocation();
  const [searchText, setSearchText] = useState('');
  // Inicializa com valores seguros - 0 a 5000 cobre todos os presentes
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentAmountDisplay, setPaymentAmountDisplay] = useState<string>('0,00');
  const [showPixModal, setShowPixModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const scrollToRsvp = () => {
    const element = document.getElementById('rsvp');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navegação por hash (ex.: /#presentes)
  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.substring(1);
    const timer = setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  // Função para limpar estados quando modais são fechados
  const resetPaymentStates = () => {
    setSelectedGift(null);
  };

  // Filtrar e ordenar presentes
  const { filteredGifts, shouldShowPix } = useMemo(() => {
    let filtered = [...gifts];

    // Filtro por texto
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (gift) =>
          gift.name.toLowerCase().includes(searchLower) ||
          gift.description.toLowerCase().includes(searchLower) ||
          gift.observation.toLowerCase().includes(searchLower)
      );
    }

    // Filtro por faixa de preço - verifica se há sobreposição entre a faixa do presente e a faixa selecionada
    // Se o range cobre todos os presentes (sem filtro), mostra todos
    const currentMin = priceRange[0];
    const currentMax = priceRange[1];
    // Considera como range completo se o mínimo for <= ao menor preço E o máximo for >= ao maior preço
    // Ou se estiver no range inicial [0, 5000] que cobre tudo
    const isFullRange = (currentMin <= minPrice && currentMax >= maxPrice) || (currentMin <= 0 && currentMax >= 5000);
    
    // Só aplica filtro se não for o range completo
    if (!isFullRange) {
      filtered = filtered.filter((gift) => {
        // Verifica se há sobreposição: o presente está na faixa se o mínimo do presente <= máximo da faixa E máximo do presente >= mínimo da faixa
        return gift.minValue <= currentMax && gift.maxValue >= currentMin;
      });
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name, 'pt-BR');
        case 'name-desc':
          return b.name.localeCompare(a.name, 'pt-BR');
        case 'price-asc':
          return (a.minValue + a.maxValue) / 2 - (b.minValue + b.maxValue) / 2;
        case 'price-desc':
          return (b.minValue + b.maxValue) / 2 - (a.minValue + a.maxValue) / 2;
        default:
          return 0;
      }
    });

    // Determina se deve mostrar o Vale PIX
    const hasFilters = searchText.trim() || priceRange[0] > 0 || priceRange[1] < 5000;
    const shouldShowPix = !hasFilters;

    return { filteredGifts: filtered, shouldShowPix };
  }, [searchText, priceRange, sortBy]);

  const formatPrice = (min: number, max: number) => {
    if (min === 0 && max === 0) return 'Qualquer valor';
    // Se os valores são iguais, mostra apenas uma vez
    if (min === max) {
      return `R$ ${min.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (max >= 1000) {
      return `R$ ${min.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} – ${max.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}+`;
    }
    return `R$ ${min.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} – ${max.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const clearFilters = () => {
    setSearchText('');
    setPriceRange([0, 5000]);
    setSelectedPriceRange(null);
  };

  const applyPriceRange = (range: string) => {
    setSelectedPriceRange(range);
    switch (range) {
      case '0-200':
        setPriceRange([0, 200]);
        break;
      case '200-500':
        setPriceRange([200, 500]);
        break;
      case '500-1000':
        setPriceRange([500, 1000]);
        break;
      case '1000-2000':
        setPriceRange([1000, 2000]);
        break;
      case '2000+':
        setPriceRange([2000, 5000]);
        break;
      default:
        setPriceRange([0, 5000]);
    }
  };

  const hasActiveFilters = searchText.trim() || priceRange[0] > 0 || priceRange[1] < 5000;

  // Função para formatar valor enquanto digita (estilo Nubank)
  const formatCurrencyInput = (value: string): { display: string; numeric: number } => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    if (numbers === '') {
      return { display: '0,00', numeric: 0 };
    }
    
    // Converte para número (centavos)
    const numericValue = parseInt(numbers, 10) / 100;
    
    // Formata para exibição
    const formatted = numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    
    return { display: formatted, numeric: numericValue };
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { display, numeric } = formatCurrencyInput(e.target.value);
    setPaymentAmountDisplay(display);
    setPaymentAmount(numeric);
  };

  // Calcula o valor padrão quando um presente é selecionado
  useEffect(() => {
    if (selectedGift) {
      if (selectedGift.minValue === 0 && selectedGift.maxValue === 0) {
        // Vale PIX - valor padrão de 100
        setPaymentAmount(100);
        setPaymentAmountDisplay('100,00');
      } else if (selectedGift.minValue === selectedGift.maxValue) {
        // Valor fixo
        setPaymentAmount(selectedGift.minValue);
        setPaymentAmountDisplay(selectedGift.minValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      } else {
        // Faixa de valores - usa o valor médio
        const avgValue = Math.round((selectedGift.minValue + selectedGift.maxValue) / 2);
        setPaymentAmount(avgValue);
        setPaymentAmountDisplay(avgValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      }
    }
  }, [selectedGift]);

  const formatAmountDisplay = (amount: number) =>
    amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const openPixModal = (gift: GiftItem, amount: number) => {
    if (amount <= 0) {
      toast.error('Por favor, informe um valor válido');
      return;
    }

    if (gift.minValue > 0 && amount < gift.minValue) {
      toast.error(`O valor mínimo é R$ ${gift.minValue.toLocaleString('pt-BR')}`);
      return;
    }

    if (gift.maxValue > 0 && amount > gift.maxValue) {
      toast.error(`O valor máximo é R$ ${gift.maxValue.toLocaleString('pt-BR')}`);
      return;
    }

    setSelectedGift(gift);
    setPaymentAmount(amount);
    setPaymentAmountDisplay(formatAmountDisplay(amount));
    setIsModalOpen(false);
    setShowPixModal(true);
  };

  const handleGiftClick = (gift: GiftItem) => {
    if (gift.minValue === 0 && gift.maxValue === 0) {
      setSelectedGift(gift);
      setPaymentAmount(100);
      setPaymentAmountDisplay('100,00');
      setIsModalOpen(true);
      return;
    }

    if (gift.minValue === gift.maxValue) {
      openPixModal(gift, gift.minValue);
      return;
    }

    const avgValue = Math.round((gift.minValue + gift.maxValue) / 2);
    setSelectedGift(gift);
    setPaymentAmount(avgValue);
    setPaymentAmountDisplay(formatAmountDisplay(avgValue));
    setIsModalOpen(true);
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    toast.success('Chave PIX copiada!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Handler para fechar modal de valor
  const handleCloseValueModal = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      resetPaymentStates();
    }
  };

  // Handler para fechar modal PIX
  const handleClosePixModal = (open: boolean) => {
    setShowPixModal(open);
    if (!open) {
      resetPaymentStates();
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      <NavBar />

      {/* Hero Section */}
      <section
        id='inicio'
        className='pt-32 pb-20 bg-white min-h-screen flex flex-col justify-center items-center px-4 relative'
      >
        {/* Background decorative elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute top-20 left-10 w-32 h-32 bg-wedding-gold/10 rounded-full blur-xl'></div>
          <div className='absolute bottom-20 right-10 w-40 h-40 bg-wedding-rose/10 rounded-full blur-xl'></div>
          <div className='absolute top-1/2 left-1/4 w-24 h-24 bg-wedding-gold/5 rounded-full blur-lg'></div>
        </div>

        <div className='text-center relative z-10'>
          <div className='mb-6'>
            <span className='text-sm md:text-base text-wedding-gold font-medium tracking-wider uppercase'>
              Convidamos você para celebrar
            </span>
          </div>

          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold font-playfair mb-4 bg-gradient-to-r from-wedding-gold to-wedding-rose bg-clip-text text-transparent'>
            Luan & Cauane
          </h1>

          <div className='w-full max-w-lg mx-auto h-px bg-gradient-to-r from-transparent via-wedding-gold to-transparent mb-8'></div>

          <p className='text-lg md:text-xl font-playfair mb-8 text-wedding-gold'>
            17 de Outubro de 2026
          </p>

          <div className='mb-8'>
            <p className='text-sm md:text-base text-gray-600 italic mb-2'>
              "Por isso o homem deixará pai e mãe e se unirá à sua mulher, e os
              dois se tornarão uma só carne."
            </p>
            <p className='text-xs text-wedding-gold font-medium'>
              — Gênesis 2:24
            </p>
          </div>

          <div className='my-12'>
            <CountdownTimer />
          </div>

          <button
            onClick={scrollToRsvp}
            className='mt-8 py-4 px-10 bg-gradient-to-r from-wedding-gold to-wedding-gold/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-lg'
          >
            Confirmar Presença
          </button>
        </div>
      </section>

      {/* Gallery Section */}
      <section id='galeria' className='py-20 bg-white'>
        <div className='container mx-auto px-4'>
          <RevealOnScroll>
            <h2 className='text-3xl md:text-4xl font-playfair text-center mb-4'>
              Nossos Momentos
            </h2>
            <p className='text-center text-gray-600 mb-12 max-w-2xl mx-auto'>
              Alguns registros da nossa história juntos
            </p>
          </RevealOnScroll>
          <ImageCarousel images={galleryImages} />
        </div>
      </section>

      {/* Timeline Section */}
      <section id='timeline' className='py-20 bg-white'>
        <div className='container mx-auto'>
          <RevealOnScroll>
            <h2 className='text-3xl md:text-4xl font-playfair text-center mb-12'>
              Nossa Jornada
            </h2>
          </RevealOnScroll>

          <RevealOnScroll>
            <Timeline />
          </RevealOnScroll>
        </div>
      </section>

      {/* Ceremony Details */}
      <section id='cerimonia' className='py-20 bg-white'>
        <div className='container mx-auto'>
          <RevealOnScroll>
            <h2 className='text-3xl md:text-4xl font-playfair text-center mb-4'>
              Detalhes da Cerimônia
            </h2>
            <p className='text-center text-gray-600 mb-6 max-w-2xl mx-auto'>
              Junte-se a nós neste momento especial de amor e celebração
            </p>
            <div className='text-center mb-12'>
              <p className='text-sm text-gray-500 italic mb-1'>
                "O amor é paciente, o amor é bondoso. Não inveja, não se
                vangloria, não se orgulha."
              </p>
              <p className='text-xs text-wedding-gold font-medium'>
                — 1 Coríntios 13:4
              </p>
            </div>
          </RevealOnScroll>

          <div className='max-w-4xl mx-auto'>
            <RevealOnScroll className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-wedding-gold/20 hover:shadow-xl transition-all duration-300'>
                <div className='w-16 h-16 bg-wedding-gold/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-wedding-gold'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-playfair mb-3 text-wedding-gold'>
                  Data e Hora
                </h3>
                <p className='mb-2 font-semibold text-lg'>
                  17 de Outubro de 2026
                </p>
                <p className='text-gray-600'>
                  Sábado, às 17:00
                </p>
              </div>

              <div className='text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-wedding-gold/20 hover:shadow-xl transition-all duration-300'>
                <div className='w-16 h-16 bg-wedding-gold/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-wedding-gold'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-playfair mb-3 text-wedding-gold'>
                  Local
                </h3>
                <p className='mb-2 font-semibold text-lg'>
                  R. Xavantes, 922 - Vila Tupi
                </p>
                <p className='text-gray-600'>
                  Praia Grande - SP, 11703-300
                </p>
              </div>

              <div className='text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-wedding-gold/20 hover:shadow-xl transition-all duration-300 md:col-span-2'>
                <div className='w-16 h-16 bg-wedding-gold/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-wedding-gold'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-playfair mb-3 text-wedding-gold'>
                  Dress Code
                </h3>
                <p className='font-semibold text-lg'>
                  Esporte Fino
                </p>
                <p className='text-gray-600 mt-2'>
                  Elegante e sofisticado
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id='localizacao' className='py-20 bg-white'>
        <div className='container mx-auto'>
          <RevealOnScroll>
            <h2 className='text-3xl md:text-4xl font-playfair text-center mb-12'>
              Localização
            </h2>
          </RevealOnScroll>

          <RevealOnScroll className='max-w-4xl mx-auto w-full'>
            <div className='rounded-lg overflow-hidden shadow-md w-full max-w-full'>
              <iframe
                src='https://maps.google.com/maps?q=R.+Xavantes,+922+-+Vila+Tupi,+Praia+Grande+-+SP,+11703-300&t=&z=15&ie=UTF8&iwloc=&output=embed'
                width='100%'
                height='600'
                style={{ border: 0, maxWidth: '100%' }}
                allowFullScreen={true}
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </div>

            <div className='mt-8 text-center'>
              <h3 className='font-playfair text-xl mb-4'>
                Como Chegar
              </h3>
              <p className='max-w-2xl mx-auto text-gray-600'>
                O local está localizado na R. Xavantes, 922 - Vila Tupi, Praia Grande - SP, 11703-300.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* RSVP Form */}
      <section id='rsvp' className='py-20 bg-white'>
        <div className='container mx-auto'>
          <RevealOnScroll>
            <h2 className='text-3xl md:text-4xl font-playfair text-center mb-4'>
              Confirme sua Presença
            </h2>
            <p className='text-center max-w-2xl mx-auto mb-8 text-gray-600'>
              Gostaríamos muito de contar com a sua presença em nosso dia
              especial. Por favor, confirme abaixo até 17 de Setembro de 2026.
            </p>
            <div className='w-24 h-1 bg-gradient-to-r from-wedding-gold to-wedding-rose mx-auto mb-12'></div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className='mx-auto'>
              <RsvpForm />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Gift List Section */}
      <section id='presentes' className='py-8 bg-white'>
        <div className='container mx-auto'>
          <div className='text-center mb-8'>
              <div className='inline-flex items-center justify-center w-16 h-16 bg-wedding-gold/10 rounded-full mb-6'>
                <Gift className='w-8 h-8 text-wedding-gold' />
              </div>
            <h1 className='text-4xl md:text-5xl font-playfair mb-4 bg-gradient-to-r from-wedding-gold to-wedding-rose bg-clip-text text-transparent'>
                Lista de Presentes
            </h1>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                Ajude-nos a construir nosso lar com presentes especiais. Escolha algo que faça sentido para você!
              </p>
          </div>

          <div className='flex flex-col lg:flex-row gap-6'>
            {/* Sidebar Filters */}
            <aside className={`lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card className='sticky top-24 bg-white/80 backdrop-blur-sm border-wedding-gold/20'>
                <CardHeader className='pb-4'>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-lg font-semibold text-wedding-gold flex items-center gap-2'>
                      <Filter className='w-5 h-5' />
                      Filtros
                    </CardTitle>
                    {hasActiveFilters && (
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={clearFilters}
                        className='text-xs h-8 text-wedding-gold hover:text-wedding-gold hover:bg-wedding-gold/10'
                      >
                        <X className='w-3 h-3 mr-1' />
                        Limpar
                      </Button>
                    )}
            </div>
                </CardHeader>
                <CardContent className='space-y-6'>
                  {/* Busca */}
                  <div>
                    <label className='text-sm font-medium mb-2 block text-gray-700'>
                      Buscar
                    </label>
                    <div className='relative'>
                      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                      <Input
                        type='text'
                        placeholder='Nome, descrição...'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className='pl-9 bg-white'
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Faixas de Preço Rápidas */}
                  <div>
                    <label className='text-sm font-medium mb-3 block text-gray-700'>
                      Faixa de Preço
                    </label>
                    <div className='space-y-2'>
                      {[
                        { label: 'Até R$ 200', value: '0-200' },
                        { label: 'R$ 200 - R$ 500', value: '200-500' },
                        { label: 'R$ 500 - R$ 1.000', value: '500-1000' },
                        { label: 'R$ 1.000 - R$ 2.000', value: '1000-2000' },
                        { label: 'Acima de R$ 2.000', value: '2000+' },
                      ].map((range) => (
                        <button
                          key={range.value}
                          onClick={() => applyPriceRange(range.value)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedPriceRange === range.value
                              ? 'bg-wedding-gold/20 text-wedding-gold font-medium'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Slider de Preço */}
                  <div>
                    <label className='text-sm font-medium mb-3 block text-gray-700'>
                      Preço: R$ {priceRange[0].toLocaleString('pt-BR')} - R$ {priceRange[1].toLocaleString('pt-BR')}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => {
                        setPriceRange(value as [number, number]);
                        setSelectedPriceRange(null);
                      }}
                      min={minPrice}
                      max={maxPrice}
                      step={50}
                      className='w-full'
                    />
                    <div className='flex justify-between text-xs text-gray-500 mt-2'>
                      <span>R$ {minPrice.toLocaleString('pt-BR')}</span>
                      <span>R$ {maxPrice.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content Area */}
            <div className='flex-1 min-w-0'>
              {/* Toolbar */}
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setShowFilters(!showFilters)}
                    className='lg:hidden border-wedding-gold text-wedding-gold hover:bg-wedding-gold/10 hover:text-wedding-gold'
                  >
                    <Filter className='w-4 h-4 mr-2' />
                    Filtros
                  </Button>
                  <p className='text-sm text-gray-600'>
                    {filteredGifts.length} {filteredGifts.length === 1 ? 'presente encontrado' : 'presentes encontrados'}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <ArrowUpDown className='w-4 h-4 text-gray-400' />
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <SelectTrigger className='w-[180px] bg-white'>
                      <SelectValue placeholder='Ordenar por' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='name-asc' className='focus:bg-wedding-gold/10 focus:text-wedding-gold'>
                        Nome (A-Z)
                      </SelectItem>
                      <SelectItem value='name-desc' className='focus:bg-wedding-gold/10 focus:text-wedding-gold'>
                        Nome (Z-A)
                      </SelectItem>
                      <SelectItem value='price-asc' className='focus:bg-wedding-gold/10 focus:text-wedding-gold'>
                        Preço: Menor
                      </SelectItem>
                      <SelectItem value='price-desc' className='focus:bg-wedding-gold/10 focus:text-wedding-gold'>
                        Preço: Maior
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Gifts Grid */}
              <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6'>
                {/* Lista de presentes filtrados */}
                {filteredGifts.map((gift) => (
                  <Card
                    key={gift.id}
                    className='bg-white/80 backdrop-blur-sm border-wedding-gold/20 hover:shadow-xl transition-all duration-300 flex flex-col h-full'
                  >
                    <CardHeader className='flex-shrink-0'>
                      <CardTitle className='text-wedding-gold line-clamp-2 text-sm md:text-base'>{gift.name}</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col flex-grow justify-between'>
                      <p className='text-sm md:text-lg font-semibold text-wedding-gold mb-4'>
                        {formatPrice(gift.minValue, gift.maxValue)}
                      </p>
                      <Button
                        onClick={() => handleGiftClick(gift)}
                        className='w-full bg-wedding-gold hover:bg-wedding-gold/90 text-white text-xs md:text-sm py-2 md:py-3 mt-auto'
                      >
                        Presentear
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                {/* Pix livre - aparece quando não há filtros, sempre no final */}
                {shouldShowPix && (
                  <Card className='bg-white/80 backdrop-blur-sm border-wedding-gold/20 hover:shadow-xl transition-all duration-300 flex flex-col h-full'>
                    <CardHeader className='flex-shrink-0'>
                      <CardTitle className='text-wedding-gold line-clamp-2 text-sm md:text-base'>{pixGift.name}</CardTitle>
                      <CardDescription className='text-gray-700 line-clamp-2 text-xs md:text-sm'>
                        {pixGift.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col flex-grow justify-between'>
                      <p className='text-sm md:text-lg font-semibold text-wedding-gold mb-4'>
                        {formatPrice(pixGift.minValue, pixGift.maxValue)}
                      </p>
                      <Button
                        onClick={() => handleGiftClick(pixGift)}
                        className='w-full bg-wedding-gold hover:bg-wedding-gold/90 text-white text-xs md:text-sm py-2 md:py-3 mt-auto'
                      >
                        Presentear
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Mensagem quando não há resultados */}
              {!shouldShowPix && filteredGifts.length === 0 && (
                <div className='text-center py-12'>
                  <Gift className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                  <p className='text-lg text-gray-600 mb-4'>
                    Nenhum presente encontrado com os filtros aplicados.
                  </p>
                  <Button
                    variant='outline'
                    onClick={clearFilters}
                    className='text-wedding-gold border-wedding-gold hover:bg-wedding-gold/10'
                  >
                    <X className='w-4 h-4 mr-2' />
                    Limpar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Valor (apenas quando necessário) */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseValueModal}>
        <DialogContent className='sm:max-w-md bg-white'>
          <DialogHeader>
            <DialogTitle className='text-wedding-gold text-xl'>
              Escolher Valor
            </DialogTitle>
            <DialogDescription className='text-gray-600'>
              {selectedGift && (
                <>
                  Presente: <span className='font-semibold'>{selectedGift.name}</span>
                  <br />
                  {selectedGift.minValue === 0 && selectedGift.maxValue === 0 ? (
                    <span className='text-sm'>Escolha o valor que deseja contribuir</span>
                  ) : (
                    <span className='text-sm'>
                      Valor sugerido: {formatPrice(selectedGift.minValue, selectedGift.maxValue)}
                    </span>
                  )}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-3'>
              <label className='text-sm font-medium text-gray-700'>
                Valor
              </label>
              <div className='relative flex items-center border-2 border-wedding-gold rounded-lg bg-white focus-within:ring-2 focus-within:ring-wedding-gold focus-within:ring-offset-2'>
                <span className='absolute left-4 text-xl font-semibold text-gray-600'>
                  R$
                </span>
                <input
                  type='text'
                  inputMode='numeric'
                  value={paymentAmountDisplay}
                  onChange={handleAmountChange}
                  className='w-full bg-transparent text-2xl md:text-3xl font-bold text-gray-900 pl-12 pr-4 py-4 text-right focus:outline-none'
                  placeholder='0,00'
                  readOnly={
                    selectedGift
                      ? selectedGift.minValue === selectedGift.maxValue &&
                        !(selectedGift.minValue === 0 && selectedGift.maxValue === 0)
                      : true
                  }
                />
              </div>
              {selectedGift && selectedGift.minValue === 0 && selectedGift.maxValue === 0 ? (
                <p className='text-xs text-gray-500'>
                  Escolha o valor que deseja contribuir
                </p>
              ) : selectedGift ? (
                <p className='text-xs text-gray-500'>
                  {selectedGift.minValue === selectedGift.maxValue ? (
                    `Valor fixo: R$ ${selectedGift.minValue.toLocaleString('pt-BR')}`
                  ) : (
                    <>
                      Valor sugerido: {formatPrice(selectedGift.minValue, selectedGift.maxValue)}
                      <br />
                      Mínimo: R$ {selectedGift.minValue.toLocaleString('pt-BR')}
                      {selectedGift.maxValue > 0 && ` | Máximo: R$ ${selectedGift.maxValue.toLocaleString('pt-BR')}`}
                    </>
                  )}
                </p>
              ) : null}
            </div>
          </div>
          <div className='flex gap-3 pt-4'>
            <Button
              variant='outline'
              onClick={() => {
                setIsModalOpen(false);
                resetPaymentStates();
              }}
              className='flex-1 border-wedding-gold text-wedding-gold hover:bg-wedding-gold/10 hover:text-wedding-gold'
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                if (selectedGift) {
                  openPixModal(selectedGift, paymentAmount);
                }
              }}
              disabled={paymentAmount <= 0}
              className='flex-1 bg-wedding-gold hover:bg-wedding-gold/90 text-white disabled:opacity-50'
            >
              Continuar com PIX
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de PIX */}
      <Dialog open={showPixModal} onOpenChange={handleClosePixModal}>
        <DialogContent className='sm:max-w-md bg-white'>
          <DialogHeader>
            <DialogTitle className='text-wedding-gold text-xl'>
              Pagamento via PIX
            </DialogTitle>
            <DialogDescription className='text-gray-600'>
              Copie a chave PIX e faça o pagamento
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            {/* Informações PIX */}
            <div className='space-y-2 bg-gray-50 p-4 rounded-lg'>
              {selectedGift && (
                <div>
                  <p className='text-xs text-gray-500'>Presente:</p>
                  <p className='text-sm font-semibold text-gray-900'>{selectedGift.name}</p>
                </div>
              )}
              <div>
                <p className='text-xs text-gray-500'>Nome:</p>
                <p className='text-sm font-semibold text-gray-900'>
                  Luan de Souza Campos Calasans
                </p>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Chave PIX:</p>
                <div className='flex items-start gap-2'>
                  <p className='text-sm font-semibold text-gray-900 flex-1 break-all'>
                    {PIX_KEY}
                  </p>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={copyPixCode}
                    className='shrink-0 border-wedding-gold text-wedding-gold hover:bg-wedding-gold/10 hover:text-wedding-gold hover:border-wedding-gold mt-0.5'
                  >
                    {copied ? (
                      <Check className='w-4 h-4 text-wedding-gold' />
                    ) : (
                      <Copy className='w-4 h-4' />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <p className='text-xs text-gray-500'>Valor:</p>
                <p className='text-lg font-bold text-wedding-gold'>
                  R$ {paymentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
          <div className='flex gap-3 pt-4'>
            <Button
              variant='outline'
              onClick={() => {
                setShowPixModal(false);
                resetPaymentStates();
              }}
              className='flex-1 border-wedding-gold text-wedding-gold hover:bg-wedding-gold/10 hover:text-wedding-gold'
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className='py-20 bg-white text-center'>
        <div className='container mx-auto'>
          <div className='max-w-2xl mx-auto'>
            <h2 className='text-3xl font-playfair mb-4 bg-gradient-to-r from-wedding-gold to-wedding-rose bg-clip-text text-transparent'>
              Luan & Cauane
            </h2>
            <p className='text-wedding-gold mb-6 text-lg font-medium'>
              17.10.2026
            </p>
            <p className='text-gray-600 mb-8 text-lg'>
              Com amor, esperamos por você em nosso dia especial.
            </p>

            <div className='flex justify-center items-center gap-6 mb-8'>
              <div className='w-1 h-1 bg-wedding-gold rounded-full'></div>
              <div className='w-2 h-1 bg-wedding-gold rounded-full'></div>
              <div className='w-1 h-1 bg-wedding-gold rounded-full'></div>
            </div>

            <p className='text-sm text-gray-500 mb-4'>
              Que este seja o início de uma nova e bela jornada juntos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
