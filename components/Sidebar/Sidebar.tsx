import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import { useProfile } from '@/hooks/api/useProfile';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import { NavItem } from './NavItem';
import { NavItemData } from './NavItem.types';

export const Sidebar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const profile = useProfile();
  const organizationPrefix = `/organizations/${profile.data?.organization_id}`;
  const projectPrefix = `${organizationPrefix}/projects/${profile.data?.project_id}`;

  const organizationMatchPrefix = '/organizations/[organizationId]';
  const projectMatchPrefix = `${organizationPrefix}/projects/[projectId]`;

  const menu: NavItemData[] = [
    {
      path: `${organizationPrefix}/dashboard`,
      label: t('menuDashboard'),
      matches: [`${organizationMatchPrefix}/dashboard`],
      icon: 'dashboard',
    },
    {
      label: t('menuReport'),
      icon: 'group',
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
      path: `${projectPrefix}/actions/running/?targets=all`,
      label: t('menuMyMarketingAction'),
      icon: 'emoji',
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
      icon: 'action',
      matches: [
        `${projectMatchPrefix}/actions/new`,
        `${projectMatchPrefix}/actions/new/[marketingActionName]`,
      ],
    },
    // {
    //   label: t('customSegments'),
    //   icon: 'custom-segment',
    //   children: [
    //     {
    //       label: t('segmentList'),
    //       path: `${projectPrefix}/custom-segments/segment-list`,
    //       matches: [`${projectMatchPrefix}/custom-segments/segment-list`],
    //     },
    //     {
    //       label: t('messageList'),
    //       path: `${projectPrefix}/custom-segments/message-list`,
    //       matches: [`${projectMatchPrefix}/custom-segments/message-list`],
    //     },
    //     {
    //       label: t('messageReport'),
    //       path: `${projectPrefix}/custom-segments/message-report`,
    //       matches: [`${projectMatchPrefix}/custom-segments/message-report`],
    //     },
    //   ],
    // },
    {
      path: `${projectPrefix}/settings`,
      label: t('menuSettings'),
      matches: [`${projectMatchPrefix}/settings`],
      icon: 'settings',
    },
  ];
  const toggleSideBar = () => {
    setOpen(!open);
  };
  return (
    <div
      className={classNames(
        'flex-1 flex flex-col border-r border-input bg-gray-A100',
        'h-full left-0',
        open && 'w-[200px]',
        !open && 'w-[45px]'
      )}
    >
      <div className='flex flex-col flex-grow select-none'>
        {menu.map(menuItem => (
          <NavItem showLabel={open} key={menuItem.label} data={menuItem} />
        ))}
      </div>
      <div
        className={classNames({
          'flex-shrink-0 flex border-t-2 sticky bottom-0': true,
          'px-3': open,
          'px-auto': !open,
        })}
      >
        <span className='flex ml-auto' onClick={toggleSideBar}>
          {open && <ChevronLeftIcon width={38} fill='#BFBFBF' />}
          {!open && <ChevronRightIcon width={38} fill='#BFBFBF' />}
        </span>
      </div>
    </div>
  );
};
