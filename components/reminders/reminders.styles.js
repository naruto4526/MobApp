import { StyleSheet } from "react-native";
import { COLORS,FONTS,SIZES,SHADOWS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin:5,
    marginLeft:5,
    marginRight:5,
    flexDirection:'row',
    alignContent:'space-between',
  },

  textContainer: {
    flex : 5,
    padding:15,
    margin:5,
    marginBottom:0,
    borderRadius:5,
    backgroundColor:COLORS.primary,
  },

  text: {
    fontSize:SIZES.medium,
    color:COLORS.white,
    fontFamily:'monospace'
  },
  

})

export {styles};