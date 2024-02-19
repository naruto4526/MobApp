import React from 'react';
import {View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Home,Vitals,Reminders,Symptoms,StepCount,NewReminder,Settings} from '../components';

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>It works sr</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Vitals" component={Vitals} />
        <Stack.Screen name="Reminders" component={Reminders} />
        <Stack.Screen name="Track Symptoms" component={Symptoms}/>
        <Stack.Screen name="Step Count" component={StepCount}/>
        <Stack.Screen name="NewReminder" component={NewReminder} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
