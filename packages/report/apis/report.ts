import { RestApiConfig, RestApis } from '@/rest/apis';
import { DeliveryType, RfmReportItemResponse } from '../types';
import { RfmReportDataItem } from '../types';
import qs from 'qs';

const getActionMonthly = (alias: string, target_segment?: string[]) => {
  return RestApis.get(`/reports/actions/${alias}/monthly`, {
    params: { target_segment },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
};

const getActions = (delivery_type: DeliveryType, target_segment?: string[]) => {
  return RestApis.get('/reports/actions', {
    params: { delivery_type, target_segment },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
};

const getF2ConversionRate = () => {
  return RestApis.get('/reports/f2-conversion-rate');
};

const getLoyalConversionRate = () => {
  return RestApis.get('/reports/loyal-conversion-rate');
};

const getNextLoyalConversionRate = () => {
  return RestApis.get('/reports/next-loyal-conversion-rate');
};

const getTotalSleepRecovery = () => {
  return RestApis.get('/reports/actions/total-sleep-recovery');
};

const getLoyalSleepRecovery = () => {
  return RestApis.get('/reports/actions/loyal-sleep-recovery');
};

export const ReportApis = {
  getActionMonthly,
  getActions,
  getTotalSleepRecovery,
  getLoyalSleepRecovery,
  getF2ConversionRate,
  getLoyalConversionRate,
  getNextLoyalConversionRate,
  rfm_report: async (config: RestApiConfig): Promise<RfmReportDataItem[]> => {
    const data = await RestApis.get<RfmReportItemResponse>('/reports/rfm', config);

    return [
      {
        target: 'f0',
        members: data.f0_member_uu,
        other: data.f0_other_uu,
        webUsers: data.f0_member_web_uu,
        webPercentage: data.f0_member_uu > 0 ? data.f0_member_web_uu / data.f0_member_uu : 0,
        lineUsers: data.f0_member_line_uu,
        linePercentage: data.f0_member_uu > 0 ? data.f0_member_line_uu / data.f0_member_uu : 0,
      },
      {
        target: 'f1',
        numOfCustomers: data.f1_uu,
        count: data.f1_purchase_count_recent_period,
        total: data.f1_sales_amount_recent_period,
        average:
          data.f1_purchase_count_recent_period > 0
            ? data.f1_sales_amount_recent_period / data.f1_purchase_count_recent_period
            : 0,
        webUsers: data.f1_web_uu,
        webPercentage: data.f1_uu > 0 ? data.f1_web_uu / data.f1_uu : 0,
        lineUsers: data.f1_line_uu,
        linePercentage: data.f1_uu > 0 ? data.f1_line_uu / data.f1_uu : 0,
      },
      {
        target: 'f2',
        numOfCustomers: data.f2_uu,
        count: data.f2_purchase_count_recent_period,
        total: data.f2_sales_amount_recent_period,
        average:
          data.f2_purchase_count_recent_period > 0
            ? data.f2_sales_amount_recent_period / data.f2_purchase_count_recent_period
            : 0,
        webUsers: data.f2_web_uu,
        webPercentage: data.f2_uu > 0 ? data.f2_web_uu / data.f2_uu : 0,
        lineUsers: data.f2_line_uu,
        linePercentage: data.f2_uu > 0 ? data.f2_line_uu / data.f2_uu : 0,
      },
      {
        target: 'semi-loyal',
        numOfCustomers: data.next_loyal_uu,
        count: data.next_loyal_purchase_count_recent_period,
        total: data.next_loyal_sales_amount_recent_period,
        average:
          data.next_loyal_purchase_count_recent_period > 0
            ? data.next_loyal_sales_amount_recent_period /
              data.next_loyal_purchase_count_recent_period
            : 0,
        webUsers: data.next_loyal_web_uu,
        webPercentage: data.next_loyal_uu > 0 ? data.next_loyal_web_uu / data.next_loyal_uu : 0,
        lineUsers: data.next_loyal_line_uu,
        linePercentage: data.next_loyal_uu > 0 ? data.next_loyal_line_uu / data.next_loyal_uu : 0,
      },
      {
        target: 'loyal',
        numOfCustomers: data.loyal_uu,
        count: data.loyal_purchase_count_recent_period,
        total: data.loyal_sales_amount_recent_period,
        average:
          data.loyal_purchase_count_recent_period > 0
            ? data.loyal_sales_amount_recent_period / data.loyal_purchase_count_recent_period
            : 0,
        webUsers: data.loyal_web_uu,
        webPercentage: data.loyal_uu > 0 ? data.loyal_web_uu / data.loyal_uu : 0,
        lineUsers: data.loyal_line_uu,
        linePercentage: data.loyal_uu > 0 ? data.loyal_line_uu / data.loyal_uu : 0,
      },
      {
        target: 'sleep',
        numOfCustomers: data.total_sleep_candidate_uu,
        f1Sleep: data.f1_sleep_candidate_uu,
        loyalSleep: data.loyal_sleep_candidate_uu,
        webUsers: data.total_sleep_candidate_web_uu,
        webPercentage:
          data.total_sleep_candidate_uu > 0
            ? data.total_sleep_candidate_web_uu / data.total_sleep_candidate_uu
            : 0,
        lineUsers: data.total_sleep_candidate_line_uu,
        linePercentage:
          data.total_sleep_candidate_uu > 0
            ? data.total_sleep_candidate_line_uu / data.total_sleep_candidate_uu
            : 0,
      },
    ];
  },
};
