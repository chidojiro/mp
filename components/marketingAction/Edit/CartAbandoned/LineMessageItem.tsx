import { useTranslation } from 'next-i18next';

import { Form } from '@/components/common';
import { ImageUploader } from '@/components/ImageUploader';
import { Message, MESSAGE_TYPE } from '@/constants';

type Props = {
  message: Message;
  handleChangeType: (id: number, value: MESSAGE_TYPE) => void;
};
export const LineMessageItem = ({ message, handleChangeType }: Props) => {
  const { t } = useTranslation('marketingAction');

  const messageTypes: any = {
    text: t('textMessage'),
    image: t('imageMessage'),
  };

  const renderMessageContent = () => {
    return message.type === MESSAGE_TYPE.IMAGE ? (
      <ImageUploader />
    ) : (
      <Form.TextArea name={`line_message_${message.id}`} />
    );
  };

  const onChangeType = (value: string) => {
    handleChangeType?.(message.id, value as MESSAGE_TYPE);
  };

  const getSelectBox = () => {
    const selectBox = Object.keys(messageTypes).map((optionItem: any) => {
      return { value: optionItem, label: messageTypes[optionItem] };
    });

    return (
      <Form.Select
        defaultValue={selectBox[0].value}
        name={`type_line_${message.id}`}
        options={selectBox}
        onChange={onChangeType}
      />
    );
  };

  return (
    <div className='mb-5'>
      <div className='mb-1 font-semibold text-medium text-secondary'>
        {t('lineMsg', { number: message.id + 1 })}
      </div>
      <div className='mb-2.5'>{getSelectBox()}</div>
      <div>{renderMessageContent()}</div>
    </div>
  );
};
