import Http from 'api/http';
import { DataType } from 'types';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_DEPLOY_URL
    : process.env.REACT_APP_DEV_URL;
const searchHttp = new Http(BASE_URL || '');

export const getData = async (): Promise<{ [date: string]: DataType }> => {
  return await searchHttp.get<any>('/response');
};
