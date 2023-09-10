import Http from 'api/http';

const searchHttp = new Http(`${process.env.REACT_APP_DEV_URL}`);

export const getData = async () => {
  return await searchHttp.get<any>('/response');
};
