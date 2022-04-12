import { RfmReportDataItem } from '@/types';

export type CustomerReportButtonProps = {
  /**
   * Primary button text
   */
  label?: string;
  /**
   * Subtext to be featured next to label text
   */
  subtext?: string;
  /**
   * Text to appear next to the click icon.
   */
  clickActionText?: string;
  /**
   * Main icon.
   */
  featuredIcon?: React.ReactNode;
};

export type RfmSegmentTableProps = {
  /**
     * Array of data for generating cards. Array format is: [{
      target: 'f0', 
      numOfCustomers: '', 
      members: '234', 
      other: '9,203', 
      average: '', 
      total: '', 
      f1Sleep: '', 
      loyalSleep: '',
    }]
    */
  data: RfmReportDataItem[];
  semiLoyalSubtext?: string;
  loyalSubtext?: string;
  sleepSubtext?: string;
};

export type SegmentBodyProps = {
  data: RfmReportDataItem;
};
