import React from 'react';
import { Tabs as BaseTabs } from '@gpn-design/uikit/Tabs';
import { IconArrowLeft, IconArrowRight } from '@vega-ui/icons';
import { block } from 'bem-cn';

import './Tabs.css';

type BaseTabsComponent = typeof BaseTabs;

const cnTabs = block('VegaTabs');

export const Tabs: BaseTabsComponent = (props) => {
  const { size } = props;

  return (
    <div className={cnTabs({ size })}>
      <div className={cnTabs('ScrollLeft')}>
        <button type="button" className={cnTabs('ScrollButton')}>
          <IconArrowLeft />
        </button>
      </div>
      <div className={cnTabs('Inner')}>
        <div className={cnTabs('InnerContent')}>
          <BaseTabs {...props} />
        </div>
      </div>
      <div className={cnTabs('ScrollRight')}>
        <button type="button" className={cnTabs('ScrollButton')}>
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
};
