import { RfmReportDataItem } from '@/types';

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
