import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { MarketingActionAPI } from '@/apis';
import { ActionContainer } from '@/components/ActionContainer';
import { Form } from '@/components/common';
import { useVisibilityControl } from '@/hooks';
import { MarketingActionAlias, MarketingActionRes, MarketingActionStatus, TARGET } from '@/types';
import { TargetFilterUtils } from '@/utils';

import { ChatOverlay } from '../ChatOverlay';
import { ChatWindowSettings } from '../ChatWindowSettings';
import { Steppers } from '../Steppers';
import SavingActions from '../Steppers/SavingActions';
import { TargetCustomerGroup } from '../TargetCustomerGroup';

import { Step1Settings } from './Step1Settings';

export const RecommendedBot = () => {
  const { t } = useTranslation('marketingAction');
  const [maId, setMaId] = useState('');
  const {
    push,
    query: { marketingActionId },
    asPath,
  } = useRouter();

  const [sourceId, setSourceId] = useState('');
  const methods = useForm();
  const chatPreviewControl = useVisibilityControl();
  const step1Methods = useForm({});

  const step2Methods = useForm({
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
  const step3Methods = useForm({
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

  const chatSettings: any = step2Methods.getValues();

  const steps = [
    {
      id: 1,
      name: t('csvFileUpload'),
      children: <Step1Settings sourceId={sourceId} />,
      methods: step1Methods,
    },
    {
      id: 2,
      name: t('chatWindowSettings'),
      children: <ChatWindowSettings />,
      showPreviewBtn: true,
      methods: step2Methods,
    },
    {
      id: 3,
      name: t('targetSetting'),
      children: <TargetCustomerGroup />,
      methods: step3Methods,
    },
  ];

  const { data: marketingAction } = useSWR(
    marketingActionId ? ['/actions', marketingActionId] : null,
    () => MarketingActionAPI.get(marketingActionId as string)
  );

  const resetData = useCallback(
    (marketingAction: MarketingActionRes) => {
      const settings = marketingAction.settings;
      step1Methods.reset({ recommend_source: settings?.recommend_source });

      step2Methods.reset({ ...settings });

      const _targetSegments = TargetFilterUtils.getTargetFilters(marketingAction.target_segments);

      step3Methods.reset({ target_customers: _targetSegments || [] });
    },
    [step1Methods, step2Methods, step3Methods]
  );

  useEffect(() => {
    if (marketingAction) {
      resetData(marketingAction);
    }
  }, [marketingAction, resetData]);

  useEffect(() => {
    const _id = marketingAction?.settings.recommend_source;
    if (_id) {
      setSourceId(_id);
    }
  }, [marketingAction]);

  const prepareData = (status: MarketingActionStatus) => {
    const _targetSegments = TargetFilterUtils.getTargetCustomers(
      step3Methods.getValues('target_customers')
    );

    const data = {
      start_at: new Date().toISOString(),
      description: t('recommendationDiagnosisBotStatic'),
      marketing_action_type_alias: MarketingActionAlias.RECOMMEND_DIAGNOSTIC,
      status,
      settings: {
        recommend_source: step1Methods.getValues('recommend_source'),
        chat_window_color: chatSettings.chat_window_color,
        display_settings_pc: chatSettings.display_settings_pc,
        display_settings_mobile: chatSettings.display_settings_mobile,
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

  const isDone = isStepDone(step1Methods) && isStepDone(step2Methods) && isStepDone(step3Methods);

  return (
    <div className='relative'>
      <ActionContainer
        showUseTemplateBtn={false}
        iconName='chatbot'
        title={t('recommendationDiagnosisBotStatic')}
        description={t('recommendationDiagnosisBotStaticDescription')}
        descriptionImageUrl='/images/recommendation-diagnosis-bot-description.png'
        targets={[TARGET.F0_MEMBER, TARGET.F0_OTHERS, TARGET.F1]}
        appearance={t('category')}
      ></ActionContainer>

      <Form methods={methods} className='mt-[60px]'>
        <Steppers steps={steps} onShowPreview={onShowPreview} />
      </Form>

      <ChatOverlay color={chatSettings.chat_window_color} control={chatPreviewControl} />

      <SavingActions
        disable={!isDone}
        onSaveMarketingAction={handleSaveMA}
        onCloseModal={handleCloseModal}
        marketingActionName={t('recommendationDiagnosisBotStatic')}
      />
    </div>
  );
};
