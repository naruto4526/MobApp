import React, {useState, useEffect} from 'react';
import {ScrollView,Text, Button, View, TextInput,TouchableOpacity} from 'react-native';
import {styles} from './modals.style.js';
import { storage } from '../../../hook/useStore.jsx';
import { SIZES } from '../../../constants/index.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Slider from '@react-native-community/slider';
import { Meds } from '../details/Details.jsx';
import { useIsFocused } from '@react-navigation/native';
import { createSympObj, updateSympObj, deleteSympObj, updateUser } from '../../../src/graphql/mutations.js';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();

//changed the object structure again. Look into all functions that fetches object from storage.
//Fill the modal with data collecting options.
const saveOrUpdate = async (sympObj, update, create) => {
  let id;
  let response;
  //console.log(sympObj);
  try {
    if(sympObj.id) {
      //update sympObj
      id = sympObj.id;
      await client.graphql({
        query : update,
        variables : {
          input : sympObj
        }
      })
    }
    else {
        response = await client.graphql({
        query : create,
        variables : {
          input : sympObj
        }
      });
    }
  } catch (err) {
      console.log(err);
  } finally {
    if(id) return id;
    if(response.data.createSympObj) return response.data.createSympObj.id;
    else if(response.data.createMedObj) return response.data.createMedObj.id;
  }
}
const Delete = (selected, symptom) => {
  if(!storage.getString(selected)) return;
  let dateObj = JSON.parse(storage.getString(selected));
  let sympObjList = dateObj.sympObjList;
  sympObjList = sympObjList.filter((obj) => obj.symptom !== symptom);
  dateObj.sympObjList = sympObjList;
  if(sympObjList.length > 0 || (dateObj.vitalObjList && dateObj.vitalObjList.length > 0)) storage.set(selected,JSON.stringify(dateObj));
  else {
    let dates = storage.getString('dates');
    dates = dates.split(',');
    dates.splice(dates.indexOf(selected), 1);
    dates = dates.join(',');
    storage.set('dates', dates);
    storage.delete(selected);
  }
}

const save = (sympObj) => {
  let dateObj = storage.getString(sympObj.date);
  if(dateObj) {
    dateObj = JSON.parse(dateObj);
    if(dateObj.sympObjList)dateObj.sympObjList.push(sympObj);
    else dateObj.sympObjList = [sympObj];
  }
  else {
    dateObj = {
      sympObjList : [sympObj]
    }
  }
  let dates = storage.getString('dates');
  if(!dates || !dates.includes(sympObj.date)) {
    if(!dates) dates = sympObj.date
    else dates += ',' + sympObj.date;
    storage.set('dates',dates);
  }
  storage.set(sympObj.date, JSON.stringify(dateObj));
}
const updateDate = async () => {
  const query = updateUser;
  const userData = {userId : storage.getString('userId'), dates : storage.getString('dates'), hashes : storage.getString('hashes')!== null?storage.getString('hashes'):''}
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
      // console.log(data);
      // console.log('user edited')
    }
}
const CustomSlider = ({selectedMed,selectedMap,setSelectedMap}) => {
  return (
    <Slider
      style={{width: 250, height: 40,}}
      minimumValue={0}
      maximumValue={10}
      minimumTrackTintColor="#2196F3"
      maximumTrackTintColor="#023e9e"
      step = {1}
      thumbTintColor='#70c4ff'
      value = {selectedMap.get(selectedMed)??0}
      onSlidingComplete={(value) => {
        let newMap = new Map(selectedMap);
        newMap.set(selectedMed,value);
        setSelectedMap(newMap);
      }}
    />
  );
}

