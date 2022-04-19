import React from 'react';

import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';

import { Button, Modal } from '@/components/common';
import { Stepper } from '@/components/Stepper';
import { ActionContainer } from '@/components/ActionContainer';
import {
  MarketingActionRes,
  MarketingActionStatus,
  StepMessage,
  StepMessageReportPeriod,
  StepMessageTemplate,
  TARGET,
} from '@/types';
import { MarketingActionAPI } from '@/apis';
import { TargetFilterUtils } from '@/utils';
import { useHref, useVisibilityControl } from '@/hooks';

import { LineUsageSettingsStep } from './LineUsageSettingsStep';
import { Message1SettingsStep } from './Message1SettingsStep';
import { Message2SettingsStep } from './Message2SettingsStep';
import { TargetSettingsStep } from './TargetSettingsStep';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const DeliveryAfterPurchase = ({}: Props) => {
  const [newMarketingActionId, setNewMarketingActionId] = React.useState<string>();

  const message1SettingsRef = React.useRef<HTMLElement>();
  const message2SettingsRef = React.useRef<HTMLElement>();
  const targetSettingsRef = React.useRef<HTMLElement>();

  const { t } = useTranslation('marketingAction');
  const { getMarketingActionEditHref, getMarketingActionListHref, getMyMarketingActionListHref } =
    useHref();

  const {
    query: { marketingActionId },
    push,
  } = useRouter();

  const draftConfirmModalControl = useVisibilityControl();
  const implementConfirmModalControl = useVisibilityControl();
  const implementCompleteConfirmModalControl = useVisibilityControl();

  const { data } = useSWR<MarketingActionRes>(
    marketingActionId ? ['/actions', marketingActionId] : null,
    () => MarketingActionAPI.get(marketingActionId as string)
  );

  const lineUsageSettingsStepMethods = useForm({ defaultValues: { enable_line: true } });
  const message1SettingsStepMethods = useForm<Partial<StepMessage>>({
    defaultValues: {
      send_flag: true,
      content_verified: true,
      template: StepMessageTemplate.REVIEW,
      send_after_days: 1,
      send_at: '10:00',
      line_messages: {
        text_msg_display: false,
      },
      color: '#55C5D9',
      send_order: 1,
    },
  });
  const message2SettingsStepMethods = useForm<Partial<StepMessage>>({
    defaultValues: {
      send_flag: false,
      content_verified: true,
      template: StepMessageTemplate.REVIEW,
      send_after_days: 1,
      send_at: '10:00',
      line_messages: {
        text_msg_display: false,
      },
      color: '#55C5D9',
      report_period: StepMessageReportPeriod.MONTHLY,
      send_order: 2,
    },
  });
  const targetSettingsMethods = useForm({
    defaultValues: {
      target_segments: TargetFilterUtils.getTargetCustomers([
        TARGET.F0_MEMBER,
        TARGET.F1,
        TARGET.F2,
        TARGET.SEMI_LOYAL,
        TARGET.LOYAL,
        TARGET.F1_DORMANT,
        TARGET.LOYAL_DORMANT,
        TARGET.OTHER_DORMANT,
      ]),
    },
  });

  React.useEffect(() => {
    if (lineUsageSettingsStepMethods.formState.isSubmitSuccessful) {
      window.scrollTo({
        behavior: 'smooth',
        top: message1SettingsRef.current!.getBoundingClientRect().top + window.pageYOffset - 80,
      });
    }
  }, [lineUsageSettingsStepMethods.formState.isSubmitSuccessful]);
  React.useEffect(() => {
    if (message1SettingsStepMethods.formState.isSubmitSuccessful) {
      window.scrollTo({
        behavior: 'smooth',
        top: message2SettingsRef.current!.getBoundingClientRect().top + window.pageYOffset - 80,
      });
    }
  }, [message1SettingsStepMethods.formState.isSubmitSuccessful]);
  React.useEffect(() => {
    if (message2SettingsStepMethods.formState.isSubmitSuccessful) {
      window.scrollTo({
        behavior: 'smooth',
        top: targetSettingsRef.current!.getBoundingClientRect().top + window.pageYOffset - 80,
      });
    }
  }, [message2SettingsStepMethods.formState.isSubmitSuccessful]);

  const isLineEnabled = lineUsageSettingsStepMethods.watch('enable_line');

  React.useEffect(() => {
    if (data) {
      lineUsageSettingsStepMethods.reset({ enable_line: data.settings.enable_line });
      message1SettingsStepMethods.reset(data.settings.step_messages[0]);
      message2SettingsStepMethods.reset(data.settings.step_messages[1]);
      targetSettingsMethods.reset({ target_segments: data.target_segments });
    }
  }, [
    data,
    lineUsageSettingsStepMethods,
    message1SettingsStepMethods,
    message2SettingsStepMethods,
    targetSettingsMethods,
  ]);

  const assembleData = (status: MarketingActionStatus) => {
    const lineUsageSettings = lineUsageSettingsStepMethods.getValues();
    const message1Settings = message1SettingsStepMethods.getValues();
    const message2Settings = message2SettingsStepMethods.getValues();
    const targetSettings = targetSettingsMethods.getValues();

    const data = {
      start_at: new Date().toISOString(), // TODO will remove once BE is update
      description: t('stepDeliveryAfterPurchase'),
      marketing_action_type_alias: 'AFTER_PURCHASE',
      status,
      settings: {
        ...lineUsageSettings,
        step_messages: [message1Settings, message2Settings],
      },
      ...targetSettings,
    };

    return data;
  };

  const handleSaveAsDraftClick = async () => {
    const { id } = await MarketingActionAPI.create(assembleData(MarketingActionStatus.DRAFT));

    setNewMarketingActionId(id);

    draftConfirmModalControl.open();
  };

  const handleSuspendClick = async () => {
    await MarketingActionAPI.update(
      marketingActionId as string,
      assembleData(MarketingActionStatus.SUSPEND)
    );

    push(getMyMarketingActionListHref());
  };

  const handleImplementClick = async () => {
    const newData = assembleData(MarketingActionStatus.RUNNING);

    if (isEditing) {
      await MarketingActionAPI.update(marketingActionId as string, newData);

      push(getMyMarketingActionListHref({ marketingActionId: marketingActionId as string }));
    } else {
      const { id } = await MarketingActionAPI.create(newData);

      setNewMarketingActionId(id);

      implementConfirmModalControl.close();
      implementCompleteConfirmModalControl.open();
    }
  };

  const isEditing = !!marketingActionId;

  const isLineUsageSettingsComplete =
    lineUsageSettingsStepMethods.formState.isSubmitSuccessful &&
    !lineUsageSettingsStepMethods.formState.isDirty;
  const isMessage1SettingsComplete =
    message1SettingsStepMethods.formState.isSubmitSuccessful &&
    !message1SettingsStepMethods.formState.isDirty;
  const isMessage2SettingsComplete =
    message2SettingsStepMethods.formState.isSubmitSuccessful &&
    !message2SettingsStepMethods.formState.isDirty;
  const isTargetSettingsComplete =
    targetSettingsMethods.formState.isSubmitSuccessful && !targetSettingsMethods.formState.isDirty;
  const isComplete =
    isLineUsageSettingsComplete &&
    isMessage1SettingsComplete &&
    isMessage2SettingsComplete &&
    isTargetSettingsComplete;

  return (
    <>
      <Modal
        control={draftConfirmModalControl}
        onClose={() =>
          push(
            getMarketingActionEditHref({
              marketingActionId: newMarketingActionId!,
              marketingActionName: 'step-delivery-after-purchase',
            })
          )
        }>
        <div className='text-center text-gray-dark'>
          <Modal.Body className='leading-loose whitespace-pre-line'>
            {t('alertAfterSaveAsDraft')}
          </Modal.Body>
          <Modal.Footer className='text-medium'>
            <Link
              passHref
              href={getMyMarketingActionListHref({
                marketingActionStatus: MarketingActionStatus.DRAFT,
                marketingActionId: newMarketingActionId!,
              })}>
              <Modal.FooterButton colorScheme='negative' onClick={draftConfirmModalControl.close}>
                {t('gotoMyMA')}
              </Modal.FooterButton>
            </Link>
          </Modal.Footer>
        </div>
      </Modal>
      <Modal
        control={implementCompleteConfirmModalControl}
        onClose={() =>
          push(
            getMarketingActionEditHref({
              marketingActionId: newMarketingActionId!,
              marketingActionName: 'step-delivery-after-purchase',
            })
          )
        }>
        <div className='text-center text-gray-dark'>
          <Modal.Body className='leading-loose whitespace-pre-line'>
            {t('alertAfterExecuting')}
          </Modal.Body>
          <Modal.Footer className='text-medium'>
            <Link
              passHref
              href={getMyMarketingActionListHref({
                marketingActionId: newMarketingActionId!,
                marketingActionStatus: MarketingActionStatus.RUNNING,
              })}>
              <Modal.FooterButton
                colorScheme='negative'
                onClick={implementCompleteConfirmModalControl.close}>
                {t('gotoMyMA')}
              </Modal.FooterButton>
            </Link>
          </Modal.Footer>
        </div>
      </Modal>
      <Modal control={implementConfirmModalControl}>
        <div className='text-center text-gray-dark'>
          <Modal.Body className='leading-loose whitespace-pre-line'>
            {t('executeTemplate')}
          </Modal.Body>
          <Modal.Footer className='text-medium'>
            <Modal.FooterButton colorScheme='negative' onClick={implementConfirmModalControl.close}>
              {t('cancel')}
            </Modal.FooterButton>
            <Modal.FooterButton onClick={handleImplementClick}>
              {t('implementTemplate')}
            </Modal.FooterButton>
          </Modal.Footer>
        </div>
      </Modal>

      <ActionContainer
        showUseTemplateBtn={false}
        iconName='mails'
        title={t('stepDeliveryAfterPurchase')}
        description={t('stepDeliveryAfterPurchaseDescription')}
        descriptionImageUrl='/images/step-delivery-after-purchase-description.png'
        flowImgUrl='/images/step-delivery-after-purchase-flow.png'></ActionContainer>
      <Stepper className='mt-16'>
        <LineUsageSettingsStep
          formMethods={lineUsageSettingsStepMethods}
          complete={isLineUsageSettingsComplete}
        />
        <Message1SettingsStep
          ref={message1SettingsRef}
          enableLine={isLineEnabled}
          formMethods={message1SettingsStepMethods}
          complete={isMessage1SettingsComplete}
        />
        <Message2SettingsStep
          ref={message2SettingsRef}
          enableLine={isLineEnabled}
          formMethods={message2SettingsStepMethods}
          complete={isMessage2SettingsComplete}
        />
        <TargetSettingsStep
          ref={targetSettingsRef}
          formMethods={targetSettingsMethods}
          complete={isTargetSettingsComplete}
        />
      </Stepper>
      <div className='flex justify-center gap-5 mt-10'>
        {!isEditing ? (
          <>
            <Button className='w-[240px]' colorScheme='danger' onClick={handleSaveAsDraftClick}>
              {t('saveDraft')}
            </Button>
            <Button
              colorScheme='negative'
              className='w-[240px]'
              onClick={() => push(getMarketingActionListHref())}>
              {t('stopEditing')}
            </Button>
          </>
        ) : (
          <Button className='w-[240px]' colorScheme='danger' onClick={handleSuspendClick}>
            {t('suspendTemplate')}
          </Button>
        )}
        <Button
          onClick={implementConfirmModalControl.open}
          className='w-[480px]'
          disabled={!isComplete}>
          {t('implementTemplate')}
        </Button>
      </div>
    </>
  );
};
