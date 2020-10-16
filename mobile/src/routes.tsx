import React from 'react'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen} = createStackNavigator()

import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";
import CreateOrphanage from "./pages/CreateOrphanage";

export default function Rotes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen 
          name="OrphanagesMap" 
          component={OrphanagesMap} 
        />

        <Screen 
          name="OrphanageDetails" 
          component={OrphanageDetails} 
        />

        <Screen 
          name="CreateOrphanage" 
          component={CreateOrphanage} 
        />
      </Navigator>
    </NavigationContainer>
  )
}