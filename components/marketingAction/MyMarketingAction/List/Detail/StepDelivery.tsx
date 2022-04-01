import { Button } from '@/components/common';
import { useVisibilityControl } from '@/hooks';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { PreviewOverlay } from '../../Edit/PreviewOverlay';
import style from './StepDelivery.module.css';

type Props = {
  steps: any[];
  targetSettings: string;
};

export const StepDelivery = ({ steps, targetSettings }: Props) => {
  const { t } = useTranslation('marketingAction');
  const previewMessageControl = useVisibilityControl();

  return (
    <div className='rounded-bl-lg rounded-br-lg bg-gray-light'>
      {steps.map((step, index) => (
        <div key={index} className='p-10 pb-6 border-b-4 border-white'>
          <h5 className='text-gray-dark'>{step.name}</h5>
          {step.questions.map((question: any, idx: number) => (
            <div className='text-medium' key={idx}>
              <div className='my-2 font-bold text-secondary'>{question.question}</div>
              <div className='mb-4 text-gray-dark'>
                {question.answer ? (
                  <div className='flex items-center'>
                    {!!question.color && (
                      <div className='w-[34px] h-[34px] p-1 mr-2 rounded flex items-center border bg-white border-input'>
                        <div
                          className={classNames('w-full h-full rounded ')}
                          style={{ backgroundColor: question.color }}
                        ></div>
                      </div>
                    )}
                    <span>{question.answer}</span>
                  </div>
                ) : (
                  question.answers?.map((answer: any, id: number) => (
                    <div className={classNames('mb-2', style['message-response'])} key={id}>
                      <div className='mb-2'>[{answer.question}]</div>
                      <div dangerouslySetInnerHTML={{ __html: answer.response }}></div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
          {step.showPreview && (
            <div className='text-center'>
              <Button
                colorScheme='negative'
                className=' w-[240px]'
                onClick={previewMessageControl.open}
              >
                {t('viewPreview')}
              </Button>
            </div>
          )}
        </div>
      ))}
      <div className='p-10 pb-6'>
        <h5 className='text-gray-dark'>{t('targetSetting')}</h5>
        <div className='my-2 font-bold text-medium text-secondary'>{t('targetCustomer')}</div>
        <div className='mb-4 text-medium text-gray-dark'>{targetSettings}</div>
      </div>
      <PreviewOverlay
        defaultType='mail'
        mailHeadline='お買い忘れはございませんか？<br>'
        mailBody='いつも<span class="caret-holder"></span><span class="mention-item" contenteditable="false" data-value="brandName">ブランド名</span>をご利用いただきありがとうございます。以下の商品がショッピングカートに保存されたままになっています。 売り切れになってしまう前に、是非購入をご検討くださいませ。<br>'
        lineBody='いつも<span class="caret-holder"></span><span class="mention-item" contenteditable="false" data-value="brandName">ブランド名</span>をご利用いただきありがとうございます。以下の商品がショッピングカートに保存されたままになっています。 売り切れになってしまう前に、是非購入をご検討くださいませ。<br>'
        control={previewMessageControl}
      />
    </div>
  );
};
