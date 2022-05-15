import { MarketingActionSegment as MASegment } from './types';
import { TARGET } from '@/marketing-action/types';

const getTarget = (segment: string, member: boolean, sleep: boolean) => {
  return {
    segment,
    is_sleep: sleep, // is_sleep should be add before is_member, hope BE side will have better idea.
    is_member: member,
  };
};

const getTargetFilterObj = (target: string) => {
  switch (target) {
    case TARGET.F1:
      return getTarget(MASegment.F1, true, false);
    case TARGET.F2:
      return getTarget(MASegment.F2, true, false);
    case TARGET.SEMI_LOYAL:
      return getTarget(MASegment.SEMI_LOYAL, true, false);
    case TARGET.LOYAL:
      return getTarget(MASegment.LOYAL, true, false);
    case TARGET.F1_DORMANT:
      return getTarget(MASegment.F1, true, true);
    case TARGET.LOYAL_DORMANT:
      return getTarget(MASegment.LOYAL, true, true);
    case TARGET.F0_OTHERS:
      return getTarget(MASegment.F0, false, false);
    default:
      return getTarget(MASegment.F0, true, false);
  }
};

const getOtherDormant = () => {
  // (F0|F2,SEMI_LOYAL),true, true
  return [
    getTarget(MASegment.F0, true, true),
    getTarget(MASegment.F2, true, true),
    getTarget(MASegment.SEMI_LOYAL, true, true),
  ];
};

const getTargetCustomers = (targetCustomers: string[]) => {
  let _targetSegments = targetCustomers
    .filter(target => target !== TARGET.OTHER_DORMANT)
    .map(target => {
      return getTargetFilterObj(target as string);
    });
  if (targetCustomers.includes(TARGET.OTHER_DORMANT)) {
    _targetSegments = [..._targetSegments, ...getOtherDormant()];
  }
  return _targetSegments;
};

const getTargetValue = (targetSegment: any) => {
  switch (targetSegment.segment) {
    case MASegment.F1:
      return targetSegment.is_sleep ? TARGET.F1_DORMANT : TARGET.F1;
    case MASegment.F2:
      return TARGET.F2;
    case MASegment.LOYAL:
      return targetSegment.is_sleep ? TARGET.LOYAL_DORMANT : TARGET.LOYAL;
    case MASegment.SEMI_LOYAL:
      return TARGET.SEMI_LOYAL;
    default:
      return targetSegment.is_member ? TARGET.F0_MEMBER : TARGET.F0_OTHERS;
  }
};

const isOtherDormant = (targetSegment: any) => {
  const otherSegment =
    targetSegment.segment === MASegment.F0 ||
    targetSegment.segment === MASegment.F2 ||
    targetSegment.segment === MASegment.SEMI_LOYAL;
  return otherSegment && targetSegment.is_member === true && targetSegment.is_sleep === true;
};

const getTargetFilters = (targetSegments: any) => {
  if (!targetSegments) return [];

  let _targetSegments = [...targetSegments];
  let _filters: TARGET[] = [];

  const checkOtherExist = _targetSegments.some(element => isOtherDormant(element));
  if (checkOtherExist) {
    _filters = [..._filters, TARGET.OTHER_DORMANT];
    _targetSegments = _targetSegments.filter(element => !isOtherDormant(element));
  }

  _targetSegments = _targetSegments.map(target => getTargetValue(target));
  _filters = [..._targetSegments, ..._filters];
  return _filters;
};

export const MarketingActionUtils = {
  getTargetCustomers,
  getTargetFilters,
};
