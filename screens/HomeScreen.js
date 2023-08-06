import { View, Text ,Image,TouchableOpacity, TextInput,  Dimensions, StyleSheet} from 'react-native'
import React from 'react'
import {LogBox} from 'react-native'
import {StatusBar} from "expo-status-bar"
import {SafeAreaView} from "react-native-safe-area-context"
import {BellIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon} from "react-native-heroicons/outline"
import Carousel from 'react-native-snap-carousel'
import PlayerCard from '../components/PlayerCard.js'
import { PlusIcon ,UserCircleIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from "react-redux";
import { useState,useMemo} from 'react'

const {width, height} = Dimensions.get('window');



 function HomeScreen(){

    const navigation = useNavigation();

   const cards = useSelector((state) => state.cards.cards);
    // const [initialCards, setInitialCards] = useState([]);
    const [sortField, setSortField] = useState(null);

    // useEffect(() => {
      
    //   const initialCardsToShow = 2; 
    //   setInitialCards(cards.slice(0, initialCardsToShow));
    // }, [cards]);

    const handleSort = (field) => {
      setSortField(field);
    };

    const sortedCards = () => {
      if (!sortField) return cards;
      return [...cards].sort((a, b) => a[sortField].localeCompare(b[sortField]));
    };

     const CarouselData=useMemo(()=>{
      return cards.length > 0 ? (
        <Carousel
          containerCustomStyle={{overflow: 'visible'}}
          data={sortedCards()}
          renderItem={({item})=> <PlayerCard card={item} />}
          firstItem={1}
          loop={true}
          inactiveSlideScale={0.75}
          inactiveSlideOpacity={0.75}
          sliderWidth={width}
          itemWidth={width*0.63}
          slideStyle={{display: 'flex', alignItems: 'center'}}
        />
        ) : (
          <Text>No cards found. Create a new card using the Create button.</Text>
        )

     },[cards]);


    return(
        <View className="flex-1 relative bg-white">
     <StatusBar/>
     <SafeAreaView className="flex-1">
      
      <View className="mx-4 flex-row justify-between items-center">
       
      <UserCircleIcon size="27" color="black" />

     {/* <Image source={require('../assets/splash.svg')}
      className="h-10 w-10 rounded-full"/> */}

     <BellIcon size="27" color="black" />

      </View>

              {/* search bar */}
              <View className="mx-4 mt-16 flex-row justify-between items-center space-x-3">
          <View className="flex-row flex-1 p-4 bg-gray-200 rounded-2xl">
            <MagnifyingGlassIcon stroke={40} color="gray" />
            <TextInput placeholder='Food' value="Search" className="ml-2 text-gray-800" />
          </View>
          <View className="bg-gray-200 rounded-2xl p-4">
            <AdjustmentsHorizontalIcon size="25" stroke={40} color="black" />
          </View>
        </View>
        
        <View className="flex-row m-7">
      <TouchableOpacity className="flex-row m-1" style={styles.sortButton} onPress={() => handleSort("name")}>
        <Text style={styles.sortButtonText}>Sort by Name</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row m-1" style={styles.sortButton} onPress={() => handleSort("country")}>
        <Text style={styles.sortButtonText}>Sort by Country</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row m-1" style={styles.sortButton} onPress={() => handleSort("score")}>
        <Text style={styles.sortButtonText}>Sort by Score</Text>
      </TouchableOpacity>
      
    </View>
        



     </SafeAreaView>

      
    
     <View className={'overflow-visible flex justify-center flex-1'}>
        <View>
        {CarouselData}
        </View>
        
      </View>
      <TouchableOpacity onPress={()=> navigation.navigate('Score')}  >
      <View className=" m-10 mb-2 mr-20 ml-20 flex-row items-center justify-center rounded-3xl p-1 px-2 h-9 w-15 bg-[#e6e6e6]">
                  <PlusIcon size="25" color="black" />
                  <Text className=" j text-base font-semibold text-black">Create Player</Text>
                </View>

         </TouchableOpacity>
      
            
                
      

        </View>
    )
}
const styles = StyleSheet.create({
  sortButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 7,
    marginBottom: 10,
    alignSelf: "center",
  },
  sortButtonText: {
    color: "black",
    textAlign: "center",
  },
});

export default React.memo(HomeScreen);