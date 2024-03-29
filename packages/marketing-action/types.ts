import { EditorState } from 'draft-js';

export enum MarketingActionStatus {
  DRAFT = 'draft',
  RUNNING = 'active',
  SUSPEND = 'suspend',
  COMPLETE = 'expired',
}
export enum MarketingActionAlias {
  CART_LEFT_NOTIFICATION = 'cart_left_notification',
  AFTER_PURCHASE = 'after_purchase',
  CART_PAGE_FAQ = 'cart_page_faq',
  RECOMMEND_DIAGNOSTIC = 'recommend_diagnostic',
  HISTORY_PURCHASE = 'history_purchase_top',
  HISTORY_PURCHASE_CATEGORY = 'history_purchase_category',
  CONDITIONAL_FREE_SHIPPING = 'conditional_free_shipping',
}

export const MarketingActionAliasMap = {
  'cart-abandoned': MarketingActionAlias.CART_LEFT_NOTIFICATION,
  'step-delivery-after-purchase': MarketingActionAlias.AFTER_PURCHASE,
  'ranking-based-on-overal-purchase-history': MarketingActionAlias.HISTORY_PURCHASE,
  'ranking-by-category': MarketingActionAlias.HISTORY_PURCHASE_CATEGORY,
  'conditional-free-shipping': MarketingActionAlias.CONDITIONAL_FREE_SHIPPING,
  'recommendation-diagnosis-bot': MarketingActionAlias.RECOMMEND_DIAGNOSTIC,
  'cart-page-faq': MarketingActionAlias.CART_PAGE_FAQ,
};

export enum MarketingActionAliasKey {
  CART_LEFT_NOTIFICATION = 'cart-abandoned',
  AFTER_PURCHASE = 'step-delivery-after-purchase',
  CART_PAGE_FAQ = 'cart-page-faq',
  RECOMMEND_DIAGNOSTIC = 'recommendation-diagnosis-bot',
  HISTORY_PURCHASE = 'ranking-based-on-overal-purchase-history',
  HISTORY_PURCHASE_CATEGORY = 'ranking-by-category',
  CONDITIONAL_FREE_SHIPPING = 'conditional-free-shipping',
}
export enum TARGET {
  F0_MEMBER = 'f0_member',
  F0_OTHERS = 'f0_other',
  F1 = 'f1',
  F2 = 'f2',
  SEMI_LOYAL = 'next_loyal',
  LOYAL = 'loyal',
  F1_DORMANT = 'f1_sleep',
  LOYAL_DORMANT = 'loyal_sleep',
  OTHER_DORMANT = 'other_sleep',
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
  title_draft_raw: string | EditorState;

  content: string;
  content_draft_raw: string | EditorState;

  color: string;
};

export type LineMessage = {
  text_msg_display: boolean;
  text_msg_content: string;
  text_msg_content_draft_raw: string | EditorState;
  flex_msg_image_ratio: string;
  flex_msg_head: string;
  flex_msg_head_draft_raw: string | EditorState;
  push_msg_content: string;
  push_msg_content_draft_raw: string | EditorState;
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
  line_message: LineMessage;
  has_self_mail_content: boolean;
  content_verified: boolean;
};

export type Carousel = {
  title: string;
  content: string;
  content_draft_raw: string | EditorState;
  title_draft_raw: string | EditorState;
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
    step_messages?: StepMessage[];
    enable_line?: boolean;
    faq_source?: string;
    chat_visuals?: string[];
    chat_window_color?: string;
    display_settings_pc?: DisplaySettingsData;
    display_settings_mobile?: DisplaySettingsData;
    recommend_source?: string;
    template_selection?: string;
    free_shipping_amount?: number;
    report_period?: 'weekly' | 'monthly';
    carousel?: Carousel[];
    steps_confirmed_flag?: boolean[];
    target_url: string;
    is_open_new_tab: boolean;
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
  target_url: string;
  is_open_new_tab: boolean;
}
export interface TargetCustomersData {
  target_customers: TARGET[];
}

export type Content = {
  to: string;
  subject: string;
  body: string;
};

export type TestDelivery = {
  type: string;
  content: Content;
};
