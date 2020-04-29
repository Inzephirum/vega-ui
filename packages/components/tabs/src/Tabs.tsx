import React from 'react';
import { cn as block } from '@gpn-design/uikit/__internal__/src/utils/bem';
import { Tabs as BaseTabs } from '@gpn-design/uikit/Tabs';
import { Badge } from '@vega-ui/badge';
import { IconArrowLeft, IconArrowRight } from '@vega-ui/icons';

// import { block } from 'bem-cn';
import './Tabs.css';

type BaseTabsComponent = typeof BaseTabs;

const cnTabs = block('VegaTabs');

export const Tabs: BaseTabsComponent = (props) => {
  const { size } = props;

  return (
    <div className={cnTabs({ size })}>
      <Badge className={cnTabs('Button', { mixed: true })} label="Кнопка" />
      <div className={cnTabs('ScrollLeft')}>
        <button type="button" className={cnTabs('ScrollButton')}>
          <IconArrowLeft />
        </button>
      </div>
      <div className={cnTabs('Inner')}>
        <div className={cnTabs('InnerContent')}>
          <BaseTabs {...props} className={cnTabs('Native', { align: 'center' })} />
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
