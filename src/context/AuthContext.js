import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosClient} from '../services/axiosClient';
import {jwtDecode} from 'jwt-decode';
import {navigate} from '../services/NavigationServices';
import {ROUTE} from '../navigation/constant';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState(null);
  const [childrenData, setChildrenData] = useState([]);
  const [currentChild, setCurrentChild] = useState({});
  const [currentChildIndex, setCurrentChildIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState(null);
  const [parentEmail, setParentEmail] = useState('');
  const [parentUsername, setUsername] = useState('');
  const [profileDrawer, setProfileDrawer] = useState(false);

  useEffect(() => {
    const isLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const storedPhone = await AsyncStorage.getItem('phone');
        const storedEmail = await AsyncStorage.getItem('email');
        if (token) {
          const decodedToken = jwtDecode(token);
          setPhone(storedPhone || decodedToken.phone);
          setParentEmail(storedEmail || decodedToken.email);
          setAccessToken(token);
          await fetchChildrenData();
        }
      } catch (e) {
        console.log('Login error', e);
      } finally {
        setIsLoading(false);
      }
    };
    isLogin();
  }, []);

  const fetchChildrenData = async () => {
    try {
      const res = await axiosClient.get('parent/children');
      const children = res.data.result;
      setChildrenData(children);

      const index = await AsyncStorage.getItem('currentChildIndex');
      const username = await AsyncStorage.getItem('username');
      const email = await AsyncStorage.getItem('email');
      const phone = await AsyncStorage.getItem('phone');
      setUsername(username);
      setParentEmail(email);
      setPhone(phone);
      let currentIndex = index ? parseInt(index) : 0;
      if (currentIndex >= children.length) {
        currentIndex = 0;
      }
      setCurrentChild(children[currentIndex]);
      setCurrentChildIndex(currentIndex);
      await AsyncStorage.setItem('currentChildIndex', currentIndex.toString());
    } catch (e) {
      if (e === "parent doesn't exists") {
        await AsyncStorage.multiRemove([
          'accessToken',
          'firstName',
          'username',
          'email',
          'phone',
          'currentChildIndex',
        ]);
        navigate(ROUTE.AUTH);
      }
      // console.error('Fetch children data error', e);
    }
  };

  const login = async token => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('accessToken', token);
      const decodedToken = jwtDecode(token);
      await AsyncStorage.setItem('email', decodedToken.email);
      await AsyncStorage.setItem('phone', decodedToken.phone);
      setPhone(decodedToken.phone);
      setParentEmail(decodedToken.email);
      setAccessToken(token);
      await fetchChildrenData();
    } catch (e) {
      console.error('Login error', e);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('currentChildIndex');
      // await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('phone');
      setAccessToken(null);
      setChildrenData([]);
      setCurrentChild(null);
      setCurrentChildIndex(0);
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  const setCurrentChildWithIndex = async index => {
    setCurrentChildIndex(index);
    setCurrentChild(childrenData[index]);
    await AsyncStorage.setItem('currentChildIndex', index.toString());
  };

  const setParentUsername = async username => {
    await AsyncStorage.setItem('username', username);
    setUsername(username);
  };

  const setAuth = async (email, phone) => {
    setParentEmail(email);
    setPhone(phone);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('phone', phone);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        fetchChildrenData,
        phone,
        parentEmail,
        setAuth,
        accessToken,
        childrenData,
        setParentUsername,
        parentUsername,
        currentChild,
        setCurrentChild,
        setCurrentChildIndex: setCurrentChildWithIndex,
        isLoading,
        profileDrawer,
        setProfileDrawer,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
