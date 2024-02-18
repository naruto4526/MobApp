import React,{useState,useEffect} from 'react';
import {View,Text,TouchableOpacity,ActivityIndicator} from 'react-native';
import { COLORS } from '../../constants';
import { Display } from '../display/Display';

const Vitals = () => {

  const [data,setData] = useState({
    Hb: [
      null,
      null,
      '14.16947705626972',
      '13.42469819688733',
      '10.88679140329986'
    ],
    RBC: [
      null,
      null,
      '5.089401281382495',
      '4.806385314817187',
      '3.841980733253948'
    ],
    Temp: [ null, '30.94', null, null, null ],
    SpO2: [ null, null, '97', '96', '92' ],
    Hr: [ null, null, '70', '70', '70' ]
  });
  //change initial state to true and uncomment the below, and then initialize data to zero
  const [loading,setLoading] = useState(false);
  const getData = async () => {
      const response = await fetch("https://api.thingspeak.com/channels/2125743/feeds.json?api_key=4L15DSU8CJBHK2UG&results=6");
      const data = await response.json();
      let info = {
        Hb:['g/dl'],
        RBC:['mcL'],
        Temp:['C'],
        SpO2:['%'],
        Hr:['bpm'],
        Date:[],
        Time:[],
      }
      for(let obj of data.feeds) {
        let dateTime = new Date(obj.created_at);
        info.Hr.splice(-1,0,obj.field4==null?0:obj.field4);
        info.Hb.splice(-1,0,obj.field6==null?0:obj.field6.slice(0,5));
        info.RBC.splice(-1,0,obj.field7==null?0:obj.field7.slice(0,4));
        info.Temp.splice(-1,0,obj.field8==null?0:obj.field8);
        info.SpO2.splice(-1,0,obj.field5==null?0:obj.field5);
        info.Date.push(dateTime.getDate() + '/' + dateTime.getMonth() + '/' + (dateTime.getFullYear()-2000));
        info.Time.push((dateTime.getHours()<10?'0':'') + dateTime.getHours() + ':' +(dateTime.getMinutes()<10?'0':'') +dateTime.getMinutes());
      }
      return info;
  }
  if(loading) {
    getData().then(info=> {
      setData(info);
      setLoading(false);
    });
  }
  
  return(
    <View style = {{flex:1,margin:10}}>
      {loading?(<ActivityIndicator size = "large" colors = {COLORS.primary}/>)
      :(<Display data = {data} refetch = {getData}/>)}
   </View>
  );
};

export {Vitals};

//  <Text>{JSON.stringify(data)}</Text>