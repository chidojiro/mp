import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Form } from '@/common/Form';
import { ActionContainer } from '@/marketing-action/ActionContainer';
import { MarketingActionUtils } from '@/marketing-action/utils';

import { ChatOverlay } from '../ChatOverlay';
import { ChatWindowSettings } from '../ChatWindowSettings';
import { Steppers } from '../Steppers';
import SavingActions from '../Steppers/SavingActions';
import { TargetCustomerGroup } from '../TargetCustomerGroup';

import { Step1Settings } from './Step1Settings';
import { useVisibilityControl } from '@/common/useVisibilityControl';
import { MarketingActionStatus } from '@/marketing-action/types';
import { MarketingActionAlias } from '@/marketing-action/types';
import { TARGET } from '@/marketing-action/types';
import { MarketingActionRes } from '@/marketing-action/types';
import { MarketingActionApis } from '@/marketing-action/apis';

const defaultStepConfirmedFlags = [false, false, false];

export const RecommendedBot = () => {
  const { t } = useTranslation('marketingAction');
  const [maId, setMaId] = useState('');
  const {
    push,
    query: { marketingActionId },
    asPath,
  } = useRouter();

  const [stepConfirmedFlags, setStepConfirmedFlags] =
    React.useState<boolean[]>(defaultStepConfirmedFlags);

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
    () => MarketingActionApis.get(marketingActionId as string)
  );

  const resetData = useCallback(
    (marketingAction: MarketingActionRes) => {
      const settings = marketingAction.settings;
      step1Methods.reset({ recommend_source: settings?.recommend_source });

      step2Methods.reset({ ...settings });

      const _targetSegments = MarketingActionUtils.getTargetFilters(
        marketingAction.target_segments
      );

      step3Methods.reset({ target_customers: _targetSegments || [] });

      setStepConfirmedFlags(settings.steps_confirmed_flag ?? defaultStepConfirmedFlags);
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
    const _targetSegments = MarketingActionUtils.getTargetCustomers(
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
        steps_confirmed_flag: stepConfirmedFlags,
      },
      target_segments: _targetSegments,
    };
    return data;
  };

  const handleSaveMA = async (status: MarketingActionStatus) => {
    const data = prepareData(status);
    if (marketingActionId) {
      await MarketingActionApis.update(marketingActionId as string, data);
    } else {
      const res = await MarketingActionApis.create(data);
      setMaId(res.id);
    }
  };

  const onShowPreview = () => {
    chatPreviewControl.open();
  };

  const handleCloseModal = () => {
    push(`${asPath}/${maId}`);
  };

  const handleConfirmChanged = (index: number, confirmed: boolean) => {
    setStepConfirmedFlags(prev => {
      const _steps = [...prev];
      _steps[index] = confirmed;
      return _steps;
    });
  };

  const isDone = stepConfirmedFlags.every(Boolean);

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
        <Steppers
          steps={steps}
          onShowPreview={onShowPreview}
          confirmedSteps={stepConfirmedFlags}
          onConfirmChanged={handleConfirmChanged}
        />
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
