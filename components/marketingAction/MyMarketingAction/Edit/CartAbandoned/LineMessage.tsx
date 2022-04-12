import { useState } from 'react';

import { useTranslation } from 'next-i18next';

import { Button } from '@/components';
import { Message, MESSAGE_TYPE } from '@/constants';

import { LineMessageItem } from './LineMessageItem';

const MAX_MESSAGE = 5;

export const LineMessage = () => {
  const { t } = useTranslation('marketingAction');
  const [messages, setMessages] = useState<Message[]>([{ id: 0, type: MESSAGE_TYPE.TEXT }]);

  const addNewMessage = () => {
    setMessages(prevState => {
      return [...prevState, { id: prevState.length, type: MESSAGE_TYPE.TEXT }];
    });
  };

  const onChangeType = (id: number, value: MESSAGE_TYPE) => {
    setMessages(prevState => {
      return prevState.map(message => {
        return message.id === id ? { ...message, type: value } : message;
      });
    });
  };

  const allowAddingMsg = messages.length < MAX_MESSAGE;

  return (
    <div>
      {messages.map((message, idx) => (
        <LineMessageItem key={idx} message={message} handleChangeType={onChangeType} />
      ))}
      {allowAddingMsg && (
        <Button
          onClick={addNewMessage}
          colorScheme='secondary'
          variant='outline'
          className='w-full border-2'
        >
          <span className='mr-2 font-bold text-regular'>+</span>
          {t('addNewMessage')}
        </Button>
      )}
    </div>
  );
};
