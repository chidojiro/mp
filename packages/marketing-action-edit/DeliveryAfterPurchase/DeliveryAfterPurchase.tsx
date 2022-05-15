import { Button } from '@/common/Button';
import { Icon } from '@/common/Icon';
import { Modal } from '@/common/Modal';
import { useVisibilityControl } from '@/common/useVisibilityControl';
import { ActionContainer } from '@/marketing-action/ActionContainer';
import { Stepper } from '@/common/Stepper';
import { MarketingActionUtils } from '@/marketing-action/utils';
import { Trans, useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { ConfirmButtonTooltip } from '../ConfirmButtonTooltip';
import { convertFromStepMessageRaw, convertToStepMessageRaw } from '../utils';
import { LineUsageSettingsStep } from './LineUsageSettingsStep';
import { Message1SettingsStep } from './Message1SettingsStep';
import { Message2SettingsStep } from './Message2SettingsStep';
import { TargetSettingsStep } from './TargetSettingsStep';
import { MarketingActionStatus } from '@/marketing-action/types';
import { TARGET } from '@/marketing-action/types';
import { StepMessageTemplate } from '@/marketing-action/types';
import { StepMessageReportPeriod } from '@/marketing-action/types';
import { StepMessage } from '@/marketing-action/types';
import { MarketingActionRes } from '@/marketing-action/types';
import { MarketingActionApis } from '@/marketing-action/apis';
import { useHrefs } from '@/navigation/useHrefs';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const DeliveryAfterPurchase = ({}: Props) => {
  const [newMarketingActionId, setNewMarketingActionId] = React.useState<string>();

  const message1SettingsRef = React.useRef<HTMLElement>();
  const message2SettingsRef = React.useRef<HTMLElement>();
  const targetSettingsRef = React.useRef<HTMLElement>();

  const tooltipControl = useVisibilityControl({ defaultVisible: true });

  const { t } = useTranslation('marketingAction');
  const { getMarketingActionEditHref, getMyMarketingActionListHref } = useHrefs();

  const {
    query: { marketingActionId },
    push,
  } = useRouter();

  const draftConfirmModalControl = useVisibilityControl();
  const implementConfirmModalControl = useVisibilityControl();
  const implementCompleteConfirmModalControl = useVisibilityControl();

  const { data } = useSWR<MarketingActionRes>(
    marketingActionId ? ['/actions', marketingActionId] : null,
    () => MarketingActionApis.get(marketingActionId as string)
  );

  const saveAsDraftMethods = useForm();
  const suspendTemplateMethods = useForm();
  const implementTemplateMethods = useForm();

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
        flex_msg_image_ratio: '1:1',
      },
      mail_content: {
        color: '#55C5D9',
      },
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
        flex_msg_image_ratio: '1:1',
      },
      mail_content: {
        color: '#55C5D9',
      },
      report_period: StepMessageReportPeriod.MONTHLY,
      send_order: 2,
    },
  });
  const targetSettingsMethods = useForm({
    defaultValues: {
      target_segments: MarketingActionUtils.getTargetCustomers([
        TARGET.F0_MEMBER,
        TARGET.F1,
        TARGET.F2,
        TARGET.SEMI_LOYAL,
        TARGET.LOYAL,
        TARGET.F1_DORMANT,
        TARGET.LOYAL_DORMANT,
        TARGET.OTHER_DORMANT,
      ]),
      implementation_period_temp: [] as Date[],
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
      message1SettingsStepMethods.reset(
        data.settings?.step_messages?.[0] &&
          convertFromStepMessageRaw(data.settings.step_messages[0])
      );
      message2SettingsStepMethods.reset(
        data.settings?.step_messages?.[1] &&
          convertFromStepMessageRaw(data.settings.step_messages[1])
      );
      targetSettingsMethods.reset({
        target_segments: data.target_segments,
        implementation_period_temp:
          data.start_at && data.end_at ? [new Date(data.start_at), new Date(data.end_at)] : [],
      });
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
    const message1Settings = message1SettingsStepMethods.getValues() as StepMessage;
    const message2Settings = message2SettingsStepMethods.getValues() as StepMessage;
    const targetSettings = targetSettingsMethods.getValues();

    const data = {
      start_at: targetSettings.implementation_period_temp[0]?.toISOString(),
      end_at: targetSettings.implementation_period_temp[1]?.toISOString(),
      description: t('stepDeliveryAfterPurchase'),
      marketing_action_type_alias: 'AFTER_PURCHASE',
      status,
      settings: {
        ...lineUsageSettings,
        step_messages: [
          convertToStepMessageRaw(message1Settings),
          convertToStepMessageRaw(message2Settings),
        ],
      },
      ...targetSettings,
    };

    return data;
  };

  const handleSaveAsDraftClick = async () => {
    const { id } = await MarketingActionApis.create(assembleData(MarketingActionStatus.DRAFT));

    setNewMarketingActionId(id);

    draftConfirmModalControl.open();
  };

  const handleSuspendClick = async () => {
    await MarketingActionApis.update(
      marketingActionId as string,
      assembleData(MarketingActionStatus.SUSPEND)
    );

    push(getMyMarketingActionListHref());
  };

  const handleImplementClick = async () => {
    const newData = assembleData(MarketingActionStatus.RUNNING);

    if (isEditing) {
      await MarketingActionApis.update(marketingActionId as string, newData);

      push(getMyMarketingActionListHref({ marketingActionId: marketingActionId as string }));
    } else {
      const { id } = await MarketingActionApis.create(newData);

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

  React.useEffect(() => {
    if (isComplete) {
      tooltipControl.close();
    }
  }, [isComplete, tooltipControl]);

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
        }
      >
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
              })}
            >
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
        }
      >
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
              })}
            >
              <Modal.FooterButton
                colorScheme='negative'
                onClick={implementCompleteConfirmModalControl.close}
              >
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
            <Modal.FooterButton
              loading={implementTemplateMethods.formState.isSubmitting}
              complete={implementTemplateMethods.formState.isSubmitSuccessful}
              onClick={implementTemplateMethods.handleSubmit(handleImplementClick)}
            >
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
        flowImgUrl='/images/step-delivery-after-purchase-flow.png'
        targets={[TARGET.F1, TARGET.F2, TARGET.SEMI_LOYAL, TARGET.LOYAL_DORMANT]}
        output={t('messageDelivery')}
      ></ActionContainer>
      <Stepper className='mt-16'>
        <Stepper.Navigator />
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
      <div className='flex justify-center gap-5 mt-14'>
        {!isEditing ? (
          <Button
            className='w-[240px]'
            colorScheme='negative'
            onClick={saveAsDraftMethods.handleSubmit(handleSaveAsDraftClick)}
            loading={saveAsDraftMethods.formState.isSubmitting}
            complete={saveAsDraftMethods.formState.isSubmitSuccessful}
          >
            {t('saveDraft')}
          </Button>
        ) : (
          <Button
            className='w-[240px]'
            colorScheme='danger'
            onClick={suspendTemplateMethods.handleSubmit(handleSuspendClick)}
            loading={suspendTemplateMethods.formState.isSubmitting}
            complete={suspendTemplateMethods.formState.isSubmitSuccessful}
          >
            {t('suspendTemplate')}
          </Button>
        )}
        <div className='relative w-[480px]'>
          <ConfirmButtonTooltip control={tooltipControl}>
            <Trans
              i18nKey='implementTemplateTooltip'
              t={t}
              components={[
                <Icon
                  key='check'
                  name='check'
                  size={10}
                  className='p-1 text-primary inline-flex items-center justify-center w-5 h-5 mr-1 rounded-full bg-white'
                ></Icon>,
              ]}
            />
          </ConfirmButtonTooltip>
          <Button
            onClick={implementConfirmModalControl.open}
            className='relative w-full'
            disabled={!isComplete}
          >
            {t('implementTemplate')}
          </Button>
        </div>
      </div>
    </>
  );
};
