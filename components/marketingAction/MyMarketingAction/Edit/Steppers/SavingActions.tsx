import { Button, Modal } from '@/components/common';
import { useVisibilityControl } from '@/hooks';
import { MarketingActionStatus } from '@/types';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Props = {
  disable: boolean;
  marketingActionName: string;
  onSaveMarketingAction: (status: MarketingActionStatus) => void;
};

const SavingActions = ({ disable, marketingActionName, onSaveMarketingAction }: Props) => {
  const { t } = useTranslation('marketingAction');
  const modalControl = useVisibilityControl();
  const {
    query: { marketingActionId },
  } = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaveAsDraft, setIsSaveAsDraft] = useState(false);

  const showModal = () => {
    setIsCompleted(false);
    setIsSaveAsDraft(false);
    modalControl.open();
  };

  const onExecuteMA = async () => {
    await onSaveMarketingAction(MarketingActionStatus.RUNNING);
    setIsCompleted(true);
  };

  const onSaveAsDraft = async () => {
    await onSaveMarketingAction(MarketingActionStatus.DRAFT);
    setIsCompleted(false);
    setIsSaveAsDraft(true);
    modalControl.open();
  };

  const onSuspend = () => {
    onSaveMarketingAction(MarketingActionStatus.SUSPEND);
  };

  const modalDesc = () => {
    let desc = 'executeTemplate';
    if (isSaveAsDraft) {
      desc = 'alertAfterSaveAsDraft';
    } else if (isCompleted) {
      desc = 'alertAfterExecuting';
    }
    return t(desc, { template: marketingActionName });
  };

  const isGotoMABtn = isCompleted || isSaveAsDraft;
  const gotoMyMAUrl = `/organizations/1/projects/1/actions/${
    isCompleted ? 'running' : 'draft'
  }/${marketingActionId}?target=all`;

  return (
    <>
      <div className='flex justify-center mt-10'>
        {marketingActionId ? (
          <>
            <Button
              colorScheme='negative'
              onClick={onSuspend}
              className='mr-5 min-w-[240px] h-[52px]  bg-[#FF7F5C]'
            >
              {t('suspendTemplate')}
            </Button>
            <Button onClick={onExecuteMA} className='min-w-[480px] h-[52px]'>
              {t('save')}
            </Button>
          </>
        ) : (
          <>
            <Button
              colorScheme='negative'
              onClick={onSaveAsDraft}
              className='mr-5 min-w-[240px] h-[52px]'
            >
              {t('saveDraft')}
            </Button>
            <Button onClick={showModal} className='min-w-[480px] h-[52px]' disabled={disable}>
              {t('implementTemplate')}
            </Button>
          </>
        )}
      </div>

      <Modal control={modalControl}>
        <div className='text-center text-gray-dark'>
          <Modal.Body className='leading-loose whitespace-pre-line'>{modalDesc()}</Modal.Body>
          <Modal.Footer className='text-medium'>
            {isGotoMABtn ? (
              <Link passHref href={gotoMyMAUrl}>
                <Modal.FooterButton colorScheme='negative' onClick={modalControl.close}>
                  {t('gotoMyMA')}
                </Modal.FooterButton>
              </Link>
            ) : (
              <>
                <Modal.FooterButton colorScheme='negative' onClick={modalControl.close}>
                  {t('cancel')}
                </Modal.FooterButton>
                <Modal.FooterButton onClick={onExecuteMA}>
                  {t('implementTemplate')}
                </Modal.FooterButton>
              </>
            )}
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default SavingActions;
