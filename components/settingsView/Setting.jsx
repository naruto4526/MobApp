import React, {useState} from 'react';
import {Alert, Modal, Text, Pressable, View, TextInput, Button} from 'react-native';
import { styles } from './settings.styles';
import { storage } from '../../hook/useStore';
import { createUser, updateUser } from '../../src/graphql/mutations';
import DropDownPicker from 'react-native-dropdown-picker';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();

const Settings = () => {

  const [name, setName] = useState(storage.contains('name')?storage.getString('name'):'');
  const [role, setRole] = useState(storage.getString('role'));
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Patient', value: 'Patient'},
    {label: 'Doctor', value: 'Doctor'},
    {label: 'Caregiver', value: 'Caregiver'}
  ]);
  const mutateUser = async (userData, query) => {
    let data;
    try {
      data = await client.graphql({
        query: query,
        variables: {
          input: userData
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log(data);
      console.log('user edited')
    }
  }
  return (
    <View style = {{flex: 1}}>
      <View style={styles.centeredView}>
        <View style = {styles.nameBox}>
          <Text style = {styles.text}>Name: </Text>
          <TextInput
            onChangeText={(text) => {
              setName(text);
              storage.set('name', text);
            }}
            value = {name}
            style = {{ height: 40,margin: 12,borderWidth: 0.9,borderRadius :5, padding: 10,flex:1, backgroundColor: 'white'}}
          />
        </View>
        <View style = {styles.nameBox}>
          <Text style = {styles.text}>UserId: </Text>
          <TextInput
            value = {storage.getString('userId')}
            style = {{ height: 40,margin: 12,borderWidth: 0.9, borderRadius: 5,padding: 10,flex:1, backgroundColor: 'white', color:'black'}}
            editable = {false}
          />
        </View>
        <View style = {styles.nameBox}>
          <Text style = {styles.text}>Role: </Text>
          <DropDownPicker
            open={open}
            value={role}
            items={items}
            setOpen={setOpen}
            setValue={(value) => {
              setRole(value());
              storage.set('role', value());
            }}
            setItems={setItems}
            containerStyle = {{ height: 40, width : 230,margin: 12}}
          />
        </View>
        <View style = {{flex:1, marginTop:10, justifyContent : 'center', alignItems:'flex-end', flexDirection:'row'}}>
          <Button title = 'save' style = {{padding:5,}}
            onPress = {() => {
              const userData = {userId : storage.getString('userId'), name : name};
              if(storage.contains('savedBefore')) {
                //updateUser
                mutateUser(userData, updateUser);
              }
              else {
                mutateUser(userData, createUser);
                storage.set('savedBefore', 'true');
              }
            }}
          />
        </View>
      </View>
      <View style = {{flex : 2}}>
        <View styles = {styles.centeredView}>
            {!(role === 'Patient')?
              <View >
                <Text>works</Text>
              </View>
              :<Text></Text>
            }
        </View>
      </View>
    </View>
  );
};


export {Settings};