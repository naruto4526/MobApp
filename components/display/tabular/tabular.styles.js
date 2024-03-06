import { StyleSheet } from "react-native";
import { COLORS,SIZES,SHADOWS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin:0,
    marginLeft:-14,
    marginRight:-14,
    flexDirection:'row',
    alignContent: 'center',

  },
  textContainer: (type) => ({
    padding:5,
    borderColor:COLORS.gray2,
    marginTop:SIZES.xxLarge/1.5,
    marginBottom:SIZES.xxLarge/1.5,
    backgroundColor: (type !=="value")?COLORS.primary:'white',
    borderRadius:SIZES.xSmall/4,
  }),
  textVal: (type) => ({
    fontSize:SIZES.medium,
    textAlign:'center',
    padding:2,
    paddingTop:5,
    //font family
    color:(type !== "value")? COLORS.white: COLORS.gray,

  }),
  column:{
    flex:1,
    margin:SIZES.xSmall,
    marginBottom:SIZES.xLarge,
  },

});

export {styles};