const pad = (num: string | number | undefined, size = 2) => {
  let _num = (num ?? 0).toString();

  while (_num.length < size) _num = '0' + _num;

  return _num;
};

const formatMoney = (num: number) => {
  return num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const formatAverage = (num: number) => {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
const formatPercent = (num: number) => {
  return num.toFixed(1).toLocaleString();
};
const formatQuantity = (num: number) => {
  return num.toFixed(0).toLocaleString();
};

export const NumberUtils = {
  pad,
  formatMoney,
  formatPercent,
  formatQuantity,
  formatAverage,
};
