import { View, Text, TouchableOpacity, Dimensions, Alert, Image } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { FlagIcon } from 'react-native-heroicons/outline'
import {PencilSquareIcon, TrashIcon, UserCircleIcon} from 'react-native-heroicons/outline'
import { useDispatch } from "react-redux";
import { deleteCard } from '../redux/cardsSlice';



const {width, height} = Dimensions.get('window');
 function PlayerCard({card}) {
     const { id, name, country, score } = card;
    const navigation = useNavigation();

    const dispatch = useDispatch();

    // const handleDeleteCard = () => {

    //   dispatch(deleteCard(id));

      
    // };


    const handleDeleteCard = () => {
      Alert.alert(
        "Delete Card",
        "Are you sure you want to delete this card?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              dispatch(deleteCard(id));
            },
          },
        ]
      );
    };

    

   

    return (
  
        <View 
          style={{
            borderRadius: 40, 
            backgroundColor: themeColors.bgDark, 
            height: height*0.50, 
            width: width*0.65,
          }} 
          >
          <View 
          style={{
            shadowColor: 'black',
            shadowRadius: 30,
            shadowOffset: {width: 0, height: 40},
            shadowOpacity: 0.8,
            marginTop:15,
          }}
          className="flex-row justify-center ">
            <UserCircleIcon size="70" color="black" />
            {/* <SvgUri>
            <Image 
              source={require('../assets/splash.svg')}
              className="h-12 w-12 rounded-full" 
            />
            </SvgUri> */}
          </View>
            <View className={`px-5 flex-1 justify-between`}>
              <View className="space-y-3 mt-3">
                <Text className="text-3xl text-white font-semibold z-10">
                {name}
                </Text>
                <View style={{backgroundColor: 'rgba(255,255,255,0.2)'}} 
                  className="flex-row items-center rounded-3xl p-1 px-2 space-x-1 w-22">
                  <FlagIcon size="15" color="white" />
                  <Text className="text-base font-semibold text-white">{country}</Text>
                </View>
                <View className="flex-row space-x-1 z-10 mb-6">
                  <Text className="text-base text-white font-semibold opacity-60">
                     Score:
                  </Text>
                  <Text className="text-base text-white font-semibold"> {score}</Text>
                </View>
              </View>
              
  
              <View style={{
                backgroundColor:'transparent',
                shadowColor: themeColors.bgDark,
                shadowRadius: 25,
                shadowOffset: {width: 0, height: 40},
                shadowOpacity: 0.8,
              }} className="flex-row justify-between items-center mb-5">
                {/* <Text className="text-white font-bold text-lg">$ {item.price}</Text> */}
               
                <TouchableOpacity
                className="p-4 bg-white rounded-full" onPress={()=> navigation.navigate('Edit',  {
                  cardToUpdate: card,
                })}>
                  <PencilSquareIcon size="25" strokeWidth={2} color={themeColors.bgDark} />
                </TouchableOpacity>

                <TouchableOpacity 
                className="p-4 bg-white rounded-full">
                  <TrashIcon size="25" strokeWidth={2} color={themeColors.bgDark} 
                  onPress={handleDeleteCard}  />
                </TouchableOpacity>
              </View>
              
              
            </View>
  
        </View>
      
    )
  }

  export default React.memo(PlayerCard);