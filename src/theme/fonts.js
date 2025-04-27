import {Platform} from 'react-native';
import Metrics from './metrics';
import Colors from './colors';

const Size = {
  font_12: Metrics.screenWidth * (12 / 375),
  font_13: Metrics.screenWidth * (13 / 375),
  font_14: Metrics.screenWidth * (14 / 375),
  font_15: Metrics.screenWidth * (15 / 375),
  font_16: Metrics.screenWidth * (16 / 375),
  font_18: Metrics.screenWidth * (18 / 375),
  font_20: Metrics.screenWidth * (20 / 375),
  font_22: Metrics.screenWidth * (22 / 375),
  font_24: Metrics.screenWidth * (24 / 375),
  font_25: Metrics.screenWidth * (25 / 375),
  font_26: Metrics.screenWidth * (26 / 375),
  font_27: Metrics.screenWidth * (27 / 375),
  font_28: Metrics.screenWidth * (28 / 375),
  font_29: Metrics.screenWidth * (29 / 375),
  font_30: Metrics.screenWidth * (30 / 375),
  font_40: Metrics.screenWidth * (40 / 375),
};

const Fonts = {
  REGULAR: 'Helvetica',
  BOLD: 'Helvetica-Bold',
};

const Weight = {
  full: '900',
  semi: Platform.OS === 'ios' ? '600' : '700',
  low: '400',
  bold: 'bold',
  normal: 'normal',
};

const globalStyle = {
  hitSlop10:{top: 10, bottom: 10, left: 10, right: 10},
  hitSlop20:{top: 20, bottom: 20, left: 20, right: 20}
}

export {Size, Weight, Colors, Fonts, globalStyle};
