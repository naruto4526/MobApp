import { StyleSheet } from "react-native";
import { COLORS,FONTS,SIZES,SHADOWS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex:20,
  },
  addButton : {
    height:60,
    width:60,
    borderRadius:30,
    margin:15,
    padding:10,
    backgroundColor:'#2196F3',
    alignContent:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:20,
    right:20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText : {
    textAlign:'center',
    color:'white',
    fontSize:SIZES.xLarge,
  },
  modePicker : {
    flexDirection:'row',
    flex:1.5,
    padding:10,
    justifyContent:'space-around'
  },
  picker: (on) => ({
    backgroundColor:on ? '#2196F3' : COLORS.lightWhite,
    width : '45%',
    justifyContent:'center',
    padding:10,
    borderRadius : 5
  }),
  pickerText :(on) => ({
    fontFamily:'monospace',
    textAlign:'center',
    color : on? COLORS.white : '#2196F3',
  }),
  dateContainer : {
    marginTop:25,
    marginBottom:10,
    borderBottomWidth:2,
    borderBlockColor: COLORS.gray,
    marginLeft:15,
    marginRight:15,
  },
  dateDate : {
    fontFamily:'monospace',
    fontSize:SIZES.medium,
    marginBottom:5,
  }
});

export {styles};