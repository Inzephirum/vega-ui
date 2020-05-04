import React, { useContext } from 'react';
import { block } from 'bem-cn';

export const b = block('VegaCarousel');

export interface Slide {
  idx: number;
  caption: string;
}

export interface AutoPlayAPI {
  pause(): void;
  resume(): void;
  isPaused(): boolean;
}

export interface CarouselAPI {
  currentIDx: number;
  slides: Slide[];
  autoPlay: AutoPlayAPI;
  to: (idx: number) => void;
  next: () => void;
  prev: () => void;
}

const noop = (): void => {};

export const CarouselContext = React.createContext<CarouselAPI>({
  currentIDx: 0,
  slides: [],
  to: noop,
  next: noop,
  prev: noop,
  autoPlay: {
    pause: noop,
    resume: noop,
    isPaused: (): boolean => true,
  },
});

export function useCarousel(): CarouselAPI {
  return useContext(CarouselContext);
}

interface SlideAPI {
  idx: number;
  active: boolean;
  caption: string;
}

export function useSlide(idx?: number): SlideAPI {
  const carousel = useCarousel();
  const slideIDx = idx !== undefined ? idx : carousel.currentIDx;
  const slide = carousel.slides[slideIDx];

  return {
    idx: slideIDx,
    active: carousel.currentIDx === slideIDx,
    caption: slide?.caption ?? '',
  };
}
