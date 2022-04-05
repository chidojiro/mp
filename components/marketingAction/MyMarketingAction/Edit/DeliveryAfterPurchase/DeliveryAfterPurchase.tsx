import React from 'react';

import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

import { Button, DeliveryAfterPurchaseOverview, Form, Stepper } from '@/components';
import { useVisibilityControl } from '@/hooks';

import { LineUsageSection } from '../LineUsageSection';
import { LineUsageSettingsStep } from './LineUsageSettingsStep';
import { Message1SettingsStep } from './Message1SettingsStep';
import { Message2SettingsStep } from './Message2SettingsStep';
import { TargetSettingsStep } from './TargetSettingsStep';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const DeliveryAfterPurchase = ({}: Props) => {
  const { t } = useTranslation('marketingAction');

  const methods = useForm();

  return (
    <Form methods={methods}>
      <DeliveryAfterPurchaseOverview showUseTemplateBtn={false} />
      <Stepper className='mt-16'>
        <LineUsageSettingsStep />
        <Message1SettingsStep />
        <Message2SettingsStep />
        <TargetSettingsStep />
      </Stepper>
      <div className='flex justify-center gap-5 mt-10'>
        <Button className='w-[240px]' colorScheme='danger' onClick={console.log}>
          {t('saveDraft')}
        </Button>
        <Button colorScheme='negative' className='w-[240px]'>
          {t('stopEditing')}
        </Button>
        <Button onClick={console.log} className='w-[480px]'>
          {t('implementTemplate')}
        </Button>
      </div>
    </Form>
  );
};
