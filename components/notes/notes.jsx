import React, {useState, useEffect} from 'react';
import {Modal, View, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './notes.styles';
import { SIZES } from '../../constants';
import { storage } from '../../hook/useStore';
import { createChat } from '../../src/graphql/mutations';
import { listChats } from '../../src/graphql/queries';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();

const compareDates = (d1, d2) => {
  let date1 = new Date(d1.createdAt).getTime();
  let date2 = new Date(d2.createdAt).getTime();

  if (date1 <= date2) return 1;
  else return -1;
};

const saveText = async (title, body) => {
  let response;
  const chatInput = {
    userId : storage.contains('patientId') ? storage.getString('patientId') : storage.getString('userId'),
    text : title + '<>/<>' + body,
    type : storage.getString('role')
  }
  try {
    response = await client.graphql({
      query : createChat,
      variables : {
        input : chatInput
      }
    })
  } catch (err) {
    console.log(err);
  } finally {
    console.log(response);
  }
}

const listChat = async () => {
  let response;
  const filter = {
    userId : {
      eq : storage.contains('patientId') ? storage.getString('patientId') : storage.getString('userId')
    }
  };
  try {
    response = await client.graphql({
      query : listChats,
      variables : {
        filter : filter
      }
    })
  } catch (err) {
    console.log(err);
  } finally {
    console.log(response);
    return response?.data?.listChats?.items;
  }
}

const DialogBox = ({chatArray}) => {
  if (!chatArray) return;
  chatArray = chatArray.map((item) => {
    const itemArray = item.text.split('<>/<>');
    itemArray.push(item.type);
    return itemArray;
  });
  chatArray = chatArray.filter((item) => {
    return item[0] !== 'undefined' && item[1] !== 'undefined';
  });
  return (
    <View style = {{flex : 1, margin : 10, alignItems : 'center'}}>
      {chatArray ? chatArray.map((text) => {
        return (
          <View style = {styles.msgContainer(text[2])} key = {text[0]}> 
            <View style = {styles.subject}>
              <Text style = {styles.subjectText}>{text[0]}</Text>
            </View>
            <View style = {styles.body}>
              <Text style = {styles.bodyText}>{text[1]}</Text>
            </View>
          </View>
        )
      }) : <Text></Text>}
    </View>
  )
}

const AddNote = ({setModalVisible}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [height, setHeight] = useState(0);
  return (
    <KeyboardAwareScrollView>
    <View style = {[styles.centeredView,styles.modalView]}>
      <View style = {styles.medication}>
        <Text style = {{padding:15, color:'white', fontFamily:"monospace", fontSize:SIZES.large}}>Subject:</Text>
        <TextInput
          onChangeText={setTitle}
          value = {title}
          style = {{ height: 40,margin: 12,padding: 10,flex:1,backgroundColor:'white'}}
        />
      </View>
      <View style = {{flex:5,marginTop:10,}}>
          <Text style = {{marginTop:10,padding:10, fontFamily:'monospace', fontSize:SIZES.large}}>Description:</Text>
          <TextInput
            onChangeText={setBody}
            value = {body}
            style = {{ height: Math.max(300, height),margin: 12,borderWidth: 0.5,padding: 10,flex:1}}
            multiline = {true}
            numberOfLines={10}
            textAlignVertical='top'
            onContentSizeChange={(event) =>
              setHeight(event.nativeEvent.contentSize.height)
            }
          />
        </View>
        <View style = {{flexDirection:'row',justifyContent:'space-evenly'}}>
        <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
                saveText(title, body);
                setModalVisible(false);
              }}>
            <Text style={styles.textStyle}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text style={styles.textStyle}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAwareScrollView>
  )
}


const Notes = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [chatArray, setChatArray] = useState(null);
  
  useEffect(() => {
    listChat().then((chatArray) => {
      chatArray.sort(compareDates);
      setChatArray(chatArray);
    });
  }, [modalVisible]);
  return (
      <View style = {{flex : 1}}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <AddNote 
            setModalVisible = {setModalVisible}
          />
      </Modal>
      <ScrollView>
      {chatArray ? <DialogBox chatArray={chatArray} /> : <Text></Text>}
      </ScrollView>
        <TouchableOpacity onPress = {() => {
          setModalVisible(true);
      }} style = {styles.addButton}>
            <Text style = {styles.buttonText}>+</Text>
      </TouchableOpacity>
      </View>
  );
};

export {Notes};


// listChats(filter: {userId: {eq: ""}}) {
//   items {
//     id
//     createdAt
//     text
//     type
//     userId
//   }
// }
