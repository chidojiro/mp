import React, { useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { TargetFilterUtils } from '@/utils';
import { MarketingActionAPI } from '@/apis';
import { MarketingActionStatus as MAStatus, MarketingActionTypeMessage as TYPE } from '@/types';
import { SideMenu, SideMenuGroup, SideMenuItem } from '@/components/common';
import { TargetFilter } from '@/components/report';

import { MarketingAction } from './MarketingAction';

export const Detail = () => {
  const { query, pathname, push } = useRouter();
  const { t } = useTranslation('marketingAction');
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const _targets = [query.targets].flat().filter(Boolean);
    if (_targets.length) {
      const _targetSegments = _targets.map(target =>
        TargetFilterUtils.getTargetFilterObj(target as string)
      );
      setFilter(prevState => {
        return { ...prevState, target_segments: JSON.stringify(_targetSegments) };
      });
    }
  }, [query.targets]);

  const maStatus = (query.marketingActionStatus as string) || MAStatus.RUNNING;

  const { data, mutate } = useSWR(
    ['/actions', filter],
    () => MarketingActionAPI.list({ params: filter }),
    {
      fallbackData: {},
    }
  );

  const marketingActions = data?.[maStatus] || [];

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
          label: ma.description,
          content: <MarketingAction marketingAction={ma} mutateMarketingActions={mutate} />,
        };
      });
      return { ...menu, children };
    }
    const ma = maType.children[0];
    return {
      ...menu,
      value: ma.id,
      onClick: () => handleMAChange({ marketingActionId: ma.id }),
      content: <MarketingAction marketingAction={ma} mutateMarketingActions={mutate} />,
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

  const groups: SideMenuGroup[] = [
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
    return <div>{t('emptyMarketingAction')}</div>;
  };

  const isEmpty = !marketingActions.length;

  const [value, setValue] = useState(marketingActions[0]?.id || '');

  useEffect(() => {
    if (query.marketingActionId) {
      setValue(query.marketingActionId as string);
    }
  }, [query.marketingActionId, query]);

  return (
    <div className='flex flex-col w-full h-full mt-7'>
      <div className='mb-[60px]'>
        <TargetFilter />
      </div>
      {isEmpty ? renderEmpty() : <SideMenu groups={groups} value={value} />}
    </div>
  );
};
