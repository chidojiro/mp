import { useRouter } from 'next/router';

import { useIsoMorphicEffect } from '../useIsoMorphicEffect';

export const useScrollToTop = (deps: any[]) => {
  const { pathname } = useRouter();

  useIsoMorphicEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || [pathname]);
};
