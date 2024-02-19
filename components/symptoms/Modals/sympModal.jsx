import React, {useState, useEffect} from 'react';
import {ScrollView,Text, Button, View, TextInput,TouchableOpacity} from 'react-native';
import {styles} from './modals.style.js';
import { storage } from '../../../hook/useStore.jsx';
import { SIZES } from '../../../constants/index.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Slider from '@react-native-community/slider';
import { Meds } from '../details/Details.jsx';
import { useIsFocused } from '@react-navigation/native';


//Fill the modal with data collecting options.
const Delete = () => {
  //delete sympObj here.
}

const SympModal = ({sympObj,setSympModalVisible, navigation}) => {
  let sympSeverity = sympObj?.sympSeverity??0;
  const [text,onChangeText] = useState(sympObj?sympObj.title:'');
  const [meds,setMeds] = useState([]);
  const [selectedArray,setSelectedArray] = useState();
  const [descriptionText,setDescriptionText] = useState(sympObj?sympObj.description:'') 
  const [height, setHeight] = useState(0);
  const isFocused = useIsFocused();
  
  useEffect( () => {
    let data = storage.getString('hashes'); 
    if(data != null) {
      data = data.split(',');
      data = data.map(item => JSON.parse(storage.getString(item)));
    }
    setMeds(data);
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
          <View style = {{flex:4,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text style = {{color:'white', fontFamily:'monospace',fontSize:SIZES.medium}}>0</Text>
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
                sympSeverity = value;
                console.log(sympSeverity);
              }}
            />
            <Text style = {{color:'white', fontFamily:'monospace',fontSize:SIZES.medium}}>10</Text>
          </View>
        </View>
      </View>
      <View style = {{flex:2,margin:5,alignItems:'center',margin:20,padding:10}}>
              <Meds medNames = {meds} 
                    // type = {date}
                    handlePress={() => {
                      //function that will check current state of the object. If not selected before, it will add current med to the list of selected meds. It will also make the slider available. And when the user changes the slider, he will be setting the value for the currently selected
                    }} 
                    navigation = {navigation}
                    selectedArray={selectedArray}
                    setSelectedArray={setSelectedArray}
                    setSympModalVisible={setSympModalVisible}
              />
      </View>
      <View style = {{flex:4, marginTop:10}}>
          <Text style = {{marginTop:10,padding:10, fontFamily:'monospace', fontSize:SIZES.large}}>
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
              // if(sympObj != null) {
              //   Delete(sympObj);
              // }
              // sympObj = {
              //   ids:"",
              //   title:text,
              //   time:time,
              //   days:days,
              //   description:descriptionText,
              //   hashCode:uuid(),
              // }
              // saveEvent(hashObj).then( () => {
              //   //refresh page function
              //   setSympModalVisible(false);
              // })
                setSympModalVisible(false);
              }}>
            <Text style={styles.textStyle}>Save</Text>
        </TouchableOpacity>
        {
          //onPress will call a delete hook first.
          sympObj?(<TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            Delete(sympObj);
            navigation.goBack();
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

export {SympModal};

