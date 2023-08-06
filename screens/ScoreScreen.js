import { View, Text,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import { useState} from "react";
import { themeColors } from '../theme';
import { colors } from '../theme'
import { useDispatch } from "react-redux";
import { addCard } from '../redux/cardsSlice';
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native';


 function ScoreScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [score, setScore] = useState("");
  const dispatch = useDispatch();

  const generateUniqueID = () => {
    const prefix = "CARD_";
    const randomNumber = Math.floor(Math.random() * 10000); 
    return prefix + randomNumber;
  };

  const handleAddCard = () => {
    if (name.trim() !== "" && country.trim() !== "" && score.trim() !== "") {
      Alert.alert(
        "Add Card",
        "Are you sure you want to Add?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Add",
            onPress: () => {
              const newCard = {
                id:generateUniqueID(),
                name,
                country,
                score,
              };

              
              dispatch(addCard(newCard));
              
                
              

              navigation.goBack();
            },
          },
        ]
      );
    }
  };


  return (
  
    <View className="flex justify-between h-full mx-4">
      <View>
          <View className="relative mt-5">
             
              
              <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Player</Text>
          </View>
          
          
          <View className="space-y-2 mx-2">
              <Text className={`${colors.heading} text-lg font-bold`}>Name</Text>
              <TextInput   className="p-4 bg-white rounded-full mb-3" value={name}
        onChangeText={(text) => setName(text)} />
              <Text  className={`${colors.heading} text-lg font-bold`}>Which Country</Text>
              <TextInput   className="p-4 bg-white rounded-full mb-3" value={country}
        onChangeText={(text) => setCountry(text)}  />
              <Text  className={`${colors.heading} text-lg font-bold`}>Score</Text>
              <TextInput   className="p-4 bg-white rounded-full mb-3" value={score}
        onChangeText={(text) => setScore(text)}  />
          </View>
      </View>
      
      <View>
        
                  <TouchableOpacity style={{backgroundColor: themeColors.bgDark}} className="my-6 rounded-full p-3 shadow-sm mx-2" onPress={handleAddCard} >
                      <Text className="text-center text-white text-lg font-bold">Add Player</Text>
                  </TouchableOpacity>
          
          
      </View>
    </View>
  
  )
}
export default React.memo(ScoreScreen);
