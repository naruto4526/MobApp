import React, {useState,  useEffect} from 'react';
import {Text, View, TextInput, Button, FlatList, TouchableOpacity} from 'react-native';
import { styles } from './settings.styles';
import { storage } from '../../hook/useStore';
import { createUser, updateUser } from '../../src/graphql/mutations';
import { listUsers } from '../../src/graphql/queries';
import DropDownPicker from 'react-native-dropdown-picker';
import { generateClient } from 'aws-amplify/api';
import { savePatientData } from '../../hook/savePatientData';
const client = generateClient();

const PatientItem = ({patient}) => {
  return (<View style = {styles.patient}>
            <Text style = {styles.patientText}>{patient[0]}</Text>
            <Text style = {styles.patientText}> {patient[1]}</Text>
            <Button title = "Access" style = {{backgroundColor : 'white'}} onPress = {() => {savePatientData(patient[1])}}/>
          </View>)
}
const Settings = () => {
  const [patientList, setPatientList] = useState(storage.contains('patientList') ? storage.getString('patientList') : '');
  const [patientId, setPatientId] = useState('');
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
      
      <View style = {{flex : 3}}>
        {storage.getString('role') !== 'Patient' ?
          <View style = {{flex : 2}}>
          <View style = {[styles.nameBox, { margin :15}]}>
            <Text style = {styles.text}>UserId: </Text>
            <TextInput
              onChangeText={(text) => {
                setPatientId(text);
              }}
              value = {patientId}
              style = {{ height: 40,margin: 12,borderWidth: 0.9,borderRadius :5, padding: 10,flex:1, backgroundColor: 'white'}}
            />
            <Button title =  "Add Patient" onPress={async () => {
                let response;
                const filter = {
                  userId : {
                    eq : patientId
                  }
                };
                try {
                  response = await client.graphql({
                    query : listUsers,
                    variables : {
                      filter : filter
                    }
                  })
                } catch (err) {
                  console.log(err);
                } finally {
                  console.log(response.data.listUsers.items?.at(0));
                  const patientInfo = response?.data?.listUsers?.items?.at(0);
                  if (patientInfo) {
                    const toAdd = patientInfo.name + ',' + patientInfo.userId;
                    if (patientList) {
                      if(!patientList.includes(toAdd)) {
                        setPatientList(patientList + ';' + toAdd);
                        storage.set('patientList', patientList + ';' + toAdd);
                      }
                    } else {
                      setPatientList(toAdd);
                      storage.set('patientList', toAdd);
                    }
                  }
                }
            }}/>
          </View>
          <View styles = {{flex : 2}}>
            {patientList.split(';').map((patient, index) => {
              patient = patient.split(',');
              if (!patientList) return;
              return (
                <PatientItem patient = {patient} key = {index}/>
              )
            })}
          </View>
        </View> : 
          <Text></Text>
        }
      </View>
    </View>
  );
};


export {Settings};


// get userObj, dates array and get hashes array, get vitalObj, sympObj, medObj, put patientId as userId of patient. 
// create obj for each date, and create sympObjList if sympObj exists and vitalObjList if vitalObjexists.
//create obj for each hash, and attach the medObjs to these hashes objects
// finally store all the collected informaion in the right key - value pairs.