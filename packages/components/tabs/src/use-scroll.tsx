import { useCallback, useEffect, useRef, useState } from 'react';

function useSwipeScroll({
  sliderRef,
  momentumVelocity = 0.9,
}: {
  sliderRef: React.RefObject<HTMLDivElement>;
  momentumVelocity?: number;
}): { hasSwiped: boolean; left: number } {
  const [hasSwiped, setHasSwiped] = useState(false);
  const left = useRef<number>(0);

  const init = useCallback((): number => {
    const slider = sliderRef.current;
    let isDown = false;
    let startX: number;
    let scrollLeft = left.current;

    // Momentum
    let velX = 0;
    let momentumID: number;

    function cancelMomentumTracking(): void {
      cancelAnimationFrame(momentumID);
    }

    function momentumLoop(): void {
      if (!slider) {
        return;
      }
      slider.scrollLeft += velX;
      velX *= momentumVelocity;
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
      }
    }

    function beginMomentumTracking(): void {
      cancelMomentumTracking();
      momentumID = requestAnimationFrame(momentumLoop);
    }

    if (!slider) {
      return 0;
    }

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      cancelMomentumTracking();
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
      beginMomentumTracking();
      setTimeout(() => setHasSwiped(false), 0);
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; // scroll-fast
      const prevScrollLeft = slider.scrollLeft;
      slider.scrollLeft = scrollLeft - walk;
      velX = slider.scrollLeft - prevScrollLeft;
      if (slider.scrollLeft - prevScrollLeft && !hasSwiped) {
        setHasSwiped(true);
      }
    });

    slider.addEventListener('wheel', () => {
      cancelMomentumTracking();
    });

    return scrollLeft;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    left.current = init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    hasSwiped,
    left: left.current ? left.current : 0,
  };
}

export default useSwipeScroll;
