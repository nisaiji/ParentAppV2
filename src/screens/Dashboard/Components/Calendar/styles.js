import { StyleSheet } from "react-native";
import colors from '@src/theme/colors';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.WHITE,
      borderBottomLeftRadius: scale(30), // Border radius at top-left
      borderBottomRightRadius: scale(30),
      overflow: 'hidden', // Ensure border radius is respected
      
      
    },
    headerContainer:{
      flex:1,
      flexDirection: 'row',
      justifyContent:'space-between'
    }
  });
  export default styles;