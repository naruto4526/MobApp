import { StyleSheet } from "react-native";
import { COLORS,FONTS,SIZES,SHADOWS } from "../../../constants";

const styles = StyleSheet.create({
  container: {

  },
  vitalText : {
    flexDirection: 'row',
    padding:7,
    margin:5,
    borderWidth:1,
    borderRadius:5,
    borderColor:'#ff584d',
    color: '#ff584d',
  },
  medButton : (type) => ({
    margin:7,
    padding:7,
    backgroundColor: (type == 'selected'?'#b5dfff':(type == 'inMap'?'#2196F3':'white')),
    borderColor: (type == 'notSelected'?'#2196F3':type == 'selected'?'#0079d9':'#2196F3'),
    borderWidth:2,
    borderRadius:10,
    elevation:type == 'selected'?1:3,
    justifyContent:'center'
  }),
  medContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sympText : {
    fontSize:SIZES.large, 
    margin:5,
    fontFamily:'monospace',
    fontSize:SIZES.large,
    color:'white'
  }
});


export {styles}