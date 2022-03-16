import { Button } from '@/components/common';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Action } from './Action';
import { StepDelivery } from './StepDelivery';

export type MarketingAction = {
  id?: string;
  name: string;
  icon?: string;
};

export const MarketingAction = () => {
  const { t } = useTranslation('marketingAction');
  const { t: tCommon } = useTranslation('common');

  // example marketing action
  const marketingAction = {
    name: 'cart-abandoned',
    targetCustomers: [
      tCommon('f0member'),
      'F1',
      'F2',
      tCommon('semiLoyal'),
      tCommon('loyal'),
      tCommon('f1dormant'),
      tCommon('loyalDormant'),
    ],
    date: '2022年12月15日(水) 〜',
    settings: [
      {
        name: t('useLine'),
        questions: [{ question: t('useLine'), answer: t('lineOption') }],
      },
      {
        name: t('msgSetting1'),
        showPreview: true,
        questions: [
          { question: t('timeDelivery'), answer: 'カゴ落ち発生日から3日後の午後 12:00' },
          {
            question: t('msgContentEmail'),
            answers: [
              { question: t('headLines'), response: 'お買い忘れはございませんか？' },
              {
                question: t('bodyText'),
                response:
                  'いつも<span class="highlight">ブランド名</span>をご利用いただきありがとうございます。以下の商品がショッピングカートに保存されたままになっています。売り切れになってしまう前に、ぜひ購入をご検討くださいませ。',
              },
            ],
          },
          { question: t('colorSettings'), answer: 'スカイブルー', color: '#55C5D9' },
        ],
      },
      {
        name: t('msgSetting2'),
        showPreview: true,
        questions: [
          { question: t('msg2Option'), answer: '2通目を配信する' },
          { question: t('contentHasChanged'), answer: '1通目と同内容のメッセージを配信する' },
          { question: t('timeDelivery'), answer: '1通目配信日から3日後の午後 12:00' },
        ],
      },
      {
        name: t('targetSetting'),
        questions: [{ question: t('targetCustomer'), answer: 'F0(会員)' }],
      },
    ],
  };
  return (
    <div>
      <div className='h-full border rounded-lg border-gray'>
        <Action
          name={marketingAction.name}
          targetCustomers={marketingAction.targetCustomers}
          date={marketingAction.date}
        />
        <StepDelivery steps={marketingAction.settings} />
      </div>
      <div className='flex justify-center pt-10'>
        <Button className='mr-5 min-w-[240px] bg-[#FF7F5C]'>{t('suspendTemplate')}</Button>
        <Link passHref href={`/organizations/1/projects/1/actions/edit/${marketingAction.name}`}>
          <Button colorScheme='negative' className='mr-5 min-w-[240px]'>
            {t('editInEditor')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
