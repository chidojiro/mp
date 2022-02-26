import { RestApi } from './base';

export const ReportApi = {
  rfm_report: async (): Promise<any> => {
    const result = await RestApi.get('rfm_matrix_dashboard/');
    if(result.status === 200) {
      // convert data
      const data = result.data.result
      const segments = [
        "f0",
        "f1",
        'f2',
        'semi-loyal',
        // TODO: Need change to loyal
        'royal',
        'sleep'
      ]
      return [
        {
          target: 'f0',
          numOfCustomers: '',
          members: data.f0_member_uu,
          other: data.f0_other_uu,
          average: '',
          total: '',
          f1Sleep: '',
          royalSleep: '',
        },
        {
          target: 'f1',
          numOfCustomers: data.f1_uu,
          members: '',
          other: '',
          count: data.f1_purchase_count_recent_period,
          total: data.f1_sales_amount_recent_period,
          average: data.f1_purchase_count_recent_period > 0 ? data.f1_sales_amount_recent_period / data.f1_purchase_count_recent_period : 0, 
          f1Sleep: '',
          royalSleep: '',
        },
        {
          target: 'f2',
          numOfCustomers: data.f2_uu,
          members: '',
          other: '',
          count: data.f2_purchase_count_recent_period,
          total: data.f2_sales_amount_recent_period,
          average: data.f2_purchase_count_recent_period > 0 ? data.f2_sales_amount_recent_period / data.f2_purchase_count_recent_period : 0, 
          f1Sleep: '',
          royalSleep: '',
        },
        {
          target: 'semi-royal',
          numOfCustomers: data.next_loyal_uu,
          members: '',
          other: '',
          count: data.next_loyal_purchase_count_recent_period,
          total: data.next_loyal_sales_amount_recent_period,
          average: data.next_loyal_purchase_count_recent_period > 0 ? data.next_loyal_sales_amount_recent_period / data.next_loyal_purchase_count_recent_period : 0,
          f1Sleep: '',
          royalSleep: '',
        },
        {
          target: 'royal',
          numOfCustomers: data.loyal_uu,
          members: '',
          other: '',
          data: data.loyal_purchase_count_recent_period,
          total: data.loyal_sales_amount_recent_period,
          average: data.loyal_purchase_count_recent_period > 0 ? data.loyal_sales_amount_recent_period / data.loyal_purchase_count_recent_period : 0,
          f1Sleep: '',
          royalSleep: '',
        },
        {
          target: 'sleep',
          numOfCustomers: data.total_sleep_candidate_uu,
          members: '',
          other: '',
          average: '',
          total: '',
          f1Sleep: data.f1_sleep_candidate_uu,
          royalSleep: data.loyal_sleep_candidate_uu,
        },
      ]
    }
    return []
  },
};
