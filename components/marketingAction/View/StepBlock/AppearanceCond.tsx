import { useTranslation } from 'next-i18next';

import { Answer } from './Answer';

type Props = {
  settings: any;
};

export const AppearanceCond = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');

  const renderTiming = (displaySettings: any, device: string) => {
    return (
      <div className='mb-2.5'>{`${device}: ${t('afterOpening')}${displaySettings.appear_time}${t(
        'secondsAfterAprearance'
      )}`}</div>
    );
  };

  const getPosText = (position: string) => {
    return position === 'right' ? t('rightEdge') : t('leftEdge');
  };

  const renderPosition = (displaySettings: any, device: string) => {
    return (
      <>
        <div className='mb-2.5'>{`${device}: ${getPosText(displaySettings.position)}`}</div>
        <div className='mb-2.5'>{`${t('upFromDefaultPos')}${displaySettings.position_close_box}
      ${displaySettings.position_close_box_unit}`}</div>
      </>
    );
  };

  return (
    <Answer name={t('appearanceCond')}>
      <div className='mt-3 mb-2'>[{t('appearanceTiming')}]</div>
      {renderTiming(settings.display_settings_pc, 'PC')}
      {renderTiming(settings.display_settings_mobile, t('mobile'))}
      <div className='mt-5 mb-2.5'>[{t('displayPos')}]</div>
      {renderPosition(settings.display_settings_pc, 'PC')}
      {renderPosition(settings.display_settings_mobile, t('mobile'))}
    </Answer>
  );
};
