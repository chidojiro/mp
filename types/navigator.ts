export interface Navigator {
  openDashboard: () => Promise<void>;
  getDashboardPage: () => string;
}
