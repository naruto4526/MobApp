import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container :{

  },
  text : {
    fontFamily : 'monospace',
    fontSize : SIZES.large,
    textAlign : 'center',
    margin : 3,
    padding : 3,
  },
  number : {
    fontFamily : 'monospace',
    fontSize : SIZES.xLarge*1.5,
    textAlign : 'center',
    margin : 3,
    padding : 3,
  },
  timeContainer : {
    flexDirection : 'row',
    margin : 20,
    marginBottom : 0,
    padding : 5,
    alignItems : 'center',
    justifyContent : 'center'
  },
  timeText : {
    fontFamily : 'monospace',
    fontSize : SIZES.medium,
    margin : 4,
    textAlign : 'center'
  },
  stepsLeftContainer : {
    margin : 10,
    padding : 5,
    justifyContent : 'center',
    alignItems : 'center'
  },
  stepsLeftText : {
    fontFamily : 'monospace',
    fontSize : SIZES.large,
    color : COLORS.gray
  },
  goalContainer : {
    flex : 1,
    flexDirection : 'row',
    margin : 10,
    alignItems : 'center',
  },
  butt : {
    fontFamily : 'monospace',
    fontSize : SIZES.xxLarge,
    margin : 5,
  }
});


export {styles};