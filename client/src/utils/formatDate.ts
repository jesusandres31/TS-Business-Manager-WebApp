export const formatDate = (date: Date) => {
  let formatedDate =
    [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') +
    ' ' +
    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
  return formatedDate;
};

export const formatDateFrom = (date: Date) => {
  date.setHours(0, 0, 0);
  let formatedDate =
    [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') +
    ' ' +
    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
  return formatedDate;
};

export const formatDateTo = (date: Date) => {
  date.setHours(23, 59, 59);
  let formatedDate =
    [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') +
    ' ' +
    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
  return formatedDate;
};
