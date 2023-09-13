import Http from 'api/http';
import { DataType } from 'types';

const searchHttp = new Http(`${process.env.REACT_APP_DEV_URL}`);

export const getData = async (): Promise<{ [date: string]: DataType }> => {
  return await searchHttp.get<any>('/response');
};
