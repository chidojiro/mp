import React, { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { MarketingActionAPI } from '@/apis';
import { Form } from '@/components';
import { ActionContainer } from '@/components/marketingAction';
import { useVisibilityControl } from '@/hooks';
import { MarketingActionRes, MarketingActionStatus, TARGET } from '@/types';
import { TargetFilterUtils } from '@/utils';

import { PreviewOverlay } from '../PreviewOverlay';
import { Steppers } from '../Steppers';
import SavingActions from '../Steppers/SavingActions';
import { TargetCustomerGroup } from '../TargetCustomerGroup';
import { LineSettings } from './LineSettings';
import { Message1Settings } from './Message1Settings';
import { Message2Settings } from './Message2Settings';

export const OPTIONS = {
  YES: 'yes',
  NO: 'no',
};

export const CartAbandoned = () => {
  const { t } = useTranslation('marketingAction');
  const methods = useForm();
  const [messagePreview, setMessagePreview] = useState<any>();

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

  const step1Methods = useForm({ defaultValues: { enable_line: OPTIONS.YES } });

  const messageDefaultSettings = {
    delivery_time: '10:00',
    headline_email: t('defaultHeadline'),
    text_email: t('defaultTextEmail'),
    text_option: OPTIONS.NO,
    color: '#55C5D9',
  };
  const step2Methods = useForm({
    defaultValues: {
      delivery_date: '1',
      ...messageDefaultSettings,
    },
  });
  const step3Methods = useForm({
    defaultValues: {
      second_message_option: OPTIONS.YES,
      delivery_date: '3',
      same_message_content: OPTIONS.YES,
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
        TARGET.OTHER_DORMANT, // will update later once BE is ready
      ],
    },
  });

  const resetMessage = useCallback((message: any) => {
    return {
      delivery_date: message.send_after_days,
      delivery_time: message.send_at,
      headline_email: message.mail_content?.title,
      text_email: message.mail_content?.content,
      color: message.color,
      text_option: message.line_messages?.is_display ? OPTIONS.YES : OPTIONS.NO,
      text_line: message.line_messages?.content,
    };
  }, []);

  const resetData = useCallback(
    (marketingAction: MarketingActionRes) => {
      const settings = marketingAction.settings;
      // reset step 1
      const _lineSettting = settings?.enable_line ? OPTIONS.YES : OPTIONS.NO;
      step1Methods.reset({ enable_line: _lineSettting });

      // reset step 2
      step2Methods.reset({
        ...resetMessage(settings.step_messages[0]),
      });

      // reset step 3
      const _secondMsg = settings.step_messages[1];
      const isSameContent = _secondMsg.has_self_mail_content;
      let _secondMsgData = {
        second_message_option: _secondMsg.send_flag ? OPTIONS.YES : OPTIONS.NO,
        same_message_content: !isSameContent ? OPTIONS.YES : OPTIONS.NO,
      };
      if (_secondMsg.send_flag && !isSameContent) {
        _secondMsgData = { ..._secondMsgData, ...resetMessage(_secondMsg) };
      }
      step3Methods.reset({ ..._secondMsgData }, { keepDefaultValues: true });

      // reset step 4
      const _targetSegments = marketingAction.target_segments?.map(target =>
        TargetFilterUtils.getTargetValue(target)
      );
      step4Methods.reset({ target_customers: _targetSegments || [] });
    },
    [step1Methods, step2Methods, step3Methods, step4Methods, resetMessage]
  );

  useEffect(() => {
    if (marketingAction) {
      resetData(marketingAction);
    }
  }, [marketingAction, resetData]);

  const useLine = step1Methods.getValues('enable_line') === OPTIONS.YES;
  const firstMessage: any = step2Methods.getValues();
  const secondMessage: any = step3Methods.getValues();

  const getMessageData = (message: any) => {
    return {
      color: message.color,
      mail_content: {
        title: message.headline_email,
        content: message.text_email,
      },
      line_messages: {
        content: message.text_line || '',
        is_display: message.text_option === OPTIONS.YES,
      },
    };
  };

  const prepareData = (status: MarketingActionStatus) => {
    const _targetSegments = step4Methods
      .getValues('target_customers')
      .map(target => TargetFilterUtils.getTargetFilterObj(target as string));

    const _firstMsg = {
      content_verified: true,
      send_flag: true,
      send_order: 1,
      send_after_days: firstMessage.delivery_date,
      send_at: firstMessage.delivery_time,
      ...getMessageData(firstMessage),
    };

    const isSend = secondMessage.second_message_option === OPTIONS.YES;
    let _secondMsg: any = {
      send_flag: isSend,
      content_verified: true,
      send_order: 2,
    };
    if (isSend) {
      const isSameContent = secondMessage.same_message_content === OPTIONS.YES;
      _secondMsg = {
        ..._secondMsg,
        has_self_mail_content: !isSameContent,
        send_after_days: secondMessage.delivery_date,
        send_at: secondMessage.delivery_time,
      };
      if (!isSameContent) {
        _secondMsg = {
          ..._secondMsg,
          ...getMessageData(secondMessage),
        };
      }
    }

    const data = {
      start_at: new Date().toISOString(), // TODO will remove once BE is update
      description: t('cartAbandoned'),
      marketing_action_type_id: 1,
      status,
      settings: {
        enable_line: useLine,
        step_messages: [_firstMsg, _secondMsg],
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
      push(`${asPath}/${res.id}`);
    }
  };

  const steps1 = [
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
    if (stepId === 3 && secondMessage?.same_message_content === OPTIONS.NO) {
      message = secondMessage;
    }
    setMessagePreview({
      headline: message?.headline_email,
      messageEmail: message?.text_email,
      messageLine: message?.text_line,
      color: message.color,
    });
    previewMessageControl.open();
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
      ></ActionContainer>
      <Form methods={methods} className='mt-[60px]'>
        <Steppers steps={steps1} onShowPreview={onShowPreview} />
      </Form>
      <PreviewOverlay
        defaultType='mail'
        mailHeadline={messagePreview?.headline}
        mailBody={messagePreview?.messageEmail}
        lineBody={messagePreview?.messageLine}
        color={messagePreview?.color}
        control={previewMessageControl}
      />
      <SavingActions
        disable={!isDone}
        onSaveMarketingAction={handleSaveMA}
        marketingActionName={t('cartAbandoned')}
      />
    </div>
  );
};
