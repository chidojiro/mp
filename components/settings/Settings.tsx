import { useCallback, useEffect } from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { ProjectApis } from '@/apis';
import { ProjectData, ProjectSettingData } from '@/types';

import { Button } from '../common/Button';
import { Form } from '../common/Form';
import { AdvancedSettings } from './AdvancedSettings';
import { BasicInformation } from './BasicInformation';
import { EmailSettings } from './EmailSettings';
import { SnsSettings } from './SnsSettings';
import { UrlSettings } from './UrlSettings';

export const Settings = () => {
  const { t } = useTranslation('settings');
  const {
    query: { projectId },
  } = useRouter();
  const { data } = useSWR([`/projects/${projectId}`, projectId], () =>
    ProjectApis.get(projectId as string)
  );
  const methods = useForm<ProjectSettingData>({
    defaultValues: { const_r_rfm: 180, const_f_loyal: 5, const_m_loyal: 30000 },
  });

  const resetData = useCallback(
    (data: ProjectData) => {
      methods.reset({
        id: data.id,
        ...data.settings,
      });
    },
    [methods]
  );
  useEffect(() => {
    if (data) {
      resetData(data);
    }
  }, [data]);
  const onSubmit = async (data: ProjectSettingData) => {
    console.log('data:', data);
    try {
      await ProjectApis.updateSetting(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <div className='space-y-8'>
        <BasicInformation />
        <UrlSettings />
        <SnsSettings />
        <EmailSettings />
        <AdvancedSettings />
      </div>
      <input type='hidden' {...methods.register('id')} />
      <Button type='submit' className='!block mx-auto w-[480px] mt-[60px]'>
        {t('save')}
      </Button>
    </Form>
  );
};
