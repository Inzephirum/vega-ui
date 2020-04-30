import React, { useEffect, useRef, useState } from 'react';
import { Tabs as BaseTabs } from '@gpn-design/uikit/Tabs';
import { IconArrowLeft, IconArrowRight } from '@vega-ui/icons';
import { block } from 'bem-cn';

import useSwipeScroll from './use-scroll';

import './Tabs.css';

type BaseTabsComponent = typeof BaseTabs;

const cnTabs = block('VegaTabs');

export const Tabs: BaseTabsComponent = (props) => {
  const { size } = props;
  const [state, setState] = useState({
    isHiddenLeftButton: true,
    isHiddenRightButton: false,
  });
  const scroller = useRef<HTMLDivElement | null>(null);

  const scroll = useSwipeScroll({
    sliderRef: scroller,
  });

  useEffect(() => {
    const sc = scroller.current;

    if (!sc) {
      return;
    }

    if (sc.scrollLeft > 0) {
      console.log('df');
      setState({ ...state, isHiddenLeftButton: false });
    }
  }, [scroll.left, scroll.hasSwiped, state]);

  const handleScrollLeft = (): void => {
    const sc = scroller.current;

    if (!sc || sc.scrollLeft === 0) {
      return;
    }

    sc.scrollLeft -= 50;
  };

  const handleScrollRight = (): void => {
    const sc = scroller.current;
    if (!sc) {
      return;
    }

    sc.scrollLeft += 50;
  };

  return (
    <div className={cnTabs({ size })}>
      {!state.isHiddenLeftButton && (
        <div className={cnTabs('ScrollLeft')}>
          <button type="button" className={cnTabs('ScrollButton')} onClick={handleScrollLeft}>
            <IconArrowLeft />
          </button>
        </div>
      )}
      <div className={cnTabs('Inner')}>
        <div className={cnTabs('InnerContent')} ref={scroller}>
          <BaseTabs {...props} className={cnTabs('Native', { align: 'center' })} />
        </div>
      </div>
      {!state.isHiddenRightButton && (
        <div className={cnTabs('ScrollRight')}>
          <button type="button" className={cnTabs('ScrollButton')} onClick={handleScrollRight}>
            <IconArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};
