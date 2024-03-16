import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'flex-start',
    margin: 22,
    marginTop : 30,
    borderRadius : 10,
    borderWidth : 2,
    padding : 10,
    borderColor : COLORS.gray
  },
  text : {
    fontSize : SIZES.medium*1.2,
    fontFamily : 'monospace',
    color: COLORS.gray,
    margin : 3
  },
  nameBox : {
    flexDirection : 'row',
    flex : 1,
    alignItems : 'center',
    justifyContent:'space-between'
  }
});

export {styles};