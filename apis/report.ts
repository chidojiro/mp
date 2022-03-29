import { RestApi, RestApiConfig } from './base';

export const mockData = [
  {
    target: 'f0',
    numOfCustomers: '',
    members: '6,102',
    other: '446,551',
    average: '',
    total: '',
    f1Sleep: '',
    loyalSleep: '',
    webUsers: '4,326',
    webPercentage: 70.9,
    lineUsers: '545',
    linePercentage: 8.9,
  },
  {
    target: 'f1',
    numOfCustomers: '9,408',
    members: '',
    other: '',
    average: '4,865',
    total: '64,920,118',
    f1Sleep: '',
    loyalSleep: '',
    webUsers: '8,321',
    webPercentage: 88.4,
    lineUsers: '3,758',
    linePercentage: 39.9,
  },
  {
    target: 'f2',
    numOfCustomers: '694',
    members: '',
    other: '',
    average: '5,605',
    total: '11,163,630',
    f1Sleep: '',
    lSleep: '',
    webUsers: '612',
    webPercentage: 88.2,
    lineUsers: '398',
    linePercentage: 57.3,
  },
  {
    target: 'semi-loyal',
    numOfCustomers: '124',
    members: '',
    other: '',
    average: '6,965',
    total: '4,288,674',
    f1Sleep: '',
    loyalSleep: '',
    webUsers: '115',
    webPercentage: 92.7,
    lineUsers: '95',
    linePercentage: 76.6,
  },
  {
    target: 'loyal',
    numOfCustomers: '44',
    members: '',
    other: '',
    average: '8,198',
    total: '1,861,964',
    f1Sleep: '',
    loyalSleep: '',
    webUsers: '44',
    webPercentage: 100.0,
    lineUsers: '38',
    linePercentage: 86.4,
  },
  {
    target: 'sleep',
    numOfCustomers: '2,437',
    members: '',
    other: '',
    average: '',
    total: '',
    f1Sleep: '2,432',
    loyalSleep: '5',
    webUsers: '1,963',
    webPercentage: 80.5,
    lineUsers: '1,287',
    linePercentage: 52.8,
  },
];

export const ReportApi = {
  rfm_report: async (config: RestApiConfig): Promise<any> => {
    return mockData;
    const result = await RestApi.get('/rfm_matrix_dashboard', config);

    const data = result.data;

    return [
      {
        target: 'f0',
        numOfCustomers: '',
        members: data.f0_member_uu ?? '',
        other: data.f0_other_uu ?? '',
        average: '',
        total: '',
        f1Sleep: '',
        loyalSleep: '',
        webUsers: data.f0_member_web_uu ?? '',
        webPercentage: data.f0_member_uu > 0 ? data.f0_member_web_uu / data.f0_member_uu : 0,
        lineUsers: data.f0_member_line_uu ?? '',
        linePercentage: data.f0_member_uu > 0 ? data.f0_member_line_uu / data.f0_member_uu : 0,
      },
      {
        target: 'f1',
        numOfCustomers: data.f1_uu ?? '',
        members: '',
        other: '',
        count: data.f1_purchase_count_recent_period ?? '',
        total: data.f1_sales_amount_recent_period ?? '',
        average:
          data.f1_purchase_count_recent_period > 0
            ? data.f1_sales_amount_recent_period / data.f1_purchase_count_recent_period
            : 0,
        f1Sleep: '',
        loyalSleep: '',
        webUsers: data.f1_web_uu ?? '',
        webPercentage: data.f1_uu > 0 ? data.f1_web_uu / data.f1_uu : 0,
        lineUsers: data.f1_line_uu ?? '',
        linePercentage: data.f1_uu > 0 ? data.f1_line_uu / data.f1_uu : 0,
      },
      {
        target: 'f2',
        numOfCustomers: data.f2_uu ?? '',
        members: '',
        other: '',
        count: data.f2_purchase_count_recent_period ?? '',
        total: data.f2_sales_amount_recent_period ?? '',
        average:
          data.f2_purchase_count_recent_period > 0
            ? data.f2_sales_amount_recent_period / data.f2_purchase_count_recent_period
            : 0,
        f1Sleep: '',
        loyalSleep: '',
        webUsers: data.f2_web_uu ?? '',
        webPercentage: data.f2_uu > 0 ? data.f2_web_uu / data.f2_uu : 0,
        lineUsers: data.f2_line_uu ?? '',
        linePercentage: data.f2_uu > 0 ? data.f2_line_uu / data.f2_uu : 0,
      },
      {
        target: 'semi-loyal',
        numOfCustomers: data.next_loyal_uu ?? '',
        members: '',
        other: '',
        count: data.next_loyal_purchase_count_recent_period ?? '',
        total: data.next_loyal_sales_amount_recent_period ?? '',
        average:
          data.next_loyal_purchase_count_recent_period > 0
            ? data.next_loyal_sales_amount_recent_period /
              data.next_loyal_purchase_count_recent_period
            : 0,
        f1Sleep: '',
        loyalSleep: '',
        webUsers: data.next_loyal_web_uu ?? '',
        webPercentage: data.next_loyal_uu > 0 ? data.next_loyal_web_uu / data.next_loyal_uu : 0,
        lineUsers: data.next_loyal_line_uu ?? '',
        linePercentage: data.next_loyal_uu > 0 ? data.next_loyal_line_uu / data.next_loyal_uu : 0,
      },
      {
        target: 'loyal',
        numOfCustomers: data.loyal_uu ?? '',
        members: '',
        other: '',
        data: data.loyal_purchase_count_recent_period ?? '',
        total: data.loyal_sales_amount_recent_period ?? '',
        average:
          data.loyal_purchase_count_recent_period > 0
            ? data.loyal_sales_amount_recent_period / data.loyal_purchase_count_recent_period
            : 0,
        f1Sleep: '',
        loyalSleep: '',
        webUsers: data.loyal_web_uu ?? '',
        webPercentage: data.loyal_uu > 0 ? data.loyal_web_uu / data.loyal_uu : 0,
        lineUsers: data.loyal_line_uu ?? '',
        linePercentage: data.loyal_uu > 0 ? data.loyal_line_uu / data.loyal_uu : 0,
      },
      {
        target: 'sleep',
        numOfCustomers: data.total_sleep_candidate_uu ?? '',
        members: '',
        other: '',
        average: '',
        total: '',
        f1Sleep: data.f1_sleep_candidate_uu ?? '',
        loyalSleep: data.loyal_sleep_candidate_uu ?? '',
        webUsers: data.total_sleep_candidate_web_uu ?? '',
        webPercentage:
          data.total_sleep_candidate_uu > 0
            ? data.total_sleep_candidate_web_uu / data.total_sleep_candidate_uu
            : 0,
        lineUsers: data.total_sleep_candidate_line_uu ?? '',
        linePercentage:
          data.total_sleep_candidate_uu > 0
            ? data.total_sleep_candidate_line_uu / data.total_sleep_candidate_uu
            : 0,
      },
    ];
  },
};
