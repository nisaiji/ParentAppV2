import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage keys for storing dashboard-related data
const DASHBOARD_TIMESTAMP_KEY = 'lastDashboardUpdatedAt';
const DASHBOARD_MONTHLY_EVENTS_KEY = 'dashboardMonthlyEvents';

/**
 * Retrieves stored monthly events from AsyncStorage.
 * @returns {Promise<Object>} - Returns stored monthly events or an empty object if not found.
 */
const getStoredMonthlyEvents = async () =>
  JSON.parse(await AsyncStorage.getItem(DASHBOARD_MONTHLY_EVENTS_KEY)) || {};

/**
 * Saves monthly events data to AsyncStorage.
 * @param {Object} monthlyEvents - The events data to be stored.
 */
const saveMonthlyEvents = async monthlyEvents =>
  await AsyncStorage.setItem(
    DASHBOARD_MONTHLY_EVENTS_KEY,
    JSON.stringify(monthlyEvents),
  );

/**
 * Saves the last dashboard update timestamp to AsyncStorage.
 * @param {string} newTimestamp - The timestamp to be stored.
 */
const savelastDashboardUpdatedAt = async newTimestamp => {
  await AsyncStorage.setItem(
    DASHBOARD_TIMESTAMP_KEY,
    JSON.stringify(newTimestamp),
  );
};

/**
 * Retrieves the last dashboard synchronization timestamp from AsyncStorage.
 * @returns {Promise<string|null>} - Returns the stored timestamp or null if not found.
 */
const getStoredLastDashboardSync = async () =>
  JSON.parse(await AsyncStorage.getItem(DASHBOARD_TIMESTAMP_KEY)) || null;

/**
 * Checks if the dashboard data needs to be updated based on the last stored timestamp.
 * Updates every 4 hours.
 */
export const isDashboardNeedsToUpdate = createAsyncThunk(
  'dashboard/isDashboardNeedsToUpdate',
  async (_, {getState, dispatch}) => {
    const currentTimestamp = moment();
    const lastDashboardSync = await getStoredLastDashboardSync();
    if (
      !lastDashboardSync ||
      currentTimestamp.diff(moment(lastDashboardSync), 'hour') >= 4
    ) {
      return true;
    }
    return false;
  },
);

/**
 * Initializes dashboard data by fetching stored values from AsyncStorage and updating Redux state.
 */
export const initializeDashboardData = createAsyncThunk(
  'dashboard/initializeDashboardData',
  async (_, {dispatch}) => {
    const monthlyEvents = await getStoredMonthlyEvents();
    const lastDashboardSync = await getStoredLastDashboardSync();
    // console.log('lastDashboardSync', lastDashboardSync);

    dispatch(updateMonthlyEvents(monthlyEvents));
    dispatch(updatelastDashboardUpdatedAt(lastDashboardSync));
  },
);

// Redux Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    lastDashboardUpdatedAt: null,
    monthlyEvents: {},
    attendanceRequest: null,
  },
  reducers: {
    /**
     * Updates the last dashboard update timestamp in state and AsyncStorage.
     * @param {Object} state - Redux state.
     * @param {Object} action - Action containing the new timestamp.
     */
    updatelastDashboardUpdatedAt: (state, action) => {
      const updatedTime = action?.payload || moment().valueOf();
      state.lastDashboardUpdatedAt = updatedTime;
      savelastDashboardUpdatedAt(updatedTime);
    },
    /**
     * Updates monthly events data in state and saves it to AsyncStorage.
     * @param {Object} state - Redux state.
     * @param {Object} action - Action containing new monthly events data.
     */
    updateMonthlyEvents: (state, action) => {
      state.monthlyEvents = action.payload;
      saveMonthlyEvents(action.payload); // Save to AsyncStorage
    },
  },
  extraReducers: builder => {
    builder.addCase(isDashboardNeedsToUpdate.fulfilled, (_, action) => {
      // console.log('Dashboard needs update:', action.payload);
    });
    builder.addCase(initializeDashboardData.fulfilled, () => {
      // console.log('Dashboard data fetched from AsyncStorage');
    });
  },
});

export const {
  updatelastDashboardUpdatedAt,
  updateMonthlyEvents,
  updateChartData,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
