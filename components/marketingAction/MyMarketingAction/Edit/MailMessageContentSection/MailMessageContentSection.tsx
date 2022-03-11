import { Form, Icon, Section } from '@/components';
import { useTranslation } from 'next-i18next';
import { VariableSign } from '../VariableSign';
import { MessageContentPreview } from '../MessageContentPreview';
import { useWatch } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  namePrefix: string;
  onPreviewClick: () => void;
};

// eslint-disable-next-line no-empty-pattern
export const MailMessageContentSection = ({ namePrefix, onPreviewClick }: Props) => {
  const { t } = useTranslation('marketingAction');

  const headlineName = [namePrefix, 'mail.headline'].join('.');
  const bodyName = [namePrefix, 'mail.body'].join('.');

  const headline = useWatch({ name: headlineName });
  const body = useWatch({ name: bodyName });

  return (
    <Section>
      <Section.Title>
        <Icon name='mail' size={18} />
        {t('msgContentEmail')}
      </Section.Title>
      <Section.Description>{t('descriptionPlaceholder')}</Section.Description>
      <div className='flex gap-10'>
        <div className='flex-1'>
          <Form.TextArea
            name={headlineName}
            label={<span className='text-secondary text-medium'>{t('headLines')}</span>}
            rules={{ required: true }}
          />
          <Form.Mentions
            options={[{ label: t('brandName'), value: 'brandName' }]}
            name={bodyName}
            className='mt-5'
            label={
              <div>
                <span className='text-secondary text-medium'>{t('bodyText')}</span>
                <VariableSign className='mt-2' />
              </div>
            }
            rules={{ required: true }}
          />
        </div>
        <MessageContentPreview body={body} headline={headline} onPreviewClick={onPreviewClick} />
      </div>
    </Section>
  );
};
