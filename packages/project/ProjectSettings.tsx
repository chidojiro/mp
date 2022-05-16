import { useCallback, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { convertToRaw, EditorState } from 'draft-js';
import { omitBy } from 'lodash-es';
import { useForm } from 'react-hook-form';

import { AssetApis } from '@/assets/apis';
import { AssetResourceType } from '@/assets/types';
import { Button } from '@/common/Button';
import { Form } from '@/common/Form';
import { convertToEditorState } from '@/marketing-action-edit/utils';
import { ProjectApis } from '@/project/apis';
import { ProjectData, ProjectSettingData } from './types';

import { AdvancedSettings } from './AdvancedSettings';
import { BasicInformation } from './BasicInformation';
import { EmailSettings } from './EmailSettings';
import { SnsSettings } from './SnsSettings';
import { UrlSettings } from './UrlSettings';
import { useProject } from './useProject';

export const ProjectSettings = () => {
  const { t } = useTranslation('settings');

  const { data } = useProject();

  const methods = useForm<ProjectSettingData>({
    defaultValues: { const_r_rfm: 180, const_f_loyal: 5, const_m_loyal: 30000 },
  });
  const {
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const resetData = useCallback(
    (data: ProjectData) => {
      reset({
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
    [reset]
  );
  useEffect(() => {
    if (data) {
      resetData(data);
    }
  }, [data, resetData]);

  const onSubmit = async (data: ProjectSettingData & { brand_logo_temp: File }) => {
    const { path } = await AssetApis.create(
      data.brand_logo_temp,
      AssetResourceType.project,
      undefined,
      {
        acl: 'public',
      }
    );
    // const brandLogoResponse = data.brand_logo_temp
    //   ? await RestUtils.poll({
    //       api: () => AssetApis.get(id),
    //       until: data => data.status === 'completed',
    //     })
    //   : undefined;

    const payload = {
      ...data,
      brand_logo: path,
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
      await ProjectApis.update(omitBy(payload, v => !v));
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
      <Button
        type='submit'
        loading={isSubmitting}
        complete={isSubmitSuccessful}
        className='!block mx-auto w-[480px] mt-[60px]'
      >
        {t('save')}
      </Button>
    </Form>
  );
};
