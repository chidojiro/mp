import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { UrlObject } from 'url';

import { ChevronRightIcon } from '@heroicons/react/solid';

const LinkWithArrow = ({ title }: { title: string }) => {
  return (
    <span className='flex flex-row text-gray-600 font-medium group'>
      {title}
      <ChevronRightIcon width={20} className='group-hover:text-secondary' />
    </span>
  );
};
type RowHeaderProps = {
  title: string;
  monthlyUrl?: UrlObject | string;
  byLinkUrl?: UrlObject | string;
};
export const RowHeader = ({ title, monthlyUrl, byLinkUrl }: RowHeaderProps) => {
  const { t } = useTranslation('report');
  return (
    <div className='flex flex-col'>
      <div>
        <span className='font-bold'>{title}</span>
      </div>
      <div className='flex flex-row mt-2'>
        {!!monthlyUrl && (
          <Link passHref href={monthlyUrl}>
            <a className='mr-4 cursor-pointer'>
              <LinkWithArrow title={t('viewMonthlyReport')} />
            </a>
          </Link>
        )}
        {!!byLinkUrl && (
          <Link href={byLinkUrl}>
            <a className='mr-4 cursor-pointer'>
              <LinkWithArrow title={t('viewByUrlReport')} />
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};
