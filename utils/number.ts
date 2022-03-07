const pad = (num: string | number | undefined, size = 2) => {
  let _num = (num ?? 0).toString();

  while (_num.length < size) _num = '0' + _num;

  return _num;
};

export const NumberUtils = {
  pad,
};
