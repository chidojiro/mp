import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

import { useHrefs } from '@/navigation/useHrefs';
import { Button } from '@/common/Button';
import { Modal } from '@/common/Modal';
import { useVisibilityControl } from '@/common/useVisibilityControl';
import { useProfile } from '@/auth/useProfile';
import { MarketingActionStatus } from '@/marketing-action/types';
import { ConfirmButton } from '@/marketing-action-edit/ConfirmButton';
import { Icon } from '@/common/Icon';

type Props = {
  disable: boolean;
  marketingActionName: string;
  onSaveMarketingAction: (status: MarketingActionStatus) => void;
  onCloseModal: () => void;
};

const SavingActions = ({
  disable,
  marketingActionName,
  onSaveMarketingAction,
  onCloseModal,
}: Props) => {
  const { t } = useTranslation('marketingAction');
  const modalControl = useVisibilityControl();
  const {
    push,
    query: { marketingActionId },
  } = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaveAsDraft, setIsSaveAsDraft] = useState(false);
  const { getMyMarketingActionListHref } = useHrefs();

  const saveAsDraftMethods = useForm();
  const suspendTemplateMethods = useForm();
  const implementTemplateMethods = useForm();

  const showModal = () => {
    setIsCompleted(false);
    setIsSaveAsDraft(false);
    modalControl.open();
  };

  const onExecuteMA = async () => {
    await onSaveMarketingAction(MarketingActionStatus.RUNNING);
    setIsCompleted(true);
    push(getMyMarketingActionListHref());
  };

  const onSaveAsDraft = async () => {
    await onSaveMarketingAction(MarketingActionStatus.DRAFT);
    setIsCompleted(false);
    setIsSaveAsDraft(true);
    modalControl.open();
  };

  const onSuspend = async () => {
    await onSaveMarketingAction(MarketingActionStatus.DRAFT);
    push(getMyMarketingActionListHref());
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
  const profile = useProfile();
  const isGotoMABtn = isCompleted || isSaveAsDraft;
  const gotoMyMAUrl = `/organizations/${profile.data?.organization_id}/projects/${
    profile.data?.project_id
  }/actions/${isCompleted ? 'running' : 'draft'}/${marketingActionId}?target=all`;

  const handleCloseModal = () => {
    (isCompleted || isSaveAsDraft) && onCloseModal();
  };

  return (
    <>
      <div className='flex justify-center mt-10'>
        {marketingActionId ? (
          <>
            <Button
              colorScheme='danger'
              className='mr-5 min-w-[240px] h-[52px] text-medium'
              onClick={suspendTemplateMethods.handleSubmit(onSuspend)}
              loading={suspendTemplateMethods.formState.isSubmitting}
              complete={suspendTemplateMethods.formState.isSubmitSuccessful}
            >
              {t('suspendTemplate')}
            </Button>
            <Button
              loading={implementTemplateMethods.formState.isSubmitting}
              complete={implementTemplateMethods.formState.isSubmitSuccessful}
              onClick={implementTemplateMethods.handleSubmit(onExecuteMA)}
              className='min-w-[480px] h-[52px]'
            >
              {t('save')}
            </Button>
          </>
        ) : (
          <>
            <Button
              colorScheme='negative'
              onClick={saveAsDraftMethods.handleSubmit(onSaveAsDraft)}
              loading={saveAsDraftMethods.formState.isSubmitting}
              complete={saveAsDraftMethods.formState.isSubmitSuccessful}
              className='mr-5 min-w-[240px] h-[52px]'
            >
              {t('saveDraft')}
            </Button>
            <ConfirmButton
              className='w-[480px] h-[52px]'
              tooltipContent={
                <Trans
                  i18nKey='implementTemplateTooltip'
                  t={t}
                  components={[
                    <Icon
                      key='check'
                      name='check'
                      size={10}
                      className='inline-flex items-center justify-center w-5 h-5 p-1 mr-1 bg-white rounded-full text-primary'
                    ></Icon>,
                  ]}
                />
              }
              onClick={showModal}
              disabled={disable}
            >
              {t('implementTemplate')}
            </ConfirmButton>
          </>
        )}
      </div>

      <Modal control={modalControl} onClose={handleCloseModal}>
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
                <Modal.FooterButton
                  loading={implementTemplateMethods.formState.isSubmitting}
                  complete={implementTemplateMethods.formState.isSubmitSuccessful}
                  onClick={implementTemplateMethods.handleSubmit(onExecuteMA)}
                >
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
