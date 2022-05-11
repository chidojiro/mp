import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { Icon } from '@/components/common';

//example test message
const productsCarousel: any[] = [];
productsCarousel.push({
  image: '/images/product_example1.png',
  id: 1,
  name: '【第1位】ブルーベリーケーキ　6個セット',
  description: 'ここに商品説明が入ります。ここに商品説明が入ります。ここに商品説明が入ります。',
});
productsCarousel.push({
  image: '/images/product_example2.png',
  id: 2,
  name: '【第1位】マカロン　ローズ　24個セット',
  description: 'ここに商品説明が入ります。ここに商品説明が入ります。ここに商品説明が入ります。',
});
productsCarousel.push({
  image: '/images/product_example1.png',
  id: 3,
  name: '【第3位】ブルーベリーケーキ　6個セット',
  description: 'ここに商品説明が入ります。ここに商品説明が入ります。ここに商品説明が入ります。',
});

type Props = {
  isCarousel?: boolean;
};

export const Message = ({ isCarousel }: Props) => {
  const products = isCarousel ? productsCarousel : productsCarousel.slice(0, 1);

  const ref = useRef<HTMLDivElement>(null);
  const [currentListIdx, setCurrentListIdx] = useState(0);

  useEffect(() => {
    if (ref?.current) {
      ref!.current!.style.transform = `translateX(-${currentListIdx * 100}%)`;
    }
  }, [currentListIdx]);

  const isPrev = currentListIdx > 0;
  const isNext = currentListIdx < products.length - 1;

  const showPrev = () => {
    isPrev && setCurrentListIdx(prevState => prevState - 1);
  };
  const showNext = () => {
    isNext && setCurrentListIdx(prevState => prevState + 1);
  };

  return (
    <>
      {isCarousel && (
        <div className='absolute z-10 w-[inherit] top-[100px] flex justify-between'>
          <div
            onClick={showPrev}
            className={classNames(
              'cursor-pointer rounded-r-lg px-[7px] py-[35px] bg-gray-dark',
              isPrev ? 'opacity-[0.79] ' : 'opacity-0'
            )}
          >
            <Icon name='chevron-left' size={20} />
          </div>
          <div
            onClick={showNext}
            className={classNames(
              'cursor-pointer rounded-l-lg px-[7px] py-[35px] bg-gray-dark',
              isNext ? 'opacity-[0.79] ' : 'opacity-0'
            )}
          >
            <Icon name='chevron-left' className='rotate-180' size={20} />
          </div>
        </div>
      )}
      <div className='pt-3 px-[30px]'>
        <div className='flex-1 w-full h-full p-4 overflow-hidden'>
          <div
            className='flex flex-1 w-full h-full transition-transform duration-300 ease-linear'
            ref={ref}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className={classNames(
                  'flex-shrink-0 w-full h-full overflow-auto rounded-lg text-[#222222] shadow-[0px_0px_6px_0px_#0000004D]',
                  {
                    'opacity-0': currentListIdx !== +index,
                    'opacity-100': currentListIdx === +index,
                  }
                )}
              >
                <div className='p-5 leading-relaxed border-b-2 border-dark-gray'>
                  <img src={product.image} className='w-full h-[170px]' alt='' />
                  <div className='pt-4 text-[15px] font-bold '>{product.name}</div>
                  <div className='text-medium-sm'>{product.description}</div>
                </div>
                <div className='flex justify-between p-3'>
                  <span className='text-regular-sm'>詳細を見る</span>
                  <Icon name='chevron-right-circle' className='w-6 h-6' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
