import { useEffect, useRef } from 'react';

import { create } from '@amcharts/amcharts4/core';
import { Sprite } from '@amcharts/amcharts4/core';

export const useAmcharts = <T extends Sprite>(
  classType: { new (): T },
  configure: (chart: T) => void
) => {
  const amchartsElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!amchartsElRef.current) {
      return;
    }
    const chart = create(amchartsElRef.current, classType);
    configure(chart);
    return () => chart.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amchartsElRef.current]);

  return { amchartsElRef };
};
