import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const validImages = useMemo(
    () => images.filter((img) => img && img.trim() !== ''),
    [images]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const openPopup = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setSelectedImage(null);
    setSelectedImageIndex(0);
    document.body.style.overflow = '';
  };

  const goToPreviousImage = () => {
    const newIndex =
      selectedImageIndex === 0 ? validImages.length - 1 : selectedImageIndex - 1;
    setSelectedImageIndex(newIndex);
    setSelectedImage(validImages[newIndex]);
  };

  const goToNextImage = () => {
    const newIndex =
      selectedImageIndex === validImages.length - 1 ? 0 : selectedImageIndex + 1;
    setSelectedImageIndex(newIndex);
    setSelectedImage(validImages[newIndex]);
  };

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.reInit();

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi, validImages.length]);

  useEffect(() => {
    if (!emblaApi) return;

    const viewport = emblaApi.rootNode();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          emblaApi.reInit();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(viewport);
    return () => observer.disconnect();
  }, [emblaApi]);

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          closePopup();
          break;
        case 'ArrowLeft':
          goToPreviousImage();
          break;
        case 'ArrowRight':
          goToNextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedImageIndex, validImages]);

  if (validImages.length === 0) {
    return (
      <div className='w-full text-center py-12 text-gray-500'>
        Nenhuma imagem disponível
      </div>
    );
  }

  return (
    <>
      <div className='relative'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex touch-pan-y'>
            {validImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className='min-w-0 shrink-0 grow-0 basis-full pl-3 first:pl-0 md:basis-1/2 lg:basis-1/3'
              >
                <div className='relative aspect-[3/4] min-h-[280px] overflow-hidden rounded-md shadow-md bg-gray-200'>
                  {!failedImages.has(index) ? (
                    <img
                      src={image}
                      alt={`Luan & Cauane ${index + 1}`}
                      className='h-full w-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer'
                      onError={() => handleImageError(index)}
                      onClick={() => openPopup(image, index)}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      decoding='async'
                      draggable={false}
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center bg-gray-200 text-gray-400'>
                      <span className='text-sm'>Imagem não disponível</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type='button'
          onClick={scrollPrev}
          className='absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-300 bg-white/80 p-3 shadow-md transition-colors hover:bg-white'
          aria-label='Imagem anterior'
        >
          <ArrowLeft className='h-6 w-6 text-wedding-gold' />
        </button>

        <button
          type='button'
          onClick={scrollNext}
          className='absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-300 bg-white/80 p-3 shadow-md transition-colors hover:bg-white'
          aria-label='Próxima imagem'
        >
          <ArrowRight className='h-6 w-6 text-wedding-gold' />
        </button>
      </div>

      {selectedImage && (
        <div
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4'
          onClick={closePopup}
        >
          <div className='relative max-h-full max-w-4xl'>
            <button
              type='button'
              onClick={closePopup}
              className='absolute -top-12 right-0 z-10 p-2 text-white transition-colors hover:text-wedding-gold'
              aria-label='Fechar'
            >
              <X className='h-8 w-8' />
            </button>

            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                goToPreviousImage();
              }}
              className='absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70'
              aria-label='Imagem anterior'
            >
              <ArrowLeft className='h-6 w-6' />
            </button>

            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                goToNextImage();
              }}
              className='absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70'
              aria-label='Próxima imagem'
            >
              <ArrowRight className='h-6 w-6' />
            </button>

            <div className='absolute -top-12 left-0 text-sm text-white'>
              {selectedImageIndex + 1} de {validImages.length}
            </div>

            <img
              src={selectedImage}
              alt='Imagem expandida'
              className='max-h-[80vh] max-w-full rounded-lg object-contain'
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;
