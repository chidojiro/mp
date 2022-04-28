import React from 'react';

import useSWR from 'swr';

import { Asset } from '@/types';
import { AssetAPI } from '@/apis/assets';

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
