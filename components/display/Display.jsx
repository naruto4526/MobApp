import React,{useState} from 'react';
import {View,Text, TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import { COLORS } from '../../constants';
import {styles} from './display.styles'
import { Graphical } from './graphical/Graphical';
import { Tabular } from './tabular/Tabular';

const displayContent = (activeTab,data) => {
  switch(activeTab) {
    case 'Tabular':
      return (<Tabular data = {data}/>);
    case 'Graphical':
      return (<Graphical data = {data}/>);
  }
}


const Display = ({data,refetch}) => {
  const [Data,setData] = useState(data);
  const [activeTab,setActiveTab] = useState("Tabular");
  const [loading,setLoading] = useState(false);
  
  return (
    <View style = {{flex:1}}>
      <View style = {styles.container}>
        <View style = {{flex:5, flexDirection:'row', justifyContent:'space-evenly'}}>
          
          <TouchableOpacity onPress = {() => {setActiveTab('Tabular')}} style = {styles.btn('Tabular',activeTab)}>
            <Text style = {styles.btnText('Tabular',activeTab)}>Tabular</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => {setActiveTab('Graphical')}} style = {styles.btn('Graphical',activeTab)}>
            <Text style = {styles.btnText('Graphical',activeTab)}>Graphical</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.btn('Refresh',activeTab)} onPress={() => {
            setLoading(true);
            refetch().then(movies => {
              setData(movies);
              setLoading(false);
            })
          }}>
            <Text>Ref</Text>
          </TouchableOpacity>

        </View>

        
      </View>

      <View style = {{flex:13,backgroundColor:COLORS.primary,marginTop:-3, borderRadius:16}}>
        <ScrollView style ={{margin:10,backgroundColor:COLORS.white,borderRadius:10,}}>
          {loading?(<View style = {{marginTop:300}}>
            <ActivityIndicator size = "large" colors = {COLORS.primary}/>
            </View>)
            :displayContent(activeTab,Data)}
        </ScrollView>
      </View>
      
    </View>
  );
};

export {Display};