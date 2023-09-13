export const roundMulti = (data: any[], num: number) => {
  return Math.ceil(Math.max(...data) / num) * num * 2;
};
