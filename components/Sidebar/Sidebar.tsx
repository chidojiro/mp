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
          path: `${projectPrefix}/policy-report/line-email`,
          label: t('policyReport'),
          matches: [
            '/organizations/[organizationId]/projects/[projectId]/policy-report/[slug]',
            '/organizations/[organizationId]/projects/[projectId]/policy-report/[slug]/[projectId]',
          ],
        },
        {
          path: `${projectPrefix}/f2-conversion-rate-trends`,
          label: t('f2ConversionRateTrends'),
          matches: ['/organizations/[organizationId]/projects/[projectId]/f2-conversion-rate-trends'],
        },
        {
          path: `${projectPrefix}/semi-royal-conversion-rate`,
          label: t('semiRoyalConversionRate'),
          matches: ['/organizations/[organizationId]/projects/[projectId]/semi-royal-conversion-rate'],
        },
        {
          path: `${projectPrefix}/loyal-conversion-rate`,
          label: t('loyalConversionRate'),
          matches: ['/organizations/[organizationId]/projects/[projectId]/loyal-conversion-rate'],
        },
        {
          path: `${projectPrefix}/loyal-customers`,
          label: t('numberOfLoyalCustomers'),
          matches: ['/organizations/[organizationId]/projects/[projectId]/loyal-customers'],
        },
        {
          path: `${projectPrefix}/dormant-customers-return`,
          label: t('returnOfDormantCustomers'),
          matches: ['/organizations/[organizationId]/projects/[projectId]/dormant-customers-return'],
        },
        {
          path: `${projectPrefix}/f1-dormant-customers-return`,
          label: t('returnOfF1DormantCustomers'),
          matches: ['/organizations/[organizationId]/projects/[projectId]/f1-dormant-customers-return'],
        },
      ],
    },
    {
      path: `${projectPrefix}/marketing-actions`,
      label: t('menuMyMarketingAction'),
      matches: [
        '/organizations/[organizationId]/projects/[projectId]/marketing-actions',
        '/organizations/[organizationId]/projects/[projectId]/marketing-actions/[marketing-action-name]',
      ],
    },
    {
      path: `${projectPrefix}/marketing-actions/new/report`,
      label: t('menuCreateMeasure'),
      matches: [
        '/organizations/[organizationId]/projects/[projectId]/marketing-actions/new',
        '/organizations/[organizationId]/projects/[projectId]/marketing-actions/new/[marketing-action-name]',
      ],
    },
    {
      path: `${projectPrefix}/settings`,
      label: t('menuSettings'),
      matches: ['/organizations/[organizationId]/projects/[projectId]/settings'],
    },
  ];
  return (
    <div className='flex flex-col border-r border-gray-300 bg-gray-light w-[200px]'>
      <div className='flex flex-col flex-grow'>
        {menu.map(menuItem => (
          <NavItem key={menuItem.label} data={menuItem} />
        ))}
      </div>
    </div>
  );
};
