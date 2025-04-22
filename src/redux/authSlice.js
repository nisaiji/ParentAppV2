// authSlice.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

/**
 * Async thunk to check if the user is logged in.
 * Retrieves tokens from AsyncStorage, decodes the JWT, and returns user details.
 */
export const isLogin = createAsyncThunk('auth/isLogin', async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      const status = await AsyncStorage.getItem('status');
      const childsStr = await AsyncStorage.getItem('childs');
      const childs = childsStr ? JSON.parse(childsStr) : [];

      return {
        token,
        status: status ? JSON.parse(status) : {},
        childs,
      };
    }
    return null;
  } catch (error) {
    console.error('Error during isLogin:', error);
    throw error;
  }
});

export const setChildList = createAsyncThunk(
  'auth/setChildList',
  async child => {
    try {
      const existingStr = await AsyncStorage.getItem('childs');
      const existing = existingStr ? JSON.parse(existingStr) : child;

      // Add the new child to the array
      const updatedChilds = [...existing, child];

      // Store the updated array as a string in AsyncStorage
      await AsyncStorage.setItem('childs', JSON.stringify(updatedChilds));

      // Return the updated array for Redux
      return updatedChilds;
    } catch (error) {
      throw error;
    }
  },
);
export const setData = createAsyncThunk('auth/setData', async newData => {
  try {
    const existingData = await AsyncStorage.getItem('data');
    const existing = existingData ? JSON.parse(existingData) : newData;

    // Add the new data to the array
    const updatedData = [...existing, newData];

    // Store the updated array as a string in AsyncStorage
    await AsyncStorage.setItem('data', JSON.stringify(updatedData));

    // Return the updated array for Redux
    return updatedData;
  } catch (error) {
    throw error;
  }
});

// Async thunk to store auth status in AsyncStorage
export const setAuth = createAsyncThunk('auth/setAuth', async data => {
  try {
    const existing = await AsyncStorage.getItem('status');
    const parsed = existing ? JSON.parse(existing) : {};
    const mergedData = {...parsed, ...data};

    await AsyncStorage.setItem('status', JSON.stringify(mergedData));
    return mergedData;
  } catch (error) {
    throw error;
  }
});

export const setToken = createAsyncThunk('auth/setToken', async ({token}) => {
  try {
    // console.log('Saving token to AsyncStorage:', token);
    await AsyncStorage.setItem('accessToken', token);
    return token;
  } catch (error) {
    // console.error('AsyncStorage error:', error);
    throw error;
  }
});
export const setCurrnetChild = createAsyncThunk('auth/setCurrnetChild', async ({child}) => {
  try {
    await AsyncStorage.setItem('currnetChild', child);
    return child;
  } catch (error) {
    // console.error('AsyncStorage error:', error);
    throw error;
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, {dispatch}) => {
  try {
    await AsyncStorage.clear();
    dispatch({type: 'RESET_APP'}); // Reset Redux state
    return {};
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
});

const initialState = {
  status: {},
  childs: [],
  token: null,
  data: [],
  currentChild:{}
};

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
          state.childs = action.payload.childs;
        }
      })
      .addCase(setAuth.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(setChildList.fulfilled, (state, action) => {
        state.childs = action.payload;
      })
      .addCase(setData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(setToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(setCurrnetChild.fulfilled, (state, action) => {
        state.currnetChild = action.payload;
      })
      .addCase(logout.fulfilled, state => {
        state.token = null;
        state.status = {};
        state.childs = [];
      });
  },
});

export default authSlice.reducer;
