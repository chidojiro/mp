import { ChevronRightIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const LinkWithArrow = ({ title }: { title: string }) => {
  return (
    <span className='flex flex-row text-gray-600 font-medium hover:text-secondary'>
      {title}
      <ChevronRightIcon width={20} />
    </span>
  );
};
type RowHeaderProps = {
  title: string;
  actionType: string;
  enableByUrlReport?: boolean;
};
export const RowHeader = ({ title, actionType, enableByUrlReport = false }: RowHeaderProps) => {
  const { t } = useTranslation('report');
  return (
    <div className='flex flex-col'>
      <div>
        <span className='font-bold'>{title}</span>
      </div>
      <div className='flex flex-row mt-2'>
        <Link
          passHref
          href={{
            pathname: `${actionType}/monthly`,
            query: { targets: ['all'] },
          }}
        >
          <a className='mr-4 cursor-pointer'>
            <LinkWithArrow title={t('viewMonthlyReport')} />
          </a>
        </Link>
        {enableByUrlReport && (
          <Link
            href={{
              pathname: `${actionType}/by-url`,
              query: { targets: ['all'] },
            }}
          >
            <a className='mr-4 cursor-pointer'>
              <LinkWithArrow title={t('viewByUrlReport')} />
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};
