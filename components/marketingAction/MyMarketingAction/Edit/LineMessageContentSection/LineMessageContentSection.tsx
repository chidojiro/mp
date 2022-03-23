import { Form, Icon, RadioGroup, Section } from '@/components';
import { useTranslation } from 'next-i18next';
import { MessageContentPreview } from '../MessageContentPreview';
import { useWatch } from 'react-hook-form';
import { MessageBodyInput } from '../MessageBodyInput';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  namePrefix: string;
  onPreviewClick: () => void;
};

// eslint-disable-next-line no-empty-pattern
export const LineMessageContentSection = ({ namePrefix, onPreviewClick }: Props) => {
  const { t } = useTranslation('marketingAction');

  const bodyName = [namePrefix, 'line.body'].join('.');

  const body = useWatch({ name: bodyName });

  return (
    <Section>
      <Section.Title>
        <Icon name='line' size={18} />
        {t('msgContentEmail')}
      </Section.Title>
      <Section.Description>{t('descriptionPlaceholder')}</Section.Description>

      <div className='flex gap-10'>
        <div className='flex-1'>
          <div>
            <p className='mb-2 text-secondary'>{t('textMessage')}</p>
            <Form.RadioGroup name='useLine' rules={{ required: true }}>
              <div className='flex flex-col gap-2'>
                <RadioGroup.Option colorScheme='secondary' label={t('displayMsg')} value='true' />
                <RadioGroup.Option colorScheme='secondary' label={t('noDisplay')} value='false' />
              </div>
            </Form.RadioGroup>
          </div>
          <MessageBodyInput name={bodyName} showEmoji={false} />
        </div>
        <MessageContentPreview type='line' body={body} onPreviewClick={onPreviewClick} />
      </div>
    </Section>
  );
};
