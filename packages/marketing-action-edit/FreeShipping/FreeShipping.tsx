import { useProfile } from '@/auth/useProfile';
import { useVisibilityControl } from '@/common/useVisibilityControl';
import { ActionContainer } from '@/marketing-action/ActionContainer';
import { MarketingActionUtils } from '@/marketing-action/utils';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Steppers } from '../Steppers';
import SavingActions from '../Steppers/SavingActions';
import { TargetCustomerGroup } from '../TargetCustomerGroup';
import { PopupSettings } from './PopupSettings';
import { TemplatePreviewOverlay } from './TemplatePreviewOverlay';
import { MarketingActionStatus } from '@/marketing-action/types';
import { MarketingActionAlias } from '@/marketing-action/types';
import { TARGET } from '@/marketing-action/types';
import { MarketingActionRes } from '@/marketing-action/types';
import { PopupSettingsData } from '@/marketing-action/types';
import { TargetCustomersData } from '@/marketing-action/types';
import { MarketingActionApis } from '@/marketing-action/apis';
import { Step } from '@/marketing-action/constants';

const defaultStepConfirmedFlags = [false, false];

export const FreeShipping = () => {
  const { t } = useTranslation('marketingAction');
  const [freeShipAmount, setFreeShipAmount] = useState('');
  const [templateSelection, setTemplateSelection] = useState('');
  const {
    push,
    query: { marketingActionId },
  } = useRouter();

  // TODO: get latest data of current action from API
  const [maId, setMaId] = useState('');
  const { data: marketingAction } = useSWR(
    marketingActionId ? ['/actions', marketingActionId] : null,
    () => MarketingActionApis.get(marketingActionId as string)
  );

  const [stepConfirmedFlags, setStepConfirmedFlags] =
    React.useState<boolean[]>(defaultStepConfirmedFlags);

  // Prepare data before post
  const prepareData = (status: MarketingActionStatus) => {
    const _targetSegments = MarketingActionUtils.getTargetCustomers(
      targetCustomerMethods.getValues('target_customers')
    );

    const popupSettings = popupFormMethods.getValues();
    const data = {
      start_at: new Date().toISOString(), // TODO will remove once BE is update
      description: t('conditionalFreeShipping'),
      marketing_action_type_alias: MarketingActionAlias.CONDITIONAL_FREE_SHIPPING,
      status,
      settings: {
        ...popupSettings,
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
  const popupFormMethods = useForm<PopupSettingsData>({
    defaultValues: {
      template_selection: 'template1',
      free_shipping_amount: 5000,
      target_url: '',
      is_open_new_tab: true,
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

  const targetCustomerMethods = useForm<TargetCustomersData>({
    defaultValues: {
      target_customers: [
        TARGET.F0_MEMBER,
        TARGET.F0_OTHERS,
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

  const isDone = stepConfirmedFlags.every(Boolean);

  const chatPreviewControl = useVisibilityControl();

  const passData = (amount: any) => {
    setFreeShipAmount(amount);
  };

  const passTemplateSelection = (selection: any) => {
    setTemplateSelection(selection.target.value);
  };

  const onShowPreview = () => {
    chatPreviewControl.open();
  };

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      name: t('popupSettings'),
      children: (
        <PopupSettings
          passData={() => passData}
          passTemplateSelection={() => passTemplateSelection}
          onShowPreview={onShowPreview}
        />
      ),
      methods: popupFormMethods,
    },
    {
      id: 2,
      name: t('targetSetting'),
      methods: targetCustomerMethods,
      children: <TargetCustomerGroup isNonMember={true} />,
    },
  ]);

  const profile = useProfile();
  const handleCloseModal = () => {
    const gotoMyMAUrl = `/organizations/${profile.data?.organization_id}/projects/${
      profile.data?.project_id
    }/actions/${isDone ? 'active' : 'draft'}`;
    push(gotoMyMAUrl);
  };

  const handleConfirmChanged = (index: number, confirmed: boolean) => {
    setStepConfirmedFlags(prev => {
      const _steps = [...prev];
      _steps[index] = confirmed;
      return _steps;
    });
  };

  const resetData = useCallback(
    (marketingAction: MarketingActionRes) => {
      const settings = marketingAction?.settings;

      popupFormMethods.reset({
        template_selection: settings?.template_selection,
        free_shipping_amount: settings?.free_shipping_amount,
        target_url: settings?.target_url,
        is_open_new_tab: settings?.is_open_new_tab,
        display_settings_pc: {
          appear_time: settings?.display_settings_pc?.appear_time,
          position: settings?.display_settings_pc?.position,
          position_close_box: settings?.display_settings_pc?.position_close_box,
          position_close_box_unit: settings?.display_settings_pc?.position_close_box_unit,
        },
        display_settings_mobile: {
          appear_time: settings?.display_settings_mobile?.appear_time,
          position: settings?.display_settings_mobile?.position,
          position_close_box: settings?.display_settings_mobile?.position_close_box,
          position_close_box_unit: settings?.display_settings_mobile?.position_close_box_unit,
        },
      });

      const _targetSegments = MarketingActionUtils.getTargetFilters(
        marketingAction.target_segments
      );

      targetCustomerMethods.reset({ target_customers: _targetSegments || [] });

      settings?.free_shipping_amount
        ? setFreeShipAmount(settings?.free_shipping_amount.toString())
        : '';

      settings?.template_selection ? setTemplateSelection(settings?.template_selection) : '';

      setStepConfirmedFlags(settings?.steps_confirmed_flag ?? defaultStepConfirmedFlags);
    },
    [popupFormMethods, targetCustomerMethods]
  );

  useEffect(() => {
    if (marketingAction) {
      resetData(marketingAction);
    }
  }, [marketingAction, resetData]);

  return (
    <div className='relative'>
      <ActionContainer
        showUseTemplateBtn={false}
        iconName='free-shipping'
        title={t('conditionalFreeShipping')}
        description={t('conditionalFreeShippingDescription')}
        descriptionImageUrl='/images/conditional-free-shipping-description.png'
        output={t('popup')}
        appearance={t('cart')}
      ></ActionContainer>
      <div className='mt-[60px]'>
        <Steppers
          steps={steps}
          onShowPreview={onShowPreview}
          confirmedSteps={stepConfirmedFlags}
          onConfirmChanged={handleConfirmChanged}
        />
        <SavingActions
          disable={!isDone}
          onSaveMarketingAction={handleSaveMA}
          onCloseModal={handleCloseModal}
          marketingActionName={t('conditionalFreeShipping')}
        />
      </div>
      <TemplatePreviewOverlay
        control={chatPreviewControl}
        freeShippingCost={freeShipAmount}
        templateSelection={templateSelection}
      />
    </div>
  );
};
