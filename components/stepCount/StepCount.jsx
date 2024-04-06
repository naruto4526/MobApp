import React, { useEffect, useState } from "react";
import { Button, View, Text, TextInput, ScrollView, Touchable, TouchableOpacity } from "react-native";
import { storage } from '../../hook/useStore';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { styles } from "./stepcount.styles";
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { COLORS, SIZES } from "../../constants";

const getTime = (date) => {
  const dateTime = new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours() + 5,date.getMinutes() + 30, date.getSeconds());
  return (dateTime.toUTCString().slice(-12,-4));
}
const StepCount = () => {
  const [stepCount, setStepCount] = useState(storage.contains('stepCount') ? JSON.parse(storage.getString('stepCount')) : {
    stepCount : 0,
    entryId : -1,
    createdAt : ''
  });
  const [dateString, setDateString] = useState();
  const [goal, setGoal] = useState(storage.getString('goal') ? parseInt(storage.getString('goal')) : 1000)
  const [fill, setFill] = useState(null);

  useEffect(() => {
    setFill('');
    if(stepCount.createdAt) {
      const date = new Date(stepCount.createdAt);
      setDateString(getTime(date));
    }
  }, [stepCount]);
  
  return (
    <ScrollView>
    <View style = {{flex : 1, margin : 20, padding : 10}}>
      <View style = {{flex:1, justifyContent:'center', alignItems:'center', margin : 1, borderWidth:0, padding : 20, borderRadius : 5, backgroundColor : 'pink'}}>
        <AnimatedCircularProgress
        size={270}
        width={30}
        onAnimationComplete={() => {
          setFill(parseInt(stepCount.stepCount));
        }}
        backgroundColor= {COLORS.lightWhite} 
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
        <View style = {styles.timeContainer}>
          <Text style = {styles.timeText}>Last refreshed at</Text>  
          <Text style = {styles.timeText}>:</Text>
          <Text style = {styles.timeText}>{dateString ?? ''}</Text>
        </View>
      </View>
      <View style = {styles.stepsLeftContainer}>
        <Text style = {styles.stepsLeftText}>
          Steps left to reach goal
        </Text>
        <Text style = {[styles.stepsLeftText, {fontSize : SIZES.xxLarge, margin : 20}]}>
          {Math.max(0, goal - stepCount.stepCount)}
        </Text>
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
              <TouchableOpacity onPress = {() => {
                setGoal(goal + 1000);
                storage.set('goal', '' + (goal + 1000));
                }}>
              <Text style = {styles.butt}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Text style = {styles.butt} onPress = {() => {if (goal > 1000) {
                setGoal(goal - 1000);
                storage.set('goal','' + (goal - 1000));
              }}}>-</Text>
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