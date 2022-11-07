export const getEpoch = () => new Date().getTime();

const addZero = (dateOrMonth: number) => (dateOrMonth < 10 ? `0${dateOrMonth}` : dateOrMonth);

export const convertTime = (time: string) => {
  const date = new Date(time);
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
};