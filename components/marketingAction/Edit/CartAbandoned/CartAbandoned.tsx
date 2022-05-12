import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { MarketingActionAPI } from '@/apis';
import { ActionContainer } from '@/components/ActionContainer';
import { Form } from '@/components/common';
import { PreviewOverlay } from '@/components/marketingAction/PreviewOverlay';
import { useVariables, useVisibilityControl } from '@/hooks';
import { MarketingActionAlias, MarketingActionStatus, StepMessage, TARGET } from '@/types';
import { TargetFilterUtils } from '@/utils';

import { Steppers } from '../Steppers';
import SavingActions from '../Steppers/SavingActions';
import { TargetCustomerGroup } from '../TargetCustomerGroup';
import {
  convertFromStepMessageRaw,
  convertToStepMessageRaw,
  getDefaultMessageContentState,
} from '../utils';

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

  const { data: variables } = useVariables(MarketingActionAlias.CART_LEFT_NOTIFICATION);

  const step1Methods = useForm({ defaultValues: { enable_line: true } });

  const messageDefaultSettings = {
    send_at: '10:00',
    mail_content: {
      title: t('forgotSomething'),
      title_preview: t('forgotSomething'),
      title_draft_raw: getDefaultMessageContentState(t('forgotSomething')),
      content: t('mailContentDefault', { brand_name: t('brandName') }),
      content_draft_raw: getDefaultMessageContentState(
        t('mailContentDefault', { brand_name: t('brandName') }),
        [{ name: 'brand_name', displayName: t('brandName') }]
      ),
    },
    line_messages: {
      text_msg_display: false,
      flex_msg_image_ratio: '16:9',
      flex_msg_head: t('forgotSomethingLine'),
      flex_msg_head_preview: t('forgotSomethingLine'),
      flex_msg_head_draft_raw: getDefaultMessageContentState(t('forgotSomethingLine')),
    },
    color: '#55C5D9',
    send_flag: true,
    content_verified: true,
  } as any;
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
    if (!marketingActionId && variables.length) {
      const preview = t('mailContentDefault', {
        brand_name: variables.find(v => v.name === 'brand_name')?.content,
      });
      step2Methods.setValue('mail_content.content_preview', preview);
      step3Methods.setValue('mail_content.content_preview', preview);
    }
  }, [variables, marketingActionId, t, step2Methods, step3Methods]);

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

  const onShowPreview = (message: StepMessage, type = 'mail') => {
    let _message = { ...message };
    if (!_message.send_flag || !_message.has_self_mail_content) {
      _message = firstMessage;
    }
    setMessagePreview({ ..._message, type });
    previewMessageControl.open();
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
      children: <Message1Settings useLine={useLine} onShowPreview={onShowPreview} />,
      showPreviewBtn: true,
      methods: step2Methods,
    },
    {
      id: 3,
      name: t('msgSetting2'),
      children: <Message2Settings useLine={useLine} onShowPreview={onShowPreview} />,
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
          defaultType={messagePreview?.type}
          mailHeadline={messagePreview?.mail_content.title_preview}
          mailBody={messagePreview?.mail_content.content_preview}
          lineHeadline={messagePreview?.line_messages.flex_msg_head_preview}
          lineBody={messagePreview?.line_messages.text_msg_content}
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
