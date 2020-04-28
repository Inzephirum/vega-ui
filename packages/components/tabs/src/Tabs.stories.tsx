import React, { useState } from 'react';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { IconCamera, IconPhoto, IconRing, IIcon } from '@vega-ui/icons';

import { StoryBookExample } from '../../uiKit/components/StoryBookExample/StoryBookExample';

import { Tabs } from './Tabs';

declare type Item = {
  name?: string;
  icon?: IIcon;
};

const items = [
  {
    name: 'Первый',
    icon: IconPhoto,
  },
  {
    name: 'Очень длинный второй вариант',
    icon: IconRing,
  },
  {
    name: 'Третий вариант',
    icon: IconCamera,
  },
];

function Stories({ size, view, onlyIcon, withIcon }) {
  const [value, setValue] = useState<Item[] | null>([
    {
      name: 'Первый',
      icon: IconPhoto,
    },
  ]);

  return (
    <Tabs<Item>
      items={items}
      value={value}
      getItemKey={(item) => item.name}
      getItemLabel={(item) => item.name}
      getItemIcon={withIcon ? (item) => item.icon : null}
      onChange={({ value }) => setValue(value)}
      size={size}
      view={view}
      onlyIcon={onlyIcon}
    />
  );
}

const knobs = () ({
  size: select('size', ['s', 'm'], 'm'),
  view: select('view', ['bordered', 'clear'], 'bordered'),
  withIcon: boolean('withIcon', false),
  onlyIcon: boolean('onlyIcon', false),
});

// storiesOf('UI-KIT|/Tabs', module)
//   .addDecorator(withKnobs)
//   .addDecorator(
//     withDocs({
//       readme: {
//         content: require('./Tabs.md').default,
//       },
//     }),
//   )
//   .add('playground', () => <Stories {...knobs()} />);

storiesOf('UI-KIT|/Examples/Tabs', module)
  .add('_size', () => {
    type Item = string;
    const items: Item[] = ['один', 'два', 'три'];
    const [value, setValue] = useState<Item[]>(['три']);
    return (
      <>
        <Tabs<Item>
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemKey={(item) => item}
          getItemLabel={(item) => item}
          size="m"
        />
        <Tabs<Item>
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemKey={(item) => item}
          getItemLabel={(item) => item}
          size="s"
        />
      </>
    );
  })
  .add('_view', () => {
    type Item = string;
    const items = ['один', 'два', 'три'];
    const [value, setValue] = useState<Item[]>(['три']);
    return (
      <>
        <Tabs<Item>
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemKey={(item) => item}
          getItemLabel={(item) => item}
          view="bordered"
        />
        <Tabs<Item>
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemKey={(item) => item}
          getItemLabel={(item) => item}
          view="clear"
        />
      </>
    );
  })
  .add('_icon', () => {
    type Item = {
      name?: string;
      icon?: IIcon;
    };
    const items = [
      {
        name: 'Первый',
        icon: IconPhoto,
      },
      {
        name: 'Второй',
        icon: IconRing,
      },
      {
        name: 'Третий вариант',
        icon: IconCamera,
      },
    ];
    const [value, setValue] = useState<Item[]>([
      {
        name: 'Первый',
        icon: IconPhoto,
      },
    ]);
    return (
      <>
        <Tabs<Item>
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemKey={(item) => item.name}
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
        />
      </>
    );
  });
