import { ConversionRate } from '@/types';

import { RestApi } from './base';

export const ConversionRateAPI = {
  list: async (): Promise<ConversionRate[] | []> => {
    const resp = await RestApi.get('conversion_rate');

    return resp.data.results;
  },
};
