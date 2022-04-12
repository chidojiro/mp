import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { useAuth } from '@/hooks/useAuth';

import { NavItem } from './NavItem';
import { NavItemData } from './NavItem.types';

export const Sidebar = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  const organizationPrefix = `/organizations/${auth.organizationId}`;
  const projectPrefix = `${organizationPrefix}/projects/${auth.projectId}`;

  const organizationMatchPrefix = '/organizations/[organizationId]';
  const projectMatchPrefix = `${organizationPrefix}/projects/[projectId]`;

  const menu: NavItemData[] = [
    {
      path: `${organizationPrefix}/dashboard`,
      label: t('menuDashboard'),
      matches: [`${organizationMatchPrefix}/dashboard`],
    },
    {
      label: t('menuReport'),
      children: [
        {
          path: `${projectPrefix}/reports/action-reports/line-email?targets=all`,
          label: t('policyReport'),
          matches: [
            `${projectMatchPrefix}/reports/action-reports/[actionType]`,
            `${projectMatchPrefix}/reports/action-reports/[actionType]/[projectId]`,
          ],
        },
        {
          path: `${projectPrefix}/reports/f2-conversion-rate`,
          label: t('f2ConversionRateTrends'),
          matches: [`${projectMatchPrefix}/reports/f2-conversion-rate`],
        },
        {
          path: `${projectPrefix}/reports/semi-loyal-conversion-rate`,
          label: t('semiLoyalConversionRate'),
          matches: [`${projectMatchPrefix}/reports/semi-loyal-conversion-rate`],
        },
        {
          path: `${projectPrefix}/reports/loyal-conversion-rate`,
          label: t('loyalConversionRate'),
          matches: [`${projectMatchPrefix}/reports/loyal-conversion-rate`],
        },
        {
          path: `${projectPrefix}/reports/loyal-customers`,
          label: t('numberOfLoyalCustomers'),
          matches: [`${projectMatchPrefix}/reports/loyal-customers`],
        },
        {
          path: `${projectPrefix}/reports/dormant-customers-return`,
          label: t('returnOfDormantCustomers'),
          matches: [`${projectMatchPrefix}/reports/dormant-customers-return`],
        },
        {
          path: `${projectPrefix}/reports/f1-dormant-customers-return`,
          label: t('returnOfF1DormantCustomers'),
          matches: [`${projectMatchPrefix}/reports/f1-dormant-customers-return`],
        },
        {
          path: `${projectPrefix}/reports/loyal-dormant-customers-return`,
          label: t('loyalDormantCustomersReturn'),
          matches: [`${projectMatchPrefix}/reports/loyal-dormant-customers-return`],
        },
      ],
    },
    {
      path: `${projectPrefix}/actions/running/1?targets=all`,
      label: t('menuMyMarketingAction'),
      matches: [
        `${projectMatchPrefix}/actions`,
        `${projectMatchPrefix}/actions/[marketingActionStatus]/[marketingActionId]`,
        `${projectMatchPrefix}/actions/edit/[marketing_action_name]`,
        `${projectMatchPrefix}/actions/edit/[marketing_action_name]/`,
      ],
    },
    {
      path: `${projectPrefix}/actions/new/cart-abandoned`,
      label: t('menuCreateMeasure'),
      matches: [
        `${projectMatchPrefix}/actions/new`,
        `${projectMatchPrefix}/actions/new/[marketingActionName]`,
      ],
    },
    {
      label: t('カスタムセグメント'),
      children: [
        {
          label: t('segmentList'),
          path: `${projectPrefix}/custom-segments/segment-list`,
          matches: [`${projectMatchPrefix}/custom-segments/segment-list`],
        },
        {
          label: t('messageList'),
          path: `${projectPrefix}/custom-segments/message-list`,
          matches: [`${projectMatchPrefix}/custom-segments/message-list`],
        },
        {
          label: t('messageReport'),
          path: `${projectPrefix}/custom-segments/message-report`,
          matches: [`${projectMatchPrefix}/custom-segments/message-report`],
        },
      ],
    },
    {
      path: `${projectPrefix}/settings`,
      label: t('menuSettings'),
      matches: [`${projectMatchPrefix}/settings`],
    },
  ];
  return (
    <div
      className={classNames(
        'flex flex-col border-r border-input bg-gray-light w-[200px]',
        'fixed top-12 left-0'
      )}
      style={{ height: 'calc(100vh - 48px)' }}
    >
      <div className='flex flex-col flex-grow'>
        {menu.map(menuItem => (
          <NavItem key={menuItem.label} data={menuItem} />
        ))}
      </div>
    </div>
  );
};
