import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

/**
 * @module metrics
 * @description Provides screen dimensions to be used throughout the app for responsive design.
 * @property {number} screenWidth - Width of the screen in portrait mode.
 * @property {number} screenHeight - Height of the screen in portrait mode.
 */
const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : height,
};

export default metrics;
