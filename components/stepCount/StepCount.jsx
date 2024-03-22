import React, { useState } from "react";
import { Button, View, Text, TextInput, ScrollView } from "react-native";
import { storage } from '../../hook/useStore';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { styles } from "./stepcount.styles";
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { COLORS } from "../../constants";


const StepCount = () => {
  const [fill, setFill] = useState(0);
  const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

  return (
    <ScrollView contentContainerStyle = {{backgroundColor : COLORS.tertiary}}>
    <View style = {{flex : 1, margin : 20, padding : 10}}>
      <View style = {{flex:1, justifyContent:'center', alignItems:'center', margin : 5}}>
        <AnimatedCircularProgress
        size={270}
        width={30}
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875" 
        fill={fill}
        tintColor="#00e0ff">
        {
          (fill) => (
            <Text style = {[styles.text,{color : 'red'}]}>
              { fill }
            </Text>
          )
        }
        </AnimatedCircularProgress>
      </View>
      <View style = {styles.goalContainer}>
          <Text style = {styles.text}>Set Goal : </Text>
          <View style = {{flex : 1, flexDirection : 'row', alignItems : 'center'}}>
            <TextInput
              value = {''}
              style = {{ height: 40, width : 100, margin: 12,borderWidth: 0.9, borderRadius: 5,padding: 10,flex:1, backgroundColor: 'white', color:'black'}}
              editable = {false}
            />
            <View style = {{flex : 1, flexDirection : 'row',}}>
              <Text style = {styles.butt}>+</Text>
              <Text style = {styles.butt}>-</Text>
            </View>
          </View>
        </View>
        <View>
        <BarChart data = {data} />
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