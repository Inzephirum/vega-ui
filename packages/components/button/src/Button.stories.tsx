import React from 'react';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Status } from '../../../../.storybook/with-metadata';

import { Button } from './Button';

storiesOf('ui/Button', module)
  .addParameters({ metadata: { author: 'Maksim Kononov | CSSSR', status: Status.Draft } })
  .add('interactive', () => {
    const label = text('label', 'Дефолтный текст');
    return <Button size="m" view="primary" label={label} />;
  });