const SympModal = ({sympObj,setSympModalVisible, navigation, selected}) => {
  const [sympSeverity,setSympSeverity] = useState(sympObj?parseInt(sympObj.sympSeverity):0);
  let medMap = new Map();
  const [text,onChangeText] = useState(sympObj?sympObj.symptom:'');
  const [descriptionText,setDescriptionText] = useState(sympObj?sympObj.notes:''); 
  const [meds,setMeds] = useState([]);
  const [selectedMap,setSelectedMap] = useState(medMap);
  const [selectedMed,setSelectedMed] = useState('');
  const [height, setHeight] = useState(0);
  const isFocused = useIsFocused();

  useEffect( () => {
    let data = storage.getString('hashes'); 
    if(data != null) {
      data = data.split(',');
      data = data.map(item => JSON.parse(storage.getString(item)));
    }
    else setSelectedMap(new Map());
    for(const key of selectedMap.keys()) {
      if(data.find((elem) => {
        elem.title === key;
      })) continue;
      else {
        let tempMap = new Map(selectedMap);
        tempMap.delete(key);
        setSelectedMap(tempMap);
      }
    }
    setMeds(data);
    if(sympObj) {
      const medHashes = sympObj.medHashes.split(',');
      const medPotency = sympObj.medPotency.split(',');
      for(let index in medHashes) {
        medMap.set(medHashes[index],parseInt(medPotency[index]));
      }
      if(selectedMap.size === 0){
        setSelectedMap(medMap);
        console.log('new map is ');
        console.log(selectedMap);
      }
    }

  },[isFocused]);
 
  return (
    <KeyboardAwareScrollView>
    <View style = {[styles.centeredView,styles.modalView]}>
      <View style = {styles.medication}>
        <Text style = {{padding:15, color:'white',fontFamily:"monospace",fontSize:SIZES.xLarge}}>Symptom:</Text>
        <TextInput
          onChangeText={onChangeText}
          value = {text}
          style = {{ height: 40,margin: 12,padding: 10,flex:1,backgroundColor:'white'}}
        />
        <View style = {{flex:1,margin:10}}>
          <View style = {{flex:1,margin:5,}}>
            <Text style = {{color:'white', fontFamily:'monospace',fontSize:SIZES.medium}}>Severity:</Text>
          </View>
          <View style = {styles.sliderContainer}>
            <Text style = {styles.sliderNumber(false)}>0</Text>
            <Slider
              style={{width: 250, height: 40,}}
              minimumValue={0}
              maximumValue={10}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#023e9e"
              step = {1}
              thumbTintColor='#70c4ff'
              value = {sympSeverity}
              onSlidingComplete={(value) => {
                setSympSeverity(value);
              }}
            />
            <Text style = {styles.sliderNumber(false)}>10</Text>
          </View>
        </View>
      </View>
      <View style = {styles.medContainer}>
        <View style = {{margin:10}}>
                <Meds medNames = {meds} 
                      // type = {date}
                      navigation = {navigation}
                      selectedMap={selectedMap}
                      setSelectedMap={setSelectedMap}
                      selectedMed = {selectedMed}
                      setSelectedMed = {setSelectedMed}
                      setSympModalVisible={setSympModalVisible}
                      addItem = {true}
                      allowPress = {true}
                />
        </View>
        {selectedMed?
        (<View style = {{flex:2,margin:5, padding:15,}}>
          <View style = {{flex:2}}>
            <Text style = {{color:'#2196F3', fontFamily:'monospace',fontSize:SIZES.medium,marginBottom:5,}}>Potency:</Text>
          </View>
          <View style = {styles.sliderContainer}>
            <Text style = {styles.sliderNumber(true)}>0</Text>
            <CustomSlider 
              selectedMap={selectedMap} 
              selectedMed={selectedMed}
              setSelectedMap = {setSelectedMap}
              />
            <Text style = {styles.sliderNumber(true)}>10</Text>
          </View>
        </View>
        )
        :<Text></Text>}
      </View>
      <View style = {{flex:4,marginTop: -25}}>
          <Text style = {{padding:10, fontFamily:'monospace', fontSize:SIZES.large}}>
            Notes:
          </Text>
          <TextInput
            onChangeText={setDescriptionText}
            value = {descriptionText}
            style = {{ height: Math.max(100, height),margin: 10,borderWidth: 0.5,padding: 10,flex:1}}
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
              //refill hashObj by collecting data from the modal before sending it to be saved.
              //uncomment below code to save after checking the logic of it.
                if(sympObj != null) {
                  Delete(sympObj.date, sympObj.symptom);
                }
                let medHashes = [];
                let medPotency = [];
                for(let entry of selectedMap.entries()) {
                  medHashes.push(entry[0]);
                  medPotency.push(entry[1]);
                }
                medHashes = medHashes.join(',');
                medPotency = medPotency.join(',');
                if(!sympObj) sympObj = {}
                sympObj.userId =storage.getString('userId');
                sympObj.date = selected;
                sympObj.symptom = text;
                sympObj.notes = descriptionText;
                sympObj.sympSeverity = sympSeverity;
                sympObj.medHashes = medHashes;
                sympObj.medPotency = medPotency;
                
                saveOrUpdate(sympObj, updateSympObj, createSympObj).then((id) => {
                  sympObj.id = id;
                  save(sympObj);
                  updateDate();
                  setSympModalVisible(false);
                });
              }}>
            <Text style={styles.textStyle}>Save</Text>
        </TouchableOpacity>
        {
          //onPress will call a delete hook first.
          sympObj?(<TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={async () => {
            Delete(sympObj.date, sympObj.symptom);
            if(sympObj.id) {
              await client.graphql({
                query : deleteSympObj,
                variables : {
                  input : {id :sympObj.id}
                }
              });
            }
            updateDate();
            setSympModalVisible(false);
            }}>
          <Text style={styles.textStyle}>Delete</Text>
          </TouchableOpacity>)
          :(<Text></Text>)
        }
        <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    //refresh page
                    setSympModalVisible(false);
                  }}>
                  <Text style={styles.textStyle}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAwareScrollView>

  );
};

export {SympModal, updateDate, saveOrUpdate};

