import { TouchableOpacity,View,Text } from "react-native";
import React, {useState} from 'react';

const Meds = ({medNames}) => {
  {medNames.map((item) => {
    return (<Text>{item}</Text>)
  })}
}

const VitalDetail = ({vitalString}) => {
  return(
    <View>
      <Text>{vitalString}</Text>
    </View>
  );
};


const symptomDetail = ({sympObj}) => {
  const symptom = sympObj.symptom;
  const medHashes = sympObj.medHashes;
  let medNames = [];
  medHashes = medHashes.split(',');
  for (const hash of medHashes) {
    let medObj = JSON.parse(storage.getString(hash));
    medNames.push(medObj.title);
  }
  return (
    <View>
      <Text>{symptom}</Text>
      <Meds medNames={medNames}/>
    </View>
  );
};

export {Meds,VitalDetail,symptomDetail};