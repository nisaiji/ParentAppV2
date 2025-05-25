import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage keys for storing dashboard-related data
const DASHBOARD_TIMESTAMP_KEY = 'lastDashboardUpdatedAt';
const DASHBOARD_MONTHLY_ATTENDANCE_KEY = 'dashboardMonthlyAttendance';

/**
 * Retrieves stored monthly attendance from AsyncStorage.
 * @returns {Promise<Object>} - Returns stored monthly attendance or an empty object if not found.
 */
const getStoredMonthlyAttendance = async () => {
  // JSON.parse(await AsyncStorage.getItem(DASHBOARD_MONTHLY_ATTENDANCE_KEY)) || {};
  const attendance = await AsyncStorage.getItem(DASHBOARD_MONTHLY_ATTENDANCE_KEY);
  return attendance ? JSON.parse(attendance) : {};
};

/**
 * Saves monthly attendance data to AsyncStorage.
 * @param {Object} monthlyAttendance - The attendance data to be stored.
 */
const saveMonthlyAttendance = async monthlyAttendance =>
  await AsyncStorage.setItem(
    DASHBOARD_MONTHLY_ATTENDANCE_KEY,
    JSON.stringify(monthlyAttendance),
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
  async () => {
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
    const monthlyAttendance = await getStoredMonthlyAttendance();
    const lastDashboardSync = await getStoredLastDashboardSync();
    // console.log('lastDashboardSync', lastDashboardSync);

    // Instead of dispatching all at once, loop through each childId
    Object.entries(monthlyAttendance).forEach(([childId, attendance]) => {
      dispatch(updateMonthlyAttendance({childId, attendance}));
    });
    dispatch(updatelastDashboardUpdatedAt(lastDashboardSync));
  },
);

// Redux Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    lastDashboardUpdatedAt: null,
    monthlyAttendance: {},
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
     * Updates monthly attendance data in state and saves it to AsyncStorage.
     * @param {Object} state - Redux state.
     * @param {Object} action - Action containing new monthly attendance data.
     */
    updateMonthlyAttendance: (state, action) => {
      const {childId, attendance} = action.payload;
      if (childId) {
        state.monthlyAttendance[childId] = attendance;
        saveMonthlyAttendance(state.monthlyAttendance);
      } else {
        state.monthlyAttendance = {};
        saveMonthlyAttendance({});
      }
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
  updateMonthlyAttendance,
  updateChartData,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
