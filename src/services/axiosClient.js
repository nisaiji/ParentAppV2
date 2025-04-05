import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from './NavigationServices';
import {ROUTE} from '../navigation/constant';
import {ToastAndroid} from 'react-native';

export const axiosClient = axios.create({
  // baseURL: 'http://192.168.139.214:4000',
  baseURL: "https://nisaiji.com/",
});

axiosClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  async response => {
    const data = response.data;
    if (data.status === 'ok') {
      return response;
    }
    // statusCode === 401 || statusCode === 503
    if (data.status === 'error' && data.message === 'jwt expired') {
      AsyncStorage.removeItem('userToken');
      navigate(ROUTE.AUTH);
      return Promise.reject(data.message);
    }
    if (data.status == 'error') {
      console.log('axios res data', data);
      return Promise.reject(data.message);
    }
  },
  async error => {
    console.log('axios err', error);
    if (error.message === 'Network Error') {
      ToastAndroid.show(
        'Check your internet connectivity',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
    return Promise.reject(error);
  },
);
