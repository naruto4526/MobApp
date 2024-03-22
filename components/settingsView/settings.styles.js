import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  centeredView: {
    flex: 2,
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
    alignItems : 'center',
    justifyContent:'space-between'
  },
  patient : {
    flexDirection : 'row',
    backgroundColor : COLORS.tertiary,
    borderRadius : 5,
    margin : 10,
    padding : 10,
    justifyContent : 'space-between'
  },
  patientText : {
    fontSize : SIZES.medium*1,
    fontFamily : 'monospace',
    color: COLORS.white,
    margin : 3
  }
});

export {styles};