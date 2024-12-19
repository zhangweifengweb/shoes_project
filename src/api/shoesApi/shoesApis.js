import {get, post, exportExcel} from "@/utils/httpRequest"

export const loginHandle = params => post('/system/login', params);

export const getShoesList = params => post('/shoes/getShoesList', params);

export const addAndUpdateShoesInfo = (url, params) => post(url, params);

export const deleteShoesInfo = params => get(`/shoes/deleteShoesInfo?ids=${params}`);

export const downloadModle = () => exportExcel('/shoes/download');

export const loginOut = () => post('/system/loginOut');


export const count1 = params => post('/shoes/count1', params);

export const count2 = params => post('/shoes/count2', params);
