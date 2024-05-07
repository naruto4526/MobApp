import React, {useEffect, useState} from 'react';
import {View, Text,TouchableOpacity, ScrollView, Button} from 'react-native';
import { getAgain } from '../../hook/getAgain';
import { timeout } from '../../hook/timeout';

async function logMovies() {
  const response = await fetch('http://192.168.43.27:8080/fall');
  const movies = await response.json();
  return movies;
}

const Debug = ({navigation}) =>{
  const [response, setResponse] = useState('Hello there');
  useEffect(() => {
    console.log("here");
    logMovies().then((response) => {
      console.log(response);
      setResponse(JSON.stringify(response));
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <View style = {{flex:1}}>
      <Text>
        {response}
      </Text>
      <Button onPress={() => {
        console.log("New call hereeee");
        console.log();
        getAgain(3000, navigation);
      }} title = "Start"/>
      <Button onPress = {() => {
        timeout.clearAllTimeouts();
        console.log("Cleared all timeouts");
      }} title = "Stop" style = {{marginTop:50}}/>
      <Button onPress = {() => {
        navigation.navigate('Home');
      }} title = "Home" style = {{marginTop:50}}/>
    </View>
  );
};

export {Debug};