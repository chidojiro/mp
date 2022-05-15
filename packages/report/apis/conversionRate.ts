import { RestApis } from '@/rest/apis';
import { ConversionRate } from '../types';

export const ConversionRateAPI = {
  list: async (): Promise<ConversionRate[] | []> => {
    const resp = await RestApis.get('conversion_rate');

    return resp.data.results;
  },
};
