import { useTranslation } from 'next-i18next';

import { Answer, StepBlock, ChatWindowSettings } from '../StepBlock';

type Props = {
  settings: any;
};

export const RecommendDiagnosticBot = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');
  return (
    <>
      <StepBlock stepName={t('csvFileUpload')}>
        <Answer name={t('csvFileUpload')}>{settings.recommend_source}</Answer>
      </StepBlock>
      <ChatWindowSettings settings={settings} />
    </>
  );
};
