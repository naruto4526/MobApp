import React, { useEffect, useState } from "react";
import { Button, View, Text, TextInput, ScrollView, Touchable, TouchableOpacity } from "react-native";
import { storage } from '../../hook/useStore';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { styles } from "./stepcount.styles";
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { COLORS } from "../../constants";


const StepCount = () => {
  const dateTime = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const [stepCount, setStepCount] = useState(storage.contains('stepCount') ? JSON.parse(storage.getString('stepCount')) : {
    stepCount : 500,
    entryId : -1,
    createdAt : ''
  });
  const [dateString, setDateString] = useState((dateTime.getHours()<10?'0':'') + dateTime.getHours() + ':' +(dateTime.getMinutes()<10?'0':'') +dateTime.getMinutes());
  const [goal, setGoal] = useState(storage.contains('goal') ? parseInt(storage.getString('goal')) : 1000)
  const [fill, setFill] = useState(null);
  const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

  useEffect(() => {
    setFill('');
    if(stepCount.createdAt) {
      const date = new Date(stepCount.createdAt);
      setDateString(date.toLocaleDateString());
    }
  }, [stepCount]);
  
  return (
    <ScrollView>
    <View style = {{flex : 1, margin : 20, padding : 10}}>
      <View style = {{flex:1, justifyContent:'center', alignItems:'center', margin : 5}}>
        <AnimatedCircularProgress
        size={270}
        width={30}
        onAnimationComplete={() => {
          setFill(parseInt(stepCount.stepCount));
        }}
        backgroundColor="#3d5875" 
        fill={Math.floor((stepCount.stepCount / goal) * 100) }
        tintColor="#4287f5">
        {
          () => (
            <Text style = {[styles.number,{}]}>
              {fill}
            </Text>
          )
        }
        </AnimatedCircularProgress>
      </View>
      <View style = {styles.timeContainer}>
       <Text>Last refreshed at</Text>  
       <Text>:</Text>
       <Text>{dateString ?? ''}</Text>
      </View>
      <View style = {styles.goalContainer}>
          <Text style = {styles.text}>Set Goal : </Text>
          <View style = {{flex : 1, flexDirection : 'row', alignItems : 'center'}}>
            <TextInput
              value = {'' + goal}
              style = {{ height: 40, width : 100, margin: 12,borderWidth: 0.9, borderRadius: 5,padding: 10,flex:1, backgroundColor: 'white', color:'black'}}
              editable = {false}
            />
            <View style = {{flex : 1, flexDirection : 'row',}}>
              <TouchableOpacity onPress = {() => (setGoal(goal + 1000))}>
              <Text style = {styles.butt}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Text style = {styles.butt} onPress = {() => {if (goal > 1000) setGoal(goal - 1000);}}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </View>
    </ScrollView>
  );
};

export {StepCount};

// const stepData = {
//   goal : 'string number',
//   stepsToday : 'string number',
//   pastSteps : 'steps, steps, steps',
//   pastGoals : 'goal, goal, goal',
//   dates : 'date, date, date, date',
//   today : 'date'
// }
//compare today's date with date in storage, and update the stepData json object accordingly, reset the value of today in the step object.