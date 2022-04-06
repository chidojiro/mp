export type CustomerSegmentTableProps = {
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
  data: any[];
  semiLoyalSubtext?: string;
  loyalSubtext?: string;
  sleepSubtext?: string;
  onClick: (value: any) => void;
};
