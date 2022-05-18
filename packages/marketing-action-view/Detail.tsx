import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { addDays } from 'date-fns';

import { DatePicker } from '@/common/DatePicker';
import { SideMenu, SideMenuGroupItem, SideMenuItem } from '@/common/SideMenu';
import { LanguageUtils } from '@/common/utils';
import { TargetFilter } from '@/marketing-action/TargetFilter';
import { MarketingActionTypeMessage as TYPE } from '@/marketing-action/types';

import { MarketingAction } from './MarketingAction';
import { MarketingActionStatus } from '@/marketing-action/types';
import { MarketingActionRes } from '@/marketing-action/types';

type Props = {
  marketingActions?: MarketingActionRes[];
  mutateMarketingActions: () => void;
  onChangePeriod: (dates: string[]) => void;
};

export const Detail = ({
  marketingActions = [],
  mutateMarketingActions,
  onChangePeriod,
}: Props) => {
  const { query, pathname, push, locale } = useRouter();
  const { t } = useTranslation('marketingAction');
  const [period, setPeriod] = useState<any>([]);

  useEffect(() => {
    if (marketingActions.length) {
      const isExist = marketingActions.filter(ma => ma.id === query.marketingActionId);
      if (!isExist.length) {
        handleMAChange({ marketingActionId: marketingActions[0].id });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketingActions]);

  const convertToTree = (marketingActions: any) => {
    const maTypes = marketingActions.reduce(
      (prev: any, curr: any) => {
        const _idx = prev.ids.indexOf(curr.marketing_action_type_id);
        if (_idx === -1) {
          prev.array.push({
            ...curr.marketing_action_type,
            id: curr.marketing_action_type_id,
            children: [curr],
          });

          prev.ids.push(curr.marketing_action_type_id);
        } else {
          prev.array[_idx].children.push(curr);
        }
        return prev;
      },
      { array: [], ids: [] }
    );

    return maTypes.array;
  };

  const handleMAChange = (queryParams: any) => {
    push({
      pathname,
      query: { ...query, ...queryParams },
    });
  };

  const getMenu = (maType: any) => {
    const menu: any = {
      value: maType.id,
      label: maType.name,
    };
    if (maType.children.length > 1) {
      const children = maType.children.map((ma: any) => {
        return {
          value: ma.id,
          onClick: () => handleMAChange({ marketingActionId: ma.id }),
          label: `${LanguageUtils.getDateFormat(ma.start_at, locale)} 〜`,
          content: (
            <MarketingAction marketingAction={ma} mutateMarketingActions={mutateMarketingActions} />
          ),
        };
      });
      return { ...menu, children };
    }
    const ma = maType.children[0];
    return {
      ...menu,
      value: ma.id,
      onClick: () => handleMAChange({ marketingActionId: ma.id }),
      content: (
        <MarketingAction marketingAction={ma} mutateMarketingActions={mutateMarketingActions} />
      ),
    };
  };

  const getListMenu = (type: TYPE) => {
    const maTypes = convertToTree(marketingActions);
    return maTypes
      .filter((maType: any) => maType.type === type)
      .reduce((_arr: SideMenuItem[], maType: any) => {
        _arr.push(getMenu(maType));
        return _arr;
      }, []);
  };

  const groups: SideMenuGroupItem[] = [
    {
      icon: 'mail',
      label: t('messageDelivery'),
      items: getListMenu(TYPE.NOTIFICATION),
    },
    {
      icon: 'chatbot2',
      label: t('chatbot'),
      items: getListMenu(TYPE.CHATBOT),
    },
    {
      icon: 'popup',
      label: t('popup'),
      items: getListMenu(TYPE.POPUP),
    },
  ];

  const renderEmpty = () => {
    const status = query.marketingActionStatus;
    if (status === MarketingActionStatus.RUNNING) {
      return <div>{t('emptyRunningMarketingAction')}</div>;
    } else if (status === MarketingActionStatus.COMPLETE) {
      return <div>{t('emptyCompletedMarketingAction')}</div>;
    }
    return <div>{t('emptyDraftMarketingAction')}</div>;
  };

  const isEmpty = !marketingActions.length;

  const [value, setValue] = useState(marketingActions[0]?.id || '');

  useEffect(() => {
    if (query.marketingActionId) {
      setValue(query.marketingActionId as string);
    }
  }, [query.marketingActionId, query]);

  const handleChangePeriod = (dates: Date | Date[]) => {
    if (Array.isArray(dates)) {
      if (dates.length) {
        setPeriod([dates[0], dates[1]]);
        const _from = addDays(dates[0], 1).toISOString().slice(0, 10);
        const _to = addDays(dates[1], 2).toISOString().slice(0, 10);
        onChangePeriod([_from, _to]);
      } else {
        setPeriod([]);
        onChangePeriod([]);
      }
    }
  };

  return (
    <div className='flex flex-col w-full h-full mt-7'>
      <div className='mb-[60px]'>
        <TargetFilter />
        <div className='flex items-center gap-10 mt-5'>
          <div className='font-bold'>{t('period')}</div>
          <DatePicker range value={period} onChange={handleChangePeriod} />
        </div>
      </div>
      {isEmpty ? renderEmpty() : <SideMenu groups={groups} value={value} />}
    </div>
  );
};
