import { MarketingActionType } from '@/marketing-action/types';
import { LabelListProps } from 'recharts';

export type ReportNames = 'rfmReport';

export type RfmReportDataItem = {
  target: 'f0' | 'f1' | 'f2' | 'semi-loyal' | 'loyal' | 'sleep';
  numOfCustomers?: number;
  members?: number;
  other?: number;
  count?: number;
  average?: number;
  total?: number;
  f1Sleep?: number;
  loyalSleep?: number;
  webUsers: number;
  webPercentage: number;
  lineUsers: number;
  linePercentage: number;
};

export interface RfmReportItemResponse {
  organization_id: string;
  project_id: string;
  f0_member_uu: number;
  f0_other_uu: number;
  f1_uu: number;
  f1_purchase_count_recent_period: number;
  f1_sales_amount_recent_period: number;
  f2_uu: number;
  f2_purchase_count_recent_period: number;
  f2_sales_amount_recent_period: number;
  next_loyal_uu: number;
  next_loyal_purchase_count_recent_period: number;
  next_loyal_sales_amount_recent_period: number;
  loyal_uu: number;
  loyal_purchase_count_recent_period: number;
  loyal_sales_amount_recent_period: number;
  total_sleep_candidate_uu: number;
  f1_sleep_candidate_uu: number;
  loyal_sleep_candidate_uu: number;
  f0_member_web_uu: number;
  f0_member_line_uu: number;
  f1_web_uu: number;
  f1_line_uu: number;
  f2_web_uu: number;
  f2_line_uu: number;
  next_loyal_web_uu: number;
  next_loyal_line_uu: number;
  total_sleep_candidate_web_uu: number;
  total_sleep_candidate_line_uu: number;
  f1_sleep_candidate_web_uu: number;
  f1_sleep_candidate_line_uu: number;
  loyal_sleep_candidate_web_uu: number;
  loyal_sleep_candidate_line_uu: number;
  loyal_web_uu: number;
  loyal_line_uu: number;
  id: string;
  created_at: string;
  updated_at: string;
}

export type ConversionRate = {
  id: string;
  f0_member_uu: number;
  f1_uu: number;
  f2_uu: number;
  next_loyal_uu: number;
  loyal_uu: number;
  f2_conversion_rate: number;
  next_loyal_conversion_rate: number;
  loyal_conversion_rate: number;
  month: number;
  year: number;
  created_at?: Date;
  updated_at?: Date;
  organization_id: string;
  project_id: string;
};

export type BaseChartInfo = {
  dataKey: string;
  title?: string;
  color: string;
  legendIcon?: React.ReactNode;
  width?: number;
  labelProps?: Omit<LabelListProps<any>, 'dataKey'>;
};

export type BarChartInfo = Omit<BaseChartInfo, 'dataKey'> & {
  type: 'BAR';
  stackedBars?: Omit<BaseChartInfo, 'width'>[];
  color?: string;
  dataKey?: string;
  stackId?: string;
};

export type LineChartInfo = BaseChartInfo & {
  type: 'LINE';
  axis?: 'left' | 'right';
  unit?: string;
};

export type ChartInfo = BarChartInfo | LineChartInfo;

export type DeliveryType = 'bot' | 'notification' | 'popup';

export type MarketingActionReport = {
  notification_type?: 'line' | 'mail';
  target_segment: string;
  cv_type: 'custom' | 'final';
  aggregation_start: string;
  aggregation_end: string;
  delivery_uu: number;
  open_uu: number;
  use_uu?: number;
  click_uu?: number;
  display_uu?: number;
  cv_uu: number;
  cv_amount: number;
  id: string;
  project_id: string;
  organization_id: string;
  marketing_action_id: string;
  marketing_action: {
    marketing_action_type: MarketingActionType;
  };
  created_at: Date;
  updated_at: Date;
};

export type MarketingActionMonthlyReport = {
  project_id: string;
  organization_id: string;
  alias: string;
  aggregated_month: string;
  cv_uu: number;
  cv_amount: number;
  notification_type: 'line' | 'mail';
  delivery_uu: number;
  click_uu: number;
  open_uu: number;
};
