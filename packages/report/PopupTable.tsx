import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Table } from '@/common/Table';
import { ClassName } from '@/common/types';
import { RowHeader } from './RowHeader';
import { MarketingActionAliasKey } from '@/marketing-action/types';

const data = [
  {
    id: '0',
    name: 'all',
    numberOfUUsDisplayed: '5,000',
    openUuRate: '200（4.0%）',
    cvUuRate: {
      intermediateCv: {
        rate: '12（0.2％）',
      },
      finalCv: {
        rate: '12（0.2％）',
        price: '256,000円',
      },
    },
  },
  {
    id: '1',
    name: '条件付き送料無料',
    alias: MarketingActionAliasKey.CONDITIONAL_FREE_SHIPPING,
    numberOfUUsDisplayed: '5,000',
    openUuRate: '200（4.0%）',
    cvUuRate: {
      intermediateCv: {
        rate: '12（0.2％）',
      },
      finalCv: {
        rate: '12（0.2％）',
        price: '256,000円',
      },
    },
  },
];

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const PopupTable = ({ className }: Props) => {
  const { t } = useTranslation('report');
  const {
    pathname,
    query: { organizationId, projectId, actionType },
  } = useRouter();
  const headers = [t('measure'), t('numberOfUUsDelivered'), t('clickedUuRate'), t('cvUuRate')];
  const baseUrl = `/organizations/${organizationId}/projects/${projectId}/reports/action-reports`;
  return (
    <Table className={className}>
      <Table.Head>
        <Table.Row className='rounded-tl-md rounded-tr-md'>
          {headers.map(title => (
            <Table.Header key={title} className='whitespace-pre text-center'>
              {title}
            </Table.Header>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell className='w-3/6'>
              <RowHeader
                title={t(item.name)}
                monthlyUrl={
                  item.alias
                    ? {
                        pathname: `${baseUrl}/${item.alias}/monthly`,
                        query: { targets: ['all'] },
                      }
                    : undefined
                }
              />
            </Table.Cell>
            <Table.Cell className='text-right w-1/6'>{item.numberOfUUsDisplayed}</Table.Cell>
            <Table.Cell className='text-right w-1/6'>{item.openUuRate}</Table.Cell>
            <Table.Cell className='w-1/6'>
              <div className='flex'>
                <div className='text-orange'>{t('intermediateCv') + t('colon')}</div>
                <div>{item.cvUuRate.intermediateCv.rate}</div>
              </div>
              <div className='flex mt-2'>
                <div className='text-primary'>{t('finalCv') + t('colon')}</div>
                <div>
                  <div>{item.cvUuRate.finalCv.rate}</div>
                  <div>{item.cvUuRate.finalCv.price}</div>
                </div>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
