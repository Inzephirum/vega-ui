import React from 'react';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Status } from '../../../../.storybook/with-metadata';

import { Avatar } from './Avatar';

const defaultKnobs = (): Record<string, string> => ({
  url: text('url', 'https://pbs.twimg.com/profile_images/896978374232600577/v2xEJoxM_400x400.jpg'),
  size: select('size', ['s', 'm'], 'm'),
  form: select('form', ['round', 'brick', 'default'], 'round'),
});

storiesOf('ui/Avatar', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'Maksim Kononov | CSSSR', status: Status.Approved } })
  .add('Avatar', () => <Avatar {...defaultKnobs()} />);
