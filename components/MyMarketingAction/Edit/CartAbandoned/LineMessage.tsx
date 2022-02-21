import { Button, Form } from '@/components';
import { ImageUploader } from '@/components';
import { Message, MESSAGE_TYPE } from '@/constants';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const MAX_MESSAGE = 5;

export const LineMessage = () => {
  const { t } = useTranslation('marketingAction');

  const [messages, setMessages] = useState<Message[]>([{ type: MESSAGE_TYPE.TEXT }]);

  const messageTypes = {
    text: t('textMessage'),
    image: t('imageMessage'),
  };

  const addNewMessage = () => {
    setMessages(prevState => {
      return [...prevState, { type: MESSAGE_TYPE.TEXT }];
    });
  };

  const renderMessageContent = (type: MESSAGE_TYPE, idx: number) => {
    return type === MESSAGE_TYPE.IMAGE ? <ImageUploader /> : <Form.TextArea name={`line_message.${idx}`} />;
  };

  const allowAddingMsg = messages.length < MAX_MESSAGE;

  return (
    <div>
      {messages.map((message, idx) => (
        <div className='mb-5' key={idx}>
          <div className='mb-1 font-semibold text-medium text-secondary'>{t('lineMsg', { number: idx + 1 })}</div>
          <div>selectbox here</div>
          <div>{renderMessageContent(message.type, idx)}</div>
        </div>
      ))}
      {allowAddingMsg && (
        <Button
          onClick={addNewMessage}
          colorScheme='default'
          variant='outline'
          className='w-full border-2 border-[#ffba00] text-[#ffba00]'>
          <span className='mr-2 text-regular'>+</span>
          {t('addNewMessage')}
        </Button>
      )}
    </div>
  );
};
