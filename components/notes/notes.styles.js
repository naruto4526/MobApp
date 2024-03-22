import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

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
  msgContainer : (role) => ({
    flex : 1,
    margin : 10,
    padding : 5,
    backgroundColor : !(role === 'Patient') ? "#77a7fc" : 'pink',
    width : '96%',
    borderRadius : 5
  }),
  subject : {
    margin : 5,
    marginLeft : 10,
    borderBottomWidth : 1,
    borderBottomColor : COLORS.gray,
    padding : 10
  },
  subjectText : {
    fontFamily : 'monospace',
    fontSize : SIZES.xLarge,
  },
  body : {
    margin : 5,
    marginLeft : 10,
    padding : 10
  },
  bodyText : {
    fontFamily : 'monospace',
    fontSize : SIZES.medium,
    textAlign : 'justify'
  }
  
})

export {styles};