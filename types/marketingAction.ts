export enum MarketingActionStatus {
  DRAFT = 'draft',
  RUNNING = 'running',
  SUSPEND = 'suspend',
  COMPLETE = 'complete',
}

export enum MarketingActionAlias {
  CART_LEFT_NOTIFICATION = 'CART_LEFT_NOTIFICATION',
  AFTER_PURCHASE = 'AFTER_PURCHASE',
  CART_PAGE_FAQ = 'CART_PAGE_FAQ',
  RECOMMEND_DIAGNOSTIC = 'RECOMMEND_DIAGNOSTIC',
  HISTORY_PURCHASE = 'HISTORY_PURCHASE',
  HISTORY_PURCHASE_CATEGORY = 'HISTORY_PURCHASE_CATEGORY',
  CONDITIONAL_FREE_SHIPPING = 'CONDITIONAL_FREE_SHIPPING',
}

export enum TARGET {
  F0_MEMBER = 'f0member',
  F0_OTHERS = 'f0others',
  F1 = 'F1',
  F2 = 'F2',
  SEMI_LOYAL = 'semiLoyal',
  LOYAL = 'loyal',
  F1_DORMANT = 'f1dormant',
  LOYAL_DORMANT = 'loyalDormant',
  OTHER_DORMANT = 'otherDormant',
}

export enum MarketingActionSegment {
  F0 = 'F0',
  F1 = 'F1',
  F2 = 'F2',
  SEMI_LOYAL = 'semi_loyal',
  LOYAL = 'loyal',
}

export enum MarketingActionTypeMessage {
  NOTIFICATION = 'notification',
  CHATBOT = 'chatbot',
  POPUP = 'popup',
}

export enum StepMessageTemplate {
  REVIEW = 'review',
  RANKING = 'ranking',
}

export enum StepMessageReportPeriod {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export type TargetSegment = {
  segment: MarketingActionSegment;
  is_member?: boolean;
  is_sleep?: boolean;
};

export type MarketingActionType = {
  id: number;
  name: string;
  alias: MarketingActionAlias;
  type: MarketingActionTypeMessage;
  cv_measure_start_event?: string;
  cv_measure_end_event?: string;
  created_at?: string;
  ended_at?: string;
};

export type MailContent = {
  title: string;
  content: string;
};

export type LineMessages = {
  text_msg_display: boolean;
  text_msg_content: string;
  flex_msg_image_ratio: '16:9';
  flex_msg_head: string;
  notify_msg_token_list?: string;
};

export type StepMessage = {
  send_flag: boolean;
  send_order: number;
  time_condition: string;
  send_after_days: number;
  send_at: string;
  report_period: StepMessageReportPeriod;
  template?: StepMessageTemplate;
  mail_content: MailContent;
  line_messages: LineMessages;
  color: string;
  has_self_mail_content: boolean;
  content_verified: boolean;
};

export type MarketingActionRes = {
  id: string;
  organization_id?: string;
  project_id: string;
  description?: string;
  marketing_action_type_id?: number;
  marketing_action_type?: MarketingActionType;
  start_at: string;
  end_at?: string;
  settings: {
    step_messages: StepMessage[];
    enable_line: boolean;
  };
  status: MarketingActionStatus;
  target_segments?: TargetSegment[];
  created_at?: string;
  ended_at?: string;
};

export const OPTIONS = {
  YES: 'true',
  NO: 'false',
};

export type Period = 'weekly' | 'monthly';

export interface BaseSetting {
  enable_line: boolean;
}
export interface StepDeliverySetting extends BaseSetting {
  step_messages: StepMessage[];
}

export interface DisplaySettingsData {
  appear_time: number;
  position: 'left' | 'right';
  position_close_box: number;
  position_close_box_unit: 'px' | '%' | 'vh';
}
export interface PopupSettingsData {
  template_selection: string;
  free_shipping_amount: number;
  display_settings_pc: DisplaySettingsData;
  display_settings_mobile: DisplaySettingsData;
}
export interface TargetCustomersData {
  target_customers: TARGET[];
}
