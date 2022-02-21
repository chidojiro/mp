import { ChevronRightIcon } from '@heroicons/react/outline';
import { Button } from '../common';
import { Icon } from '../Icon';

type Props = {
  className?: string;
};

export const MarketingActionItem = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className='border rounded border-gray'>
        <div className='p-10'>
          <div className='flex items-center'>
            <Icon name='cart' className='w-14 h-14' />
            <h3 className='font-bold ml-7 text-gray-dark'>カゴ落ち通知</h3>
            <div className='flex items-center p-3 font-semibold text-white rounded-full bg-secondary text-medium'>
              <Icon name='repeat' className='w-4 h-4' />
              <span className='mx-2 '>ただいま実施中: </span>
            </div>
          </div>
          <div className='flex justify-between mt-7'>
            <div className='flex-1'>
              <div className='whitespace-pre-line text-gray-dark'>
                カゴ落ち（カート落ち）率の平均は、69.2%と言われています。カゴ落ち顧客は「サイト流入・サイト回遊・検討・カートへ追加」という購入ステップを実施しており、この顧客は購入の見込みは非常に高いと考えられます。そのため、集客を増やす施策を行うよりも、カゴ落ち顧客へ通知を送信する方が、売上アップへの工数対効果が高まります。
              </div>
              <div className='mt-8'>
                <div className='mr-7'>
                  <span className='font-bold text-secondary'>優先度</span>
                  <span className='px-2 py-1 ml-3 font-semibold text-gray-600 bg-gray-200 rounded-full text-medium-sm'>
                    LINE・メール
                  </span>
                </div>
              </div>
              <div className='mt-4'>
                <span className='font-bold text-secondary'>おすすめ顧客</span>
                <span className='px-2 py-1 ml-3 font-semibold text-gray-600 bg-gray-200 rounded-full text-medium-sm'>
                  F0(会員)
                </span>
              </div>
              <div className='mt-4'>
                <div className='font-bold text-secondary mb-3.5'>施策フロー</div>
                <div className='p-10 rounded bg-gray-light'>
                  <div>Diagram</div>
                </div>
              </div>
            </div>
            <div className='ml-10 bg-secondary w-60 h-60 opacity-10'></div>
          </div>
          <div className='flex justify-center w-full mt-7'>
            <Button className='font-semibold w-[350px]'>この施策を実行する</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
