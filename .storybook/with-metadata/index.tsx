import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { block } from 'bem-cn';

import './styles.css';

const cnMetadata = block('Metadata');

export enum Status {
  Draft = 'Draft',
  Approved = 'Approved',
  Deprecated = 'Deprecated',
}

type Parameters = {
  status?: Status;
  author?: string;
  description?: string;
};

const placeholder = 'Не указан';

export const withMetadata = makeDecorator({
  name: 'withMetadata',
  parameterName: 'metadata',
  wrapper: (getStory, context, { parameters = {} }) => {
    const { status = placeholder, author = placeholder, description } = parameters as Parameters;

    const statusSuccess = status === Status.Approved;
    const statusWarning = status === Status.Deprecated;
    const statusAlert = status === placeholder;
    const authorAlert = author === placeholder;

    return (
      <>
        <div className={cnMetadata('panel')}>
          <span className={cnMetadata('status')}>
            <span className={cnMetadata('title')}>Статус:</span>
            <span
              className={cnMetadata('value', {
                success: statusSuccess,
                warning: statusWarning,
                alert: statusAlert,
              })}
            >
              {status}
            </span>
          </span>
          <span className={cnMetadata('author')}>
            <span className={cnMetadata('title')}>Автор:</span>
            <span className={cnMetadata('value', { alert: authorAlert })}>{author}</span>
          </span>
          {description && <span className={cnMetadata('description')}>{description}</span>}
        </div>
        <div className={cnMetadata('wrapper')}>{getStory(context)}</div>
      </>
    );
  },
});
