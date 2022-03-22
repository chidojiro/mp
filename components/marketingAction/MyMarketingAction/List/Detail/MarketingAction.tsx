import { Button } from '@/components/common';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

  const {
    query: { date, marketingActionId },
  } = useRouter();

  // example marketing action
  const marketingActions: any[] = [
    {
      value: '1',
      date: 'all',
      label: t('cartAbandoned'),
      date_range: '2022年12月15日(水) 〜 2022年12月25日(金)',
    },
    {
      value: '2',
      date: '2021_12_15',
      label: t('stepDeliveryAfterPurchase'),
      date_range: '2022年12月15日(水) 〜',
    },
    {
      value: '2',
      date: '2021_11_09',
      label: t('stepDeliveryAfterPurchase'),
      date_range: '2022年11月09日(月) 〜',
    },
    {
      value: '3',
      date: 'all',
      label: t('recommendationDiagnosisBotStatic'),
      date_range: '2022年12月15日(水) 〜 2022年12月25日(金)',
    },
    {
      value: '4',
      date: 'all',
      label: t('conditionalFreeShipping'),
      date_range: '2022年12月15日(水) 〜 2022年12月25日(金)',
    },
  ];
  const marketingActionDetail = {
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

  const marketingAction = marketingActions.filter(
    ma => ma.value === marketingActionId && ma.date === date
  )[0];
  return (
    <div>
      <div className='h-full border rounded-lg border-gray'>
        <Action
          path={marketingActionDetail.name}
          name={marketingAction?.label}
          targetCustomers={marketingActionDetail.targetCustomers}
          date={marketingAction?.date_range}
        />
        <StepDelivery steps={marketingActionDetail.settings} />
      </div>
      <div className='flex justify-center pt-10'>
        <Button className='mr-5 min-w-[240px] bg-[#FF7F5C]'>{t('suspendTemplate')}</Button>
        <Link
          passHref
          href={`/organizations/1/projects/1/actions/edit/${marketingActionDetail.name}`}
        >
          <Button colorScheme='negative' className='mr-5 min-w-[240px]'>
            {t('editInEditor')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
