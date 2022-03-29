import { useTranslation } from 'next-i18next';
import { Appearance } from './Appearance';
import { AppearanceCond } from './AppearanceCond';

export const ChatWindowSettings = () => {
  const { t } = useTranslation('marketingAction');
  return (
    <>
      <div className='px-10 pb-5 -mx-10 text-gray-700 border-b-4 border-white text-medium'>
        {t('configChatbotText')}
      </div>
      <Appearance />
      <AppearanceCond />
    </>
  );
};
