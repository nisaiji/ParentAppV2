import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosClient} from '../services/axiosClient';
import {EndPoints} from '../ParentApi';

// Check login status
export const isLogin = createAsyncThunk('auth/isLogin', async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      const status = await AsyncStorage.getItem('status');

      return {
        token,
        status: status ? JSON.parse(status) : {},
      };
    }
    return null;
  } catch (error) {
    console.error('Error during isLogin:', error);
    throw error;
  }
});

// Set token
export const setToken = createAsyncThunk('auth/setToken', async ({token}) => {
  await AsyncStorage.setItem('accessToken', token);
  return token;
});

// Set auth object
export const setAuth = createAsyncThunk('auth/setAuth', async data => {
  const existing = await AsyncStorage.getItem('status');
  const parsed = existing ? JSON.parse(existing) : {};
  const mergedData = {...parsed, ...data};
  await AsyncStorage.setItem('status', JSON.stringify(mergedData));
  return mergedData;
});

// Update phone in auth.data
export const updatePhoneInData = createAsyncThunk(
  'auth/updatePhoneInData',
  async (phone, {getState}) => {
    const existing = await AsyncStorage.getItem('data');
    const parsed = existing ? JSON.parse(existing) : {};
    const updated = {...parsed, phone};
    await AsyncStorage.setItem('data', JSON.stringify(updated));
    return updated;
  },
);

// Update email in auth.data
export const updateEmailInData = createAsyncThunk(
  'auth/updateEmailInData',
  async (email, {getState}) => {
    const existing = await AsyncStorage.getItem('data');
    const parsed = existing ? JSON.parse(existing) : {};
    const updated = {...parsed, email};
    await AsyncStorage.setItem('data', JSON.stringify(updated));
    return updated;
  },
);

// Set the current child
export const setCurrentChild = createAsyncThunk(
  'auth/setCurrentChild',
  async ({child}) => {
    await AsyncStorage.setItem('currentChild', JSON.stringify(child));
    return child;
  },
);

export const fetchAndSetData = createAsyncThunk(
  'auth/fetchAndSetData',
  async (_, {dispatch}) => {
    try {
      const res = await axiosClient.get(EndPoints.GET_INFO);

      if (!res.data.statusCode === 200) return;

      const data = res?.data?.result;
      // console.log('data', JSON.stringify(data));
      let currentChild;
      let currentIndex;
      if (data) {
        await AsyncStorage.setItem('data', JSON.stringify(data));

        const students = data.students || [];

        let indexStr = await AsyncStorage.getItem('currentChildIndex');
        currentIndex = indexStr ? parseInt(indexStr, 10) : 0;

        if (currentIndex >= students.length) {
          currentIndex = 0;
        }

        currentChild = students[currentIndex] || null;

        if (currentChild) {
          await AsyncStorage.setItem(
            'currentChild',
            JSON.stringify(currentChild),
          );
          await AsyncStorage.setItem(
            'currentChildIndex',
            currentIndex.toString(),
          );
          dispatch(setCurrentChild.fulfilled(currentChild));
        }
      }

      return {
        data,
        currentChild,
        currentIndex,
      };
    } catch (error) {
      // console.log('Error in fetchAndSetData:', error);
      throw error;
    }
  },
);

export const updateCurrentChildByIndex = createAsyncThunk(
  'auth/updateCurrentChildByIndex',
  async (index, {getState}) => {
    const state = getState().auth;
    const students = state.data?.students || [];

    if (index < 0 || index >= students.length) {
      return;
    }

    const currentChild = students[index];

    await AsyncStorage.setItem('currentChildIndex', index.toString());
    await AsyncStorage.setItem('currentChild', JSON.stringify(currentChild));

    return {index, currentChild};
  },
);

// Logout and clear all data
export const logout = createAsyncThunk('auth/logout', async (_, {dispatch}) => {
  await AsyncStorage.clear();
  dispatch({type: 'RESET_APP'}); // Reset Redux state
  return {};
});

// Initial state
const initialState = {
  status: {},
  token: null,
  data: {},
  currentChild: null,
  currentChildIndex: 0,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(isLogin.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token;
          state.status = action.payload.status;
        }
      })
      .addCase(setToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(setAuth.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(setCurrentChild.fulfilled, (state, action) => {
        state.currentChild = action.payload;
      })
      .addCase(fetchAndSetData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.currentChild = action.payload.currentChild;
        state.currentChildIndex = action.payload.currentIndex;
      });
    builder
      .addCase(updateCurrentChildByIndex.fulfilled, (state, action) => {
        state.currentChildIndex = action.payload.index;
        state.currentChild = action.payload.currentChild;
      })
      .addCase(logout.fulfilled, state => {
        state.token = null;
        state.status = {};
        state.data = {};
        state.currentChild = null;
        state.currentChildIndex = 0;
      })
      .addCase(updatePhoneInData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateEmailInData.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default authSlice.reducer;
