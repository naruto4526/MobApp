import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import { getAgain } from '../../hook/getAgain';
import { timeout } from '../../hook/timeout';

const Resources = () => {
  useEffect(() => {
    console.log("New call hereeee");
    console.log();
    getAgain(3000);
  }, []);
  return (
    <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>to be built</Text>
      <Button title = "delete events" onPress = {() => {timeout.clearAllTimeouts()}} />
    </View>
  );
};

export {Resources};