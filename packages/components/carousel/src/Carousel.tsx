import React from 'react';

import { CarouselArrows } from './CarouselArrows';
import { CarouselCaption } from './CarouselCaption';
import { CarouselDots } from './CarouselDots';
import { CarouselManager, Slide as ManagerSlide } from './CarouselManager';
import { CarouselSlide, CarouselSlideProps } from './CarouselSlide';
import { b } from './context';

import './Carousel.css';

interface SlideProps extends CarouselSlideProps {
  caption?: string;
}

const Slide: React.FC<SlideProps> = () => {
  return null;
};

type Child = React.ReactElement<SlideProps>;

interface CarouselProps extends Omit<React.ComponentProps<typeof CarouselManager>, 'slides'> {
  current: number;
  arrows?: boolean;
  arrowNextLabel?: string;
  arrowPrevLabel?: string;
  arrowNextClassName?: string;
  arrowPrevClassName?: string;
  captionClassName?: string;
  dots?: boolean;
  dotsLabel?: string;
  dotsContainerClassName?: string;
  dotClassName?: string;
  className?: string;
  children: Child | Child[];
  onChange: (idx: number) => void;
}

interface CarouselComponent<P> extends React.FC<P> {
  Slide: typeof Slide;
}

export const Carousel: CarouselComponent<CarouselProps> = (props) => {
  const {
    className,
    arrows = true,
    arrowNextLabel,
    arrowPrevLabel,
    arrowNextClassName,
    arrowPrevClassName,
    captionClassName,
    dots = true,
    dotsLabel,
    dotsContainerClassName,
    dotClassName,
    children = [],
    current,
    autoPlay,
    onChange,
  } = props;

  const slides: ManagerSlide[] = [];
  const slidesProps: CarouselSlideProps[] = [];

  React.Children.forEach(children, (child: Child, index) => {
    slides.push({
      idx: index,
      caption: child.props.caption ?? '',
    });

    slidesProps.push(child.props);
  });

  if (slides.length === 0) {
    return null;
  }

  const currentSlideProps = slidesProps[current];

  if (currentSlideProps === undefined) {
    return null;
  }

  return (
    <CarouselManager current={current} slides={slides} autoPlay={autoPlay} onChange={onChange}>
      <div className={b.mix(className).toString()}>
        <div className={b('Container').toString()}>
          {arrows && (
            <CarouselArrows
              prevLabel={arrowPrevLabel}
              nextLabel={arrowNextLabel}
              prevClassName={arrowPrevClassName}
              nextClassName={arrowNextClassName}
            />
          )}
          <CarouselSlide {...currentSlideProps} />
        </div>
        <CarouselCaption className={captionClassName} />
        {dots && (
          <CarouselDots
            dotsLabel={dotsLabel}
            className={dotsContainerClassName}
            dotClassName={dotClassName}
          />
        )}
      </div>
    </CarouselManager>
  );
};

Carousel.Slide = Slide;
