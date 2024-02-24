import { StyleSheet } from "react-native";
import { COLORS,FONTS,SIZES,SHADOWS } from "../../constants";

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 10,
  },
  modalView: {
    flex:1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  medication: {
    flex:1,
    margin:-15,
    borderRadius:20,
    padding:15,
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0,
    backgroundColor:'#2196F3',
  },
  button: {
    margin:5,
    flex:1,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 0,
    textAlign: 'center',
  },
})

export {styles};