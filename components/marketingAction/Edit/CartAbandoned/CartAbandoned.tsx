import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { MarketingActionAPI } from '@/apis';
import { ActionContainer } from '@/components/ActionContainer';
import { Form } from '@/components/common';
import { PreviewOverlay } from '@/components/marketingAction/PreviewOverlay';
import { useVisibilityControl } from '@/hooks';
import { MarketingActionAlias, MarketingActionStatus, TARGET } from '@/types';
import { TargetFilterUtils } from '@/utils';

import { Steppers } from '../Steppers';
import SavingActions from '../Steppers/SavingActions';
import { TargetCustomerGroup } from '../TargetCustomerGroup';
import { convertFromStepMessageRaw, convertToStepMessageRaw } from '../utils';

import { LineSettings } from './LineSettings';
import { Message1Settings } from './Message1Settings';
import { Message2Settings } from './Message2Settings';

export const CartAbandoned = () => {
  const { t } = useTranslation('marketingAction');
  const methods = useForm();
  const [messagePreview, setMessagePreview] = useState<any>();
  const [maId, setMaId] = useState('');

  const {
    push,
    query: { marketingActionId },
    asPath,
  } = useRouter();

  const previewMessageControl = useVisibilityControl();

  const { data: marketingAction } = useSWR(
    marketingActionId ? ['/actions', marketingActionId] : null,
    () => MarketingActionAPI.get(marketingActionId as string)
  );

  const step1Methods = useForm({ defaultValues: { enable_line: true } });

  const messageDefaultSettings = {
    send_at: '10:00',
    mail_content: {},
    line_messages: {
      text_msg_display: false,
    },
    color: '#55C5D9',
    send_flag: true,
    content_verified: true,
  };
  const step2Methods = useForm({
    defaultValues: {
      send_after_days: '1',
      send_order: 1,
      ...messageDefaultSettings,
    },
  });
  const step3Methods = useForm({
    defaultValues: {
      send_order: 2,
      send_after_days: '3',
      has_self_mail_content: false,
      ...messageDefaultSettings,
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

  const resetData = useCallback(
    marketingAction => {
      const settings = marketingAction.settings;
      step1Methods.reset({ enable_line: settings?.enable_line });

      step2Methods.reset(convertFromStepMessageRaw(settings?.step_messages?.[0]), {
        keepDefaultValues: true,
      });

      step3Methods.reset(convertFromStepMessageRaw(settings?.step_messages?.[1]), {
        keepDefaultValues: true,
      });

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

  const useLine = step1Methods.getValues('enable_line');
  const firstMessage: any = step2Methods.getValues();
  const secondMessage: any = step3Methods.getValues();

  const prepareData = (status: MarketingActionStatus) => {
    const _targetSegments = TargetFilterUtils.getTargetCustomers(
      step4Methods.getValues('target_customers')
    );

    const data = {
      start_at: new Date().toISOString(), // TODO will remove once BE is update
      description: 'カゴ落ち通知',
      marketing_action_type_alias: MarketingActionAlias.CART_LEFT_NOTIFICATION,
      status,
      settings: {
        enable_line: useLine,
        step_messages: [
          convertToStepMessageRaw(firstMessage),
          convertToStepMessageRaw(secondMessage),
        ],
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

  const steps = [
    {
      id: 1,
      name: t('useLine'),
      children: <LineSettings />,
      methods: step1Methods,
    },
    {
      id: 2,
      name: t('msgSetting1'),
      children: <Message1Settings useLine={useLine} />,
      showPreviewBtn: true,
      methods: step2Methods,
    },
    {
      id: 3,
      name: t('msgSetting2'),
      children: <Message2Settings useLine={useLine} />,
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

  const onShowPreview = (stepId: number) => {
    let message = firstMessage;
    if (stepId === 3 && secondMessage?.send_flag && secondMessage?.has_self_mail_content) {
      message = secondMessage;
    }
    setMessagePreview({
      headline: message?.mail_content.title_preview,
      messageEmail: message?.mail_content.content_preview,
      messageLine: message?.line_messages.text_msg_content,
      color: message.color,
    });
    previewMessageControl.open();
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
        iconName='cart'
        title={t('cartAbandoned')}
        description={t('cartAbandonedDescription')}
        descriptionImageUrl='/images/cart-abandoned-description.png'
        flowImgUrl='/images/cart-abandoned-flow.png'
        output={t('messageDelivery')}
      ></ActionContainer>
      <div className='relative'>
        <Form methods={methods} className='mt-[60px]'>
          <Steppers steps={steps} onShowPreview={onShowPreview} />
        </Form>
      </div>
      <div className='relative'>
        <PreviewOverlay
          defaultType='mail'
          mailHeadline={messagePreview?.headline}
          mailBody={messagePreview?.messageEmail}
          lineBody={messagePreview?.messageLine}
          color={messagePreview?.color}
          control={previewMessageControl}
        />
      </div>
      <SavingActions
        disable={!isDone}
        onSaveMarketingAction={handleSaveMA}
        onCloseModal={handleCloseModal}
        marketingActionName={t('cartAbandoned')}
      />
    </div>
  );
};
