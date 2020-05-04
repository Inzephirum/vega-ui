import React, { useEffect, useRef, useState } from 'react';

import { AutoPlayAPI, CarouselAPI, CarouselContext, Slide as ContextSlide } from './context';

export type Slide = ContextSlide;

interface CarouselManagerProps {
  current: number;
  slides: Slide[];
  autoPlay?: number;
  onChange: (idx: number) => void;
}

function useCallbackRef<T>(value: T): React.MutableRefObject<T> {
  const ref = useRef<T>(value);
  ref.current = value;

  return ref;
}

interface AutoPlayOptions {
  idx: number;
  interval: number;
  onNext(): void;
}

function useAutoplay({ interval, idx, onNext }: AutoPlayOptions): AutoPlayAPI {
  const callbackRef = useCallbackRef(onNext);
  const interavalIDRef = useRef<null | ReturnType<typeof setInterval>>(null);
  const [isPaused, setPause] = useState<boolean>(false);

  useEffect(() => {
    if (interval === 0 || Math.abs(interval) === Infinity) {
      return undefined;
    }

    interavalIDRef.current = setInterval(() => {
      if (isPaused) {
        return;
      }

      callbackRef.current();
    }, interval);

    return (): void => {
      if (interavalIDRef.current !== null) {
        clearInterval(interavalIDRef.current);
        interavalIDRef.current = null;
      }
    };
  }, [idx, interval, isPaused, callbackRef]);

  return {
    pause(): void {
      setPause(true);
    },
    resume(): void {
      setPause(false);
    },
    isPaused(): boolean {
      return isPaused;
    },
  };
}

export const CarouselManager: React.FC<CarouselManagerProps> = (props) => {
  const { current, slides, children, autoPlay = 0, onChange } = props;

  const total = slides.length;

  function prev(): void {
    onChange((total + (current - 1)) % total);
  }

  function next(): void {
    onChange((current + 1) % total);
  }

  const autoPlayApi = useAutoplay({ idx: current, interval: autoPlay, onNext: next });

  const value: CarouselAPI = {
    slides,
    currentIDx: current,
    autoPlay: autoPlayApi,
    to: onChange,
    prev,
    next,
  };

  return <CarouselContext.Provider value={value}>{children}</CarouselContext.Provider>;
};
