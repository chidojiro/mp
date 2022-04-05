export enum MAStatus {
  DRAFT = 'draft',
  RUNNING = 'running',
  SUSPEND = 'suspend',
  COMPLETE = 'complete',
}

export enum MAAlias {
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
}

export enum MASegment {
  F0 = 'F0',
  F1 = 'F1',
  F2 = 'F2',
  SEMI_LOYAL = 'semi_loyal',
  LOYAL = 'loyal',
}

export enum TYPE {
  NOTIFICATION = 'notification',
  CHATBOT = 'chatbot',
  POPUP = 'popup',
}

export type TargetSegment = {
  segment: MASegment;
  is_member?: boolean;
  is_sleep?: boolean;
};

export type MarketingActionType = {
  id: number;
  name: string;
  type: TYPE;
  cv_measure_start_event?: string;
  cv_measure_end_event?: string;
  created_at: string;
  ended_at: string;
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
  settings?: string;
  status: MAStatus;
  target_segments?: TargetSegment[];
  created_at?: string;
  ended_at?: string;
};
