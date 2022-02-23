import { Form, ImageUploader } from '@/components';
import { Select } from '@/components/common/fields/Select';
import { Message, MESSAGE_TYPE } from '@/constants';
import { useTranslation } from 'next-i18next';

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
      <Form.TextArea name={`line_message.${message.id}`} />
    );
  };

  const onChangeType = (value: string) => {
    handleChangeType?.(message.id, value as MESSAGE_TYPE);
  };

  const getSelectBox = () => {
    const selectBox = Object.keys(messageTypes).map((optionItem: any) => {
      return { value: optionItem, label: messageTypes[optionItem] };
    });

    return <Select options={selectBox} onChange={onChangeType} />;
  };

  return (
    <div className='mb-5'>
      <div className='mb-1 font-semibold text-medium text-secondary'>{t('lineMsg', { number: message.id + 1 })}</div>
      <div className='mb-2.5 flex'>
        <div>{getSelectBox()}</div>
        <div></div>
      </div>
      <div>{renderMessageContent()}</div>
    </div>
  );
};
