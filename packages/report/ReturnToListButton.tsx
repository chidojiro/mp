import { useProfile } from '@/auth/useProfile';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { to: string };

// eslint-disable-next-line no-empty-pattern
export const ReturnToListButton = ({ to }: Props) => {
  const { data: profile } = useProfile();
  const { t } = useTranslation('report');

  return (
    <div className='mt-auto text-gray-600'>
      <Link
        passHref
        href={`/organizations/${profile?.organization_id}/projects/${profile?.project_id}/reports/action-reports/${to}?targets=all`}
      >
        <a className='flex justify-end mt-5 group'>
          <div className='flex items-center transform translate-x-2'>
            {t('returnToList')}
            <ChevronRightIcon
              scale={12}
              className='text-gray-600 group-hover:text-secondary'
              width={28}
              height={28}
              aria-hidden='true'
            />
          </div>
        </a>
      </Link>
    </div>
  );
};
