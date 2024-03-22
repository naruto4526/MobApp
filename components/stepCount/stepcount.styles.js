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