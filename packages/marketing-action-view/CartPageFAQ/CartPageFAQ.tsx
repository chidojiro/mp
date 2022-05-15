import { useTranslation } from 'next-i18next';

import { StepBlock } from '../StepBlock';
import { ChatWindowSettings } from '../StepBlock/ChatWindowSettings';
import UploadMessage from '../StepBlock/UploadMessage';

type Props = {
  settings: any;
};

export const CartPageFAQ = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <>
      <StepBlock stepName={t('faqContentCreation')}>
        <UploadMessage sourceId={settings?.faq_source} />
      </StepBlock>
      <ChatWindowSettings settings={settings} />
    </>
  );
};
