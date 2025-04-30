import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from './NavigationServices';
import {ROUTE} from '../navigation/constant';
// import {errorToast} from '../components/customToast/CustomToast';
import {checkInternetConnection} from '../utils/handler';

// Base URL for API requests
// const baseURL = 'http://192.168.232.214:4000/';
const baseURL = 'http://192.168.29.79:4000/';
// const baseURL = 'https://api.sharedri.com/';
// const baseURL = 'https://development-api.nisaiji.com/';

let isShowingNoInternetToast = false;

// Create an Axios instance with the base URL
export const axiosClient = axios.create({baseURL});

/**
 * Function to refresh the access token using the stored refresh token.
 * @returns {Promise<string|null>} - Returns the new access token or null if the refresh token is invalid.
 */
// async function refreshAccessToken() {
//   const refreshToken = await AsyncStorage.getItem('refreshToken');
//   if (!refreshToken) {
//     return null;
//   }

//   try {
//     const response = await axios.get(`${baseURL}teacher/refresh`, {
//       headers: {
//         Authorization: `Bearer ${refreshToken}`,
//       },
//     });
//     return response?.data?.result?.accessToken;
//   } catch (error) {
//     return null;
//   }
// }

// Request interceptor: Adds the access token to request headers before sending it
axiosClient.interceptors.request.use(
  async config => {
    // Check internet connectivity before making API requests
    const isConnected = checkInternetConnection();
    if (!isConnected) {
      if (!isShowingNoInternetToast) {
        isShowingNoInternetToast = true;
        // errorToast('No internet connection. Please check your network.');
        setTimeout(() => {
          isShowingNoInternetToast = false;
        }, 5000); // Prevents multiple toasts within 3 seconds
      }
      return Promise.reject({message: 'No internet connection'});
    }

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

// Response interceptor: Handles expired JWT tokens and other API errors
axiosClient.interceptors.response.use(
  async response => {
    const data = response?.data;
    // Return response if the status is 'ok'
    // console.log({response});

    if (data?.status === 'ok') {
      return response;
    }

    // Handle expired JWT token
    if (data?.statusCode === 500 && data?.message === 'jwt expired') {
      const originalRequest = response?.config;

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Store the new access token and retry the original request
        await AsyncStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // If refresh fails, clear storage and navigate to auth screen
        return axiosClient(originalRequest);
      } else {
        await AsyncStorage.clear();
        navigationRef.reset({
          index: 0,
          routes: [
            {
              name: ROUTE.AUTH, // Main stack
              state: {
                index: 0, // Ensure LOGIN is the active screen inside AUTH stack
                routes: [{name: ROUTE.LOGIN}],
              },
            },
          ],
        });
        // errorToast(data?.message);
        return;
      }
    }

    // Reject the response if the status is 'error'
    if (data?.status == 'error') {
      return Promise.reject(data?.message);
    }
  },
  async error => {
    // console.log('error?.response?.status 111', JSON.stringify(error?.response));
    // console.log({err: error.response.data});
    // Handle network errors
    if (error?.message === 'Network Error') {
      if (!isShowingNoInternetToast) {
        isShowingNoInternetToast = true;
        // errorToast('Check your internet connectivity');
        setTimeout(() => {
          isShowingNoInternetToast = false;
        }, 5000);
      }
      return Promise.reject('Check your internet connectivity');
    }

    // Handle 403 errors (forbidden access) and 410 errors (soft delete)
    if (error?.response?.status === 410) {
      await AsyncStorage.clear();
      navigationRef?.reset({
        index: 0,
        routes: [
          {
            name: ROUTE.AUTH,
            state: {
              routes: [{name: ROUTE.LOGIN}],
            },
          },
        ],
      });
    }
    // Handle 403 errors (forbidden access)
    if (error?.response?.status === 403) {
      await AsyncStorage.clear();
      navigationRef?.reset({
        index: 0,
        routes: [
          {
            name: ROUTE.AUTH,
            state: {
              routes: [{name: ROUTE.LOGIN}],
            },
          },
        ],
      });
    }

    return Promise.reject(error?.response?.data?.message);
  },
);
