import { useCallback, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { convertToRaw, EditorState } from 'draft-js';
import { useForm } from 'react-hook-form';

import { ProjectApis } from '@/apis';
import { convertToEditorState } from '@/components/marketingAction/Edit/utils';
import { useProject } from '@/project';
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

  const { data } = useProject();

  const methods = useForm<ProjectSettingData>({
    defaultValues: { const_r_rfm: 180, const_f_loyal: 5, const_m_loyal: 30000 },
  });

  const resetData = useCallback(
    (data: ProjectData) => {
      methods.reset({
        id: data.id,
        ...data.settings,
        email_footer_draft_raw: convertToEditorState(
          data.settings.email_footer_draft_raw as string
        ),
        email_signature_draft_raw: convertToEditorState(
          data.settings.email_signature_draft_raw as string
        ),
      });
    },
    [methods]
  );
  useEffect(() => {
    if (data) {
      resetData(data);
    }
  }, [data, resetData]);

  const onSubmit = async (data: ProjectSettingData) => {
    const payload = {
      ...data,
      email_footer_draft_raw:
        data.email_footer_draft_raw &&
        JSON.stringify(
          convertToRaw((data.email_footer_draft_raw as EditorState).getCurrentContent())
        ),
      email_signature_draft_raw:
        data.email_signature_draft_raw &&
        JSON.stringify(
          convertToRaw((data.email_signature_draft_raw as EditorState).getCurrentContent())
        ),
    };

    try {
      await ProjectApis.update(payload);
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
      <Button type='submit' className='!block mx-auto w-[480px] mt-[60px]'>
        {t('save')}
      </Button>
    </Form>
  );
};
