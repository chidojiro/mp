import { Button } from '@/components/common';
import { MarketingActionRes } from '@/types';
import { LanguageUtils, TargetFilterUtils } from '@/utils';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Action } from './Action';
import { StepDelivery } from './StepDelivery';

type Props = {
  marketingAction: MarketingActionRes;
};

export const MarketingAction = ({ marketingAction }: Props) => {
  const { t } = useTranslation('marketingAction');
  const { t: tCommon } = useTranslation('common');

  const { locale } = useRouter();

  const marketingActionDetail = {
    name: 'cart-abandoned',
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
              { question: t('headLines'), response: 'お買い忘れはございませんか？<br>' },
              {
                question: t('bodyText'),
                response:
                  'いつも<span class="caret-holder"></span><span class="mention-item" contenteditable="false" data-value="brandName">ブランド名</span>をご利用いただきありがとうございます。以下の商品がショッピングカートに保存されたままになっています。 売り切れになってしまう前に、是非購入をご検討くださいませ。<br>',
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
    ],
  };

  const getRange = () => {
    const _startAt = LanguageUtils.getDateFormat(marketingAction?.start_at, locale);
    const _endAt = marketingAction.end_at
      ? LanguageUtils.getDateFormat(marketingAction.end_at, locale)
      : '';
    return `${_startAt} 〜 ${_endAt}`;
  };

  const targetSettings = () => {
    return (
      marketingAction.target_segments
        ?.map(target => tCommon(TargetFilterUtils.getTargetValue(target)))
        .join(', ') || ''
    );
  };

  return (
    <div>
      <div className='h-full border rounded-lg border-gray'>
        <Action
          path={marketingActionDetail.name}
          name={marketingAction?.description || ''}
          targetCustomers={marketingAction.target_segments || []}
          date={getRange()}
        />
        <StepDelivery settings={marketingAction.settings} targetSettings={targetSettings()} />
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
