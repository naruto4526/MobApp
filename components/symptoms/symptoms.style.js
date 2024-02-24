import { StyleSheet } from "react-native";
import { COLORS,FONTS,SIZES,SHADOWS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex:1,

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
  }
});

export {styles};