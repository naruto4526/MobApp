import { StyleSheet } from "react-native";
import { COLORS,SIZES,SHADOWS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin:SIZES.small/8,
    justifyContent:'center',
  },
  textContainer: {
    margin:SIZES.small/5,
    padding:2,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  textVal: {
    fontSize:SIZES.large,
    padding:2,
    paddingTop:5,
    //font family
    color:"#29294d",
  },
  rowContainer: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    margin:SIZES.xSmall,
    marginBottom:SIZES.xLarge,
  },
  paramContainer: {
    padding:SIZES.small,
    backgroundColor:COLORS.primary,
    flexDirection:'row',
    borderRadius:SIZES.small/4,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    justifyContent:'center',
    marginRight:SIZES.small/2,
  },
  paramText: {
    fontFamily: "monospace",
    fontSize: SIZES.medium,
    color: "#C3BFCC",
  }
 

});

export {styles};