/**
 * Uses the `@react-native-community/netinfo` library to fetch network state and
 * determine connectivity status.
 *
 * @async
 * @function checkInternetConnection
 * @returns {Promise<boolean>} A promise that resolves to `true` if the device is connected
 * to the internet, or `false` otherwise (including if an error occurs).
 *
 */

import NetInfo from '@react-native-community/netinfo';

const checkInternetConnection = async () => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected;
  } catch (error) {
    console.error('Error checking internet connection:', error);
    return false;
  }
};

export {checkInternetConnection};
