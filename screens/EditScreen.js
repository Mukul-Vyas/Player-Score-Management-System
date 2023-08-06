import { View, Text,TextInput,TouchableOpacity , Alert} from 'react-native'
import React from 'react'
import { useState ,useEffect} from "react";
import { colors } from '../theme'
import { themeColors } from '../theme';
import { useDispatch } from 'react-redux';
import { updateCard } from '../redux/cardsSlice';
import { useNavigation } from '@react-navigation/native'

 function EditScreen({route}) {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [score, setScore] = useState("");
  const dispatch = useDispatch();
  const { cardToUpdate } = route.params;

  useEffect(() => {
    
    if (cardToUpdate) {
      setName(cardToUpdate.name);
      setCountry(cardToUpdate.country);
      setScore(cardToUpdate.score);
    }
  }, [cardToUpdate]);

  const handleAddCard = () => {
    if (name.trim() !== "" && country.trim() !== "" && score.trim() !== "") {
      Alert.alert(
        "Update Card",
        "Are you sure you want to Update?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Add",
            onPress: () => {
              const newCard = {
                id: cardToUpdate ? cardToUpdate.id : Date.now().toString(),
                name,
                country,
                score,
              };

              
              
                dispatch(updateCard(newCard));
              
            
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
             
              
              <Text className={`${colors.heading} text-xl font-bold text-center`}>Update Player</Text>
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
                      <Text className="text-center text-white text-lg font-bold">Update Player</Text>
                  </TouchableOpacity>
          
          
      </View>
    </View>
  
  )
}
export default React.memo(EditScreen);