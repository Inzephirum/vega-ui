import React from 'react';
import { cn } from '@gpn-design/uikit/__internal__/src/utils/bem';
import { Tabs as BaseTabs } from '@gpn-design/uikit/Tabs';
import { IconArrowLeft, IconArrowRight } from '@vega-ui/icons';

import './styles.css';

type TabsProps = React.ComponentProps<typeof BaseTabs>;

const cnTabs = cn('VegaTabs');

export const Tabs: React.FC<TabsProps> = (props) => {
  return (
    <div className={cnTabs()}>
      <button type="button" className={cnTabs('ScrollLeft')}>
        <IconArrowLeft />
      </button>
      <div className={cnTabs('Inner')}>
        <div className={cnTabs('InnerContent')}>
          <BaseTabs {...props} />
        </div>
      </div>
      <button type="button" className={cnTabs('ScrollRight')}>
        <IconArrowRight />
      </button>
    </div>
  );
};
