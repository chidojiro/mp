import React from 'react';
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
