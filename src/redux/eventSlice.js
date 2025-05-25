import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage keys for storing event-related data
const EVENT_TIMESTAMP_KEY = 'lastEventUpdatedAt';
const EVENT_MONTHLY_EVENTS_KEY = 'eventMonthlyEvents';

/**
 * Retrieves stored monthly events from AsyncStorage.
 * @returns {Promise<Object>} - Returns stored monthly events or an empty object if not found.
 */
const getStoredMonthlyEvents = async () => {
  // JSON.parse(await AsyncStorage.getItem(EVENT_MONTHLY_EVENTS_KEY)) || {};
  const events = await AsyncStorage.getItem(EVENT_MONTHLY_EVENTS_KEY);
  return events ? JSON.parse(events) : {};
};

/**
 * Saves monthly events data to AsyncStorage.
 * @param {Object} monthlyEvents - The events data to be stored.
 */
const saveMonthlyEvents = async monthlyEvents =>
  await AsyncStorage.setItem(
    EVENT_MONTHLY_EVENTS_KEY,
    JSON.stringify(monthlyEvents),
  );

/**
 * Saves the last event update timestamp to AsyncStorage.
 * @param {string} newTimestamp - The timestamp to be stored.
 */
const savelastEventUpdatedAt = async newTimestamp => {
  await AsyncStorage.setItem(EVENT_TIMESTAMP_KEY, JSON.stringify(newTimestamp));
};

/**
 * Retrieves the last event synchronization timestamp from AsyncStorage.
 * @returns {Promise<string|null>} - Returns the stored timestamp or null if not found.
 */
const getStoredLastEventSync = async () =>
  JSON.parse(await AsyncStorage.getItem(EVENT_TIMESTAMP_KEY)) || null;

/**
 * Checks if the event data needs to be updated based on the last stored timestamp.
 * Updates every 4 hours.
 */
export const isEventNeedsToUpdate = createAsyncThunk(
  'event/isEventNeedsToUpdate',
  async (_, {getState, dispatch}) => {
    const currentTimestamp = moment();
    const lastEventSync = await getStoredLastEventSync();
    if (
      !lastEventSync ||
      currentTimestamp.diff(moment(lastEventSync), 'hour') >= 4
    ) {
      return true;
    }
    return false;
  },
);

/**
 * Initializes event data by fetching stored values from AsyncStorage and updating Redux state.
 */
export const initializeEventData = createAsyncThunk(
  'event/initializeEventData',
  async (_, {dispatch}) => {
    const monthlyEvents = await getStoredMonthlyEvents();
    const lastEventSync = await getStoredLastEventSync();
    // console.log('lastEventSync', lastEventSync);

    // Instead of dispatching all at once, loop through each childId
    Object.entries(monthlyEvents).forEach(([childId, events]) => {
      dispatch(updateMonthlyEvents({childId, events}));
    });

    dispatch(updatelastEventUpdatedAt(lastEventSync));
  },
);

// Redux Slice
const eventSlice = createSlice({
  name: 'event',
  initialState: {
    lastEventUpdatedAt: null,
    monthlyEvents: {},
  },
  reducers: {
    /**
     * Updates the last event update timestamp in state and AsyncStorage.
     * @param {Object} state - Redux state.
     * @param {Object} action - Action containing the new timestamp.
     */
    updatelastEventUpdatedAt: (state, action) => {
      const updatedTime = action?.payload || moment().valueOf();
      state.lastEventUpdatedAt = updatedTime;
      savelastEventUpdatedAt(updatedTime);
    },
    /**
     * Updates monthly events data in state and saves it to AsyncStorage.
     * @param {Object} state - Redux state.
     * @param {Object} action - Action containing new monthly events data.
     */
    updateMonthlyEvents: (state, action) => {
      const {childId, events} = action.payload;
      if (childId) {
        state.monthlyEvents[childId] = events;
        saveMonthlyEvents(state.monthlyEvents);
      } else {
        state.monthlyEvents = {};
        saveMonthlyEvents({});
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(isEventNeedsToUpdate.fulfilled, (_, action) => {
      // console.log('Event needs update:', action.payload);
    });
    builder.addCase(initializeEventData.fulfilled, () => {
      // console.log('Event data fetched from AsyncStorage');
    });
  },
});

export const {updatelastEventUpdatedAt, updateMonthlyEvents, updateChartData} =
  eventSlice.actions;
export default eventSlice.reducer;
