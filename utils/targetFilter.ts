import { MASegment, TARGET } from '@/types';

const getTargetFilterObj = (target: string) => {
  switch (target) {
    case TARGET.F1:
      return {
        segment: MASegment.F1,
        is_sleep: true,
        is_member: true,
      };
    case TARGET.F2:
      return {
        segment: MASegment.F2,
        is_sleep: true,
        is_member: true,
      };
    case TARGET.F0_OTHERS:
      return {
        segment: MASegment.F0,
        is_sleep: true,
        is_member: false,
      };
    case TARGET.SEMI_LOYAL:
      return {
        segment: MASegment.SEMI_LOYAL,
        is_sleep: true,
        is_member: true,
      };
    case TARGET.LOYAL:
      return {
        segment: MASegment.LOYAL,
        is_sleep: true,
        is_member: true,
      };
    case TARGET.F1_DORMANT:
      return {
        segment: MASegment.F1,
        is_sleep: true,
        is_member: false,
      };
    case TARGET.LOYAL_DORMANT:
      return {
        segment: MASegment.LOYAL,
        is_sleep: true,
        is_member: false,
      };
    default:
      return {
        segment: MASegment.F0,
        is_sleep: true,
        is_member: true,
      };
  }
};

const getTargetValue = (targetSegment: any) => {
  switch (targetSegment.segment) {
    case MASegment.F1:
      return targetSegment.is_member ? TARGET.F1 : TARGET.F1_DORMANT;
    case MASegment.F2:
      return TARGET.F2;
    case MASegment.LOYAL:
      return targetSegment.is_member ? TARGET.LOYAL : TARGET.LOYAL_DORMANT;
    case MASegment.SEMI_LOYAL:
      return TARGET.SEMI_LOYAL;
    default:
      return targetSegment.is_member ? TARGET.F0_MEMBER : TARGET.F0_OTHERS;
  }
};

export const TargetFilterUtils = { getTargetFilterObj, getTargetValue };
