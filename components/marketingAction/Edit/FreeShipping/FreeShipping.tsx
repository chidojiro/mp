import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { ActionContainer } from '@/components/ActionContainer';
import { Step } from '@/constants';
import { useProfile, useVisibilityControl } from '@/hooks';
import {
  MarketingActionAlias,
  MarketingActionStatus,
  PopupSettingsData,
  TARGET,
  TargetCustomersData,
} from '@/types';
import { MarketingActionAPI } from '@/apis/marketing_actions';
import { TargetFilterUtils } from '@/utils/targetFilter';

import { Steppers } from '../Steppers';
import { TargetCustomerGroup } from '../TargetCustomerGroup';
import { PopupSettings } from './PopupSettings';
import { TemplatePreviewOverlay } from './TemplatePreviewOverlay';
import SavingActions from '../Steppers/SavingActions';

export const FreeShipping = () => {
  const { t } = useTranslation('marketingAction');
  const {
    push,
    query: { marketingActionId },
  } = useRouter();
  const [maId, setMaId] = useState('');
  const { data: marketingAction } = useSWR(
    marketingActionId ? ['/actions', marketingActionId] : null,
    () => MarketingActionAPI.get(marketingActionId as string)
  );
  const prepareData = (status: MarketingActionStatus) => {
    const _targetSegments = TargetFilterUtils.getTargetCustomers(
      targetCustomerMethods.getValues('target_customers')
    );

    const popupSettings = popupFormMethods.getValues();
    const data = {
      description: 'free_shipping',
      marketing_action_type: {
        alias: MarketingActionAlias.CONDITIONAL_FREE_SHIPPING,
      },
      status,
      settings: {
        ...popupSettings,
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
  const popupFormMethods = useForm<PopupSettingsData>({
    defaultValues: {
      template_selection: 'template2',
      free_shipping_amount: 5000,
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

  const isStepDone = (methods: any) => {
    return methods.formState.isSubmitSuccessful && !methods.formState.isDirty;
  };

  const isDone = isStepDone(popupFormMethods) && isStepDone(targetCustomerMethods);

  const chatPreviewControl = useVisibilityControl();

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      name: t('popupSettings'),
      children: <PopupSettings />,
      methods: popupFormMethods,
      showPreviewBtn: true,
    },
    {
      id: 2,
      name: t('targetSetting'),
      methods: targetCustomerMethods,
      children: <TargetCustomerGroup isNonMember={true} />,
    },
  ]);

  const onShowPreview = (stepId: number) => {
    chatPreviewControl.open();
  };

  const profile = useProfile();
  const handleCloseModal = () => {
    const gotoMyMAUrl = `/organizations/${profile.data?.organization_id}/projects/${
      profile.data?.project_id
    }/actions/${isDone ? 'active' : 'draft'}`;
    push(gotoMyMAUrl);
  };

  return (
    <div className='relative'>
      <ActionContainer
        showUseTemplateBtn={false}
        iconName='free-shipping'
        title={t('conditionalFreeShipping')}
        description={t('conditionalFreeShippingDescription')}
        descriptionImageUrl='/images/conditional-free-shipping-description.png'
      ></ActionContainer>
      <div className='mt-[60px]'>
        <Steppers steps={steps} onShowPreview={onShowPreview} />
        <SavingActions
          disable={!isDone}
          onSaveMarketingAction={handleSaveMA}
          onCloseModal={handleCloseModal}
          marketingActionName={t('conditionalFreeShipping')}
        />
      </div>
      <TemplatePreviewOverlay control={chatPreviewControl} />
    </div>
  );
};
