import React from 'react';
import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Carousel } from './Carousel';

const stories = storiesOf('ui/Carousel', module);

interface StoryProps {
  current: number;
  dots: boolean;
  arrows: boolean;
  autoPlay: number;
  onChange(idx: number): void;
}

function useStoryProps(): StoryProps {
  const [current, setCurrent] = React.useState(0);
  const autoPlay = number('autoPlay', 0, {
    min: 0,
    max: 10 * 1000,
    range: true,
    step: 1000,
  });

  const onChange = action('onChange');

  const handleChange = (idx: number): void => {
    setCurrent(idx);
    onChange(idx);
  };

  return {
    current,
    dots: boolean('dots', true),
    arrows: boolean('arrows', true),
    autoPlay,
    onChange: handleChange,
  };
}

const Container = styled.div`
  width: 100%;
  max-width: 989px;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  display: flex;
  align-items: center;
`;

stories.addDecorator((story) => {
  return <Container>{story()}</Container>;
});

const Image = styled.div<{ src: string }>`
  background-color: #c4c4c4;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.44);
  overflow: hidden;
  background-image: url('${(props): string => props.src}');
  background-position: center;
  background-size: cover;
  padding-top: 56.32%;
`;

stories.add('с изображением', () => {
  const props = useStoryProps();
  return (
    <Carousel {...props}>
      <Carousel.Slide caption="caption 1">
        <Image src="https://picsum.photos/1000/560" />
      </Carousel.Slide>
      <Carousel.Slide caption="caption 2">
        <Image src="https://picsum.photos/seed/picsum/1000/560" />
      </Carousel.Slide>
    </Carousel>
  );
});

const Content = styled.div`
  background-color: var(--color-bg-ghost);
  padding: 1em;
  border-radius: 8px;
  color: var(--color-typo-primary);
  text-align: center;
  font-size: var(--size-text-3xl);
`;

const slides = [
  { caption: 'caption 1', content: 'slide 1' },
  { caption: 'caption 2', content: 'slide 2' },
  { caption: 'caption 3', content: 'slide 3' },
];

stories.add('с произвольным контентом', () => {
  const props = useStoryProps();
  return (
    <Carousel {...props}>
      {slides.map((slide) => (
        <Carousel.Slide key={slide.caption} caption={slide.caption}>
          <Content>{slide.content}</Content>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
});
