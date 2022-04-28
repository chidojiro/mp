import { useTranslation } from 'next-i18next';

import { StepBlock, ChatWindowSettings } from '../StepBlock';
import UploadMessage from '../StepBlock/UploadMessage';

type Props = {
  settings: any;
};

export const RecommendDiagnosticBot = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <>
      <StepBlock stepName={t('csvFileUpload')}>
        <UploadMessage sourceId={settings?.recommend_source} />
      </StepBlock>
      <ChatWindowSettings settings={settings} />
    </>
  );
};
