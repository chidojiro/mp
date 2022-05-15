import { EditorState } from 'draft-js';

type ProjectSettings = {
  id: string;
  ec_site_protocol: string;
  ec_site_host: string;
  ec_site_image_path: string;
  const_r_rfm: number;
  const_f_loyal: number;
  const_m_loyal: number;
  cv_valid_hours: number;
  ocs_line_channel_id: string;
  ocs_mail_channel_id: string;
  brand_name: string;
  brand_logo: string;
  business_hours: string;
  contact_email: string;
  contact_phone: string;
  top_page_url: string;
  thanks_page_url: string;
  cart_page_url: string;
  product_detail_page_url: string;
  category_page_url: string;
  rank_name: string;
  product_name: string;
  product_price: string;
  product_detail: string;
  customer_name: string;
  twitter_id: string;
  facebook_id: string;
  instagram_id: string;
  line_id: string;
  email_footer: string;
  email_footer_draft_raw?: string | EditorState;
  email_signature: string;
  email_signature_draft_raw?: string | EditorState;
};

export type ProjectSettingData = Partial<ProjectSettings>;

export type ProjectData = {
  id?: string;
  name?: string;
  settings: ProjectSettingData;
};
