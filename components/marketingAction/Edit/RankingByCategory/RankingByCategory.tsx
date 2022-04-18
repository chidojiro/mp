import React, { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import { Form } from '@/components/common';
import { ActionContainer } from '@/components/ActionContainer';
import { useVisibilityControl } from '@/hooks';
import { MarketingActionRes, MarketingActionStatus, TARGET } from '@/types';
import { MarketingActionAPI } from '@/apis';
import { TargetFilterUtils } from '@/utils';

import { ChatOverlay } from '../ChatOverlay';
import { TargetCustomerGroup } from '../TargetCustomerGroup';
import { Step1Settings } from './Step1Settings';
import { Step2Settings } from './Step2Settings';
import { ChatWindowSettings } from '../ChatWindowSettings';
import SavingActions from '../Steppers/SavingActions';
import { Steppers } from '../Steppers';

export const RankingByCategory = () => {
  const { t } = useTranslation('marketingAction');
  const [maId, setMaId] = useState('');
  const {
    push,
    query: { marketingActionId },
    asPath,
  } = useRouter();

  const methods = useForm();
  const chatPreviewControl = useVisibilityControl();
  const step1Methods = useForm({ defaultValues: { report_period: 'monthly' } });
  const step2Methods = useForm({
    defaultValues: {
      carousel: {
        title: t('carouselTitle'),
        content: t('carouselContent'),
      },
    },
  });

  const step3Methods = useForm({
    defaultValues: {
      chat_window_color: '#E22B2D',
      display_settings_pc: {
        appear_time: 0,
        position: 'right',
        position_close_box: 0,
        position_close_box_unit: 'px',
      },
      display_settings_mobile: {
        appear_time: 0,
        position: 'right',
        position_close_box: 0,
        position_close_box_unit: 'px',
      },
    },
  });
  const step4Methods = useForm({
    defaultValues: {
      target_customers: [
        TARGET.F0_MEMBER,
        TARGET.F1,
        TARGET.F2,
        TARGET.SEMI_LOYAL,
        TARGET.LOYAL,
        TARGET.F1_DORMANT,
        TARGET.LOYAL_DORMANT,
        TARGET.OTHER_DORMANT,
      ],
    },
  });
  const reportPeriod = step1Methods.getValues('report_period');
  const carousel: any = step2Methods.getValues('carousel');
  const chatSettings: any = step3Methods.getValues();

  const steps = [
    {
      id: 1,
      name: t('aggregationPeriodSettings'),
      children: <Step1Settings />,
      methods: step1Methods,
    },
    {
      id: 2,
      name: t('carouselDisplaySettings'),
      children: <Step2Settings isMonthly={reportPeriod === 'monthly'} />,
      showPreviewBtn: true,
      methods: step2Methods,
    },
    {
      id: 3,
      name: t('chatWindowSettings'),
      children: <ChatWindowSettings />,
      showPreviewBtn: true,
      methods: step3Methods,
    },
    {
      id: 4,
      name: t('targetSetting'),
      children: <TargetCustomerGroup />,
      methods: step4Methods,
    },
  ];

  const { data: marketingAction } = useSWR(
    marketingActionId ? ['/actions', marketingActionId] : null,
    () => MarketingActionAPI.get(marketingActionId as string)
  );

  const resetData = useCallback(
    (marketingAction: MarketingActionRes) => {
      const settings = marketingAction.settings;
      step1Methods.reset({ report_period: settings?.report_period });

      step2Methods.reset({ carousel: settings.carousel?.[0] });

      step3Methods.reset({ ...settings });

      const _targetSegments = TargetFilterUtils.getTargetFilters(marketingAction.target_segments);

      step4Methods.reset({ target_customers: _targetSegments || [] });
    },
    [step1Methods, step2Methods, step3Methods, step4Methods]
  );

  useEffect(() => {
    if (marketingAction) {
      resetData(marketingAction);
    }
  }, [marketingAction, resetData]);

  const prepareData = (status: MarketingActionStatus) => {
    const _targetSegments = TargetFilterUtils.getTargetCustomers(
      step4Methods.getValues('target_customers')
    );

    const data = {
      start_at: new Date().toISOString(),
      description: '全体の購入履歴に基づくカテゴリーごとのランキング（動的）',
      marketing_action_type_id: 6,
      status,
      settings: {
        report_period: reportPeriod,
        carousel: [carousel],
        chat_window_color: chatSettings.chat_window_color,
        display_settings_pc: chatSettings.display_settings_pc,
        display_settings_mobile: chatSettings.display_settings_mobile,
        chat_visuals: [], // BE is required
      },
      target_segments: _targetSegments,
    };
    return data;
  };

  const handleSaveMA = async (status: MarketingActionStatus) => {
    const data = prepareData(status);
    if (marketingActionId) {
      await MarketingActionAPI.update(marketingActionId as string, data);
    } else {
      const res = await MarketingActionAPI.create(data);
      setMaId(res.id);
    }
  };

  const onShowPreview = () => {
    chatPreviewControl.open();
  };

  const handleCloseModal = () => {
    push(`${asPath}/${maId}`);
  };

  const isStepDone = (methods: any) => {
    return methods.formState.isSubmitSuccessful && !methods.formState.isDirty;
  };

  const isDone =
    isStepDone(step1Methods) &&
    isStepDone(step2Methods) &&
    isStepDone(step3Methods) &&
    isStepDone(step4Methods);

  return (
    <div className='relative'>
      <ActionContainer
        showUseTemplateBtn={false}
        iconName='ranking-by-category'
        title={t('rankingByCategoryBasedOnOverallPurchaseHistory')}
        description={t('rankingByCategoryBasedOnOverallPurchaseHistoryDescription')}
        descriptionImageUrl='/images/ranking-category.png'
      ></ActionContainer>
      <Form methods={methods} className='mt-[60px]'>
        <Steppers steps={steps} onShowPreview={onShowPreview} />
      </Form>

      <ChatOverlay color={chatSettings.chat_window_color} control={chatPreviewControl} />

      <SavingActions
        disable={!isDone}
        onSaveMarketingAction={handleSaveMA}
        onCloseModal={handleCloseModal}
        marketingActionName={t('rankingByCategoryBasedOnOverallPurchaseHistory')}
      />
    </div>
  );
};
