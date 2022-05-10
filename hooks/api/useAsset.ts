import React from 'react';
import useSWR from 'swr';

import { AssetAPI } from '@/apis/assets';
import { Asset } from '@/types';

export function useAsset(sourceId: string, fallbackData?: Asset) {
  const swrReturn = useSWR<Asset>(
    sourceId ? `/assets/${sourceId}` : null,
    () => AssetAPI.get(sourceId),
    {
      fallbackData: fallbackData,
    }
  );

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data! }), [swrReturn]);
}
