import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Form } from '@/common/Form';
import { ActionContainer } from '@/marketing-action/ActionContainer';
import { PreviewOverlay } from '@/marketing-action/PreviewOverlay';
import { MarketingActionUtils } from '@/marketing-action/utils';

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
import { useVisibilityControl } from '@/common/useVisibilityControl';
import { MarketingActionStatus } from '@/marketing-action/types';
import { MarketingActionAlias } from '@/marketing-action/types';
import { TARGET } from '@/marketing-action/types';
import { StepMessage } from '@/marketing-action/types';
import { MarketingActionApis } from '@/marketing-action/apis';

const defaultStepConfirmedFlags = [false, false, false, false];

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

  const [stepConfirmedFlags, setStepConfirmedFlags] =
    React.useState<boolean[]>(defaultStepConfirmedFlags);

  const previewMessageControl = useVisibilityControl();

  const { data: marketingAction } = useSWR(
    marketingActionId ? ['/actions', marketingActionId] : null,
    () => MarketingActionApis.get(marketingActionId as string)
  );

  const step1Methods = useForm({ defaultValues: { enable_line: true } });

  const messageDefaultSettings = {
    send_at: '10:00',
    mail_content: {
      title: t('forgotSomething'),
      title_draft_raw: getDefaultMessageContentState(t('forgotSomething')),
      content: t('mailContentDefault', { brand_name: t('brandName') }),
      content_draft_raw: getDefaultMessageContentState(
        t('mailContentDefault', { brand_name: t('brandName') }),
        [{ name: 'brand_name', displayName: t('brandName') }]
      ),
      color: '#55C5D9',
    },
    line_messages: {
      text_msg_display: false,
      flex_msg_image_ratio: '16:9',
      flex_msg_head: t('forgotSomethingLine'),
      flex_msg_head_draft_raw: getDefaultMessageContentState(t('forgotSomethingLine')),
    },
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
        keepDirty: true,
      });

      step3Methods.reset(convertFromStepMessageRaw(settings?.step_messages?.[1]), {
        keepDefaultValues: true,
        keepDirty: true,
      });

      const _targetSegments = MarketingActionUtils.getTargetFilters(
        marketingAction.target_segments
      );

      step4Methods.reset({ target_customers: _targetSegments || [] });
      setStepConfirmedFlags(settings?.steps_confirmed_flag ?? defaultStepConfirmedFlags);
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
    const _targetSegments = MarketingActionUtils.getTargetCustomers(
      step4Methods.getValues('target_customers')
    );

    const data = {
      start_at: new Date().toISOString(), // TODO will remove once BE is update
      description: 'カゴ落ち通知',
      marketing_action_type_alias: MarketingActionAlias.CART_LEFT_NOTIFICATION,
      status,
      settings: {
        enable_line: useLine,
        steps_confirmed_flag: stepConfirmedFlags,
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
      await MarketingActionApis.update(marketingActionId as string, data);
    } else {
      const res = await MarketingActionApis.create(data);
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

  const handleConfirmChanged = (index: number, confirmed: boolean) => {
    setStepConfirmedFlags(prev => {
      const _steps = [...prev];
      _steps[index] = confirmed;
      return _steps;
    });
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

  const isDone = stepConfirmedFlags.every(Boolean);

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
          <Steppers
            steps={steps}
            onShowPreview={onShowPreview}
            confirmedSteps={stepConfirmedFlags}
            onConfirmChanged={handleConfirmChanged}
          />
        </Form>
      </div>
      <div className='relative'>
        <PreviewOverlay
          defaultType={messagePreview?.type}
          mailContent={messagePreview?.mail_content}
          lineMessage={messagePreview?.line_messages}
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
