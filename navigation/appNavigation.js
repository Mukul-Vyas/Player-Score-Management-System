import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ScoreScreen from "../screens/ScoreScreen";
import EditScreen from "../screens/EditScreen";
import { Provider } from "react-redux";
import store from "../redux/store";



const Stack=createNativeStackNavigator();

  export default function AppNavigation(){
    return (

      <Provider store={store}>
        <NavigationContainer>
        
        <Stack.Navigator initialRouteName="Home" >

         <Stack.Screen name="Home" options={{headerShown:false}}
         component={HomeScreen}/>

         <Stack.Screen name="Score" options={{headerShown:false}}
         component={ScoreScreen}/>

         <Stack.Screen name="Edit" options={{headerShown:false}}
         component={EditScreen}/>

        </Stack.Navigator>



        </NavigationContainer>

        </Provider>

    )
  }