// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { jwtDecode } from 'jwt-decode';

// /**
//  * Async thunk to check if the user is logged in.
//  * Retrieves tokens from AsyncStorage, decodes the JWT, and returns user details.
//  */
// export const isLogin = createAsyncThunk('auth/isLogin', async () => {
//   try {
//     const token = await AsyncStorage.getItem('accessToken');
//     const refreshToken = await AsyncStorage.getItem('refreshToken');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       const user = await AsyncStorage.getItem('user');

//       return {
//         token: token,
//         refreshToken: refreshToken,
//         user: user ? JSON.parse(user) : null,
//       };
//     }
//     return null;
//   } catch (error) {
//     console.error('Error during isLogin:', error);
//     throw error;
//   }
// });

// /**
//  * Async thunk for user login.
//  * Decodes the token, stores user details in AsyncStorage, and updates Redux state.
//  */
// export const login = createAsyncThunk(
//   'auth/login',
//   async ({ token, refreshToken }) => {
//     try {
//       const decodedToken = jwtDecode(token);

//       await AsyncStorage.multiSet([
//         ['accessToken', token],
//         ['refreshToken', refreshToken],
//       ]);

//       return {
//         token: token,
//         refreshToken: refreshToken,
//       };
//     } catch (error) {
//       console.error('Error during login:', error);
//       throw error;
//     }
//   },
// );

// /**
//  * Async thunk for user logout.
//  * Clears all stored user data from AsyncStorage and resets Redux state.
//  */
// export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
//   try {
//     await AsyncStorage.clear();
//     dispatch({ type: 'RESET_APP' }); // Reset Redux state
//     return {};
//   } catch (error) {
//     console.error('Error during logout:', error);
//     throw error;
//   }
// });

// const initialState = {
//   token: null,
//   refreshToken: null,
//   isLoading: true,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     /**
//      * Updates authentication details (email, phone, username) in Redux state and AsyncStorage.
//      */
//     setAuth: (state, action) => {
//       const { email, phone, username } = action.payload;
//       AsyncStorage.multiSet([
//         ['email', email],
//         ['phone', phone],
//         ['username', username],
//       ]);
//     },
//   },
//   extraReducers: builder => {
//     // Handle async actions like isLogin, login, logout
//     builder
//       .addCase(isLogin.pending, state => {
//         state.isLoading = true;
//       })
//       .addCase(isLogin.fulfilled, (state, action) => {
//         if (action.payload) {
//           state.token = action.payload.token;
//           state.refreshToken = action.payload.refreshToken;
//           state.user = action.payload.user;
//         }
//         state.isLoading = false;
//       })
//       .addCase(isLogin.rejected, state => {
//         state.isLoading = false;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.token = action.payload.token;
//         state.refreshToken = action.payload.refreshToken;
//       })
//       .addCase(logout.fulfilled, state => {
//         state.token = null;
//         state.refreshToken = null;
//       });
//   },
// });

// export const { setAuth } =
//   authSlice.actions;

// export default authSlice.reducer;

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

      return {
        token: token,
        status: status ? JSON.parse(status) : null,
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
      const existing = await AsyncStorage.getItem('childs');
      const parsed = existing ? JSON.parse(existing) : {childs: []};

      const updatedChilds = [...(parsed.childs || []), child];
      const updatedData = {...parsed, childs: updatedChilds};

      await AsyncStorage.setItem('childs', JSON.stringify(updatedData));
      return updatedData;
    } catch (error) {
      throw error;
    }
  },
);

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

const initialState = {
  status: {},
  childs: [],
  token: null,
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
        }
      })
      .addCase(setAuth.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(setChildList.fulfilled, (state, action) => {
        state.childs = action.payload?.childs;
      })
      .addCase(setToken.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});

export default authSlice.reducer;
