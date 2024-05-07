import React,{useState,useEffect} from 'react';
import {View,Text,TouchableOpacity,ActivityIndicator} from 'react-native';
import { COLORS } from '../../constants';
import { Display } from '../display/Display';
import { IP } from '../../constants';

const getData = async (number) => {
  const response = await fetch(IP + '/vitals/list');
  //${number}
  const data = await response.json();
  let info = {
    Hb:['g/dl'],
    RBC:['mcL'],
    Temp:['C'],
    SpO2:['%'],
    HR:['bpm'],
    Date:[],
    Time:[],
  }
  for(let obj of data.feeds) {
    let dateTime = new Date(obj.created_at);
    info.HR.splice(-1,0,obj.field3==null?0:obj.field3);
    info.Hb.splice(-1,0,obj.field1==null?0:obj.field1.slice(0,5));
    info.RBC.splice(-1,0,obj.field2==null?0:obj.field2.slice(0,4));
    info.Temp.splice(-1,0,obj.field5==null?0:obj.field5);
    info.SpO2.splice(-1,0,obj.field4==null?0:obj.field4);
    info.Date.push(dateTime.getDate() + '/' + (dateTime.getMonth() + 1)+ '/' + (dateTime.getFullYear()-2000));
    info.Time.push((dateTime.getHours()<10?'0':'') + dateTime.getHours() + ':' +(dateTime.getMinutes()<10?'0':'') +dateTime.getMinutes());
  }
  return info;
}

const Vitals = () => {

  const [data,setData] = useState([]);
  //change initial state to true and uncomment the below, and then initialize data to zero
  const [loading,setLoading] = useState(true);

  useEffect(() => {
      getData(6).then(info=> {
        setData(info);
        setLoading(false);
      })
    },[]);
    
  
  return(
    <View style = {{flex:1,margin:10}}>
      {loading?(<ActivityIndicator size = "large" colors = {COLORS.primary}/>)
      :(<Display data = {data} refetch = {getData}/>)}
   </View>
  );
};

export {Vitals, getData};

//  <Text>{JSON.stringify(data)}</Text>