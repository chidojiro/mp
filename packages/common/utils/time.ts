const isPM = (time: string) => {
  return +time.split(':')[0] > 12;
};

export const TimeUtils = { isPM };
