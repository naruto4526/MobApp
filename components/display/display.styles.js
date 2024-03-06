import { StyleSheet } from "react-native";
import { COLORS,FONTS,SIZES,SHADOWS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  btn:(name,activeTab) => ({
    paddingVertical:SIZES.medium,
    paddingHorizontal:SIZES.xLarge,
    backgroundColor:name===activeTab?COLORS.primary:"white",
    borderRadius:SIZES.small/4,
    marginLeft:2,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  btnText: (name, activeTab) => ({
    fontFamily: "monospace",
    fontSize: SIZES.medium,
    color: name === activeTab ? 'white' : "#AAA9B8",
  }),
});

export {styles};