import { useTranslation } from 'next-i18next';

import { Answer, StepBlock } from '../StepBlock';
import { ChatWindowSettings } from '../StepBlock/ChatWindowSettings';

type Props = {
  settings: any;
};

export const CartPageFAQ = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <>
      <StepBlock stepName={t('faqContentCreation')}>
        <Answer name={t('updateCSV')}>{settings.faq_source}</Answer>
      </StepBlock>
      <ChatWindowSettings settings={settings} />
    </>
  );
};
