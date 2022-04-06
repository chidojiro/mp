import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { NavItem, NavItemData } from './NavItem';

export const Sidebar = () => {
  const { t } = useTranslation();

  const organizationPrefix = `/organizations/${1}`;
  const projectPrefix = `${organizationPrefix}/projects/${1}`;

  const menu: NavItemData[] = [
    {
      path: `${organizationPrefix}/dashboard`,
      label: t('menuDashboard'),
      matches: ['/organizations/[organizationId]/dashboard'],
    },
    {
      label: t('menuReport'),
      children: [
        {
          path: `${projectPrefix}/reports/action-reports/line-email?targets=all`,
          label: t('policyReport'),
          matches: [
            '/organizations/[organizationId]/projects/[projectId]/reports/action-reports/[actionType]',
            '/organizations/[organizationId]/projects/[projectId]/reports/action-reports/[actionType]/[projectId]',
          ],
        },
        {
          path: `${projectPrefix}/reports/f2-conversion-rate`,
          label: t('f2ConversionRateTrends'),
          matches: [
            '/organizations/[organizationId]/projects/[projectId]/reports/f2-conversion-rate',
          ],
        },
        {
          path: `${projectPrefix}/reports/semi-loyal-conversion-rate`,
          label: t('semiLoyalConversionRate'),
          matches: [
            '/organizations/[organizationId]/projects/[projectId]/reports/semi-loyal-conversion-rate',
          ],
        },
        {
          path: `${projectPrefix}/reports/loyal-conversion-rate`,
          label: t('loyalConversionRate'),
          matches: [
            '/organizations/[organizationId]/projects/[projectId]/reports/loyal-conversion-rate',
          ],
        },
        {
          path: `${projectPrefix}/reports/loyal-customers`,
          label: t('numberOfLoyalCustomers'),
          matches: ['/organizations/[organizationId]/projects/[projectId]/reports/loyal-customers'],
        },
        {
          path: `${projectPrefix}/reports/dormant-customers-return`,
          label: t('returnOfDormantCustomers'),
          matches: [
            '/organizations/[organizationId]/projects/[projectId]/reports/dormant-customers-return',
          ],
        },
        {
          path: `${projectPrefix}/reports/f1-dormant-customers-return`,
          label: t('returnOfF1DormantCustomers'),
          matches: [
            '/organizations/[organizationId]/projects/[projectId]/reports/f1-dormant-customers-return',
          ],
        },
        {
          path: `${projectPrefix}/reports/loyal-dormant-customers-return`,
          label: t('loyalDormantCustomersReturn'),
          matches: [
            '/organizations/[organizationId]/projects/[projectId]/reports/loyal-dormant-customers-return',
          ],
        },
      ],
    },
    {
      path: `${projectPrefix}/actions/running/1?targets=all`,
      label: t('menuMyMarketingAction'),
      matches: [
        '/organizations/[organizationId]/projects/[projectId]/actions',
        '/organizations/[organizationId]/projects/[projectId]/actions/[marketingActionStatus]/[marketingActionId]',
        '/organizations/[organizationId]/projects/[projectId]/actions/edit/[marketing_action_name]',
        '/organizations/[organizationId]/projects/[projectId]/actions/edit/[marketing_action_name]/',
      ],
    },
    {
      path: `${projectPrefix}/actions/new/cart-abandoned`,
      label: t('menuCreateMeasure'),
      matches: [
        '/organizations/[organizationId]/projects/[projectId]/actions/new',
        '/organizations/[organizationId]/projects/[projectId]/actions/new/[marketingActionName]',
      ],
    },
    {
      path: `${projectPrefix}/settings`,
      label: t('menuSettings'),
      matches: ['/organizations/[organizationId]/projects/[projectId]/settings'],
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
