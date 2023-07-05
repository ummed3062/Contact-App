/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ContactList from './screens/ContactList';
import CreateNewContact from './screens/CreateNewContact';
import Profile from './screens/Profile';
import EditContact from './screens/EditContact';
import FavoriteList from './screens/FavoriteList';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen name="ContactList" component={ContactList} />
        <Stack.Screen name="CreateNewContact" component={CreateNewContact} />
        <Stack.Screen name="EditContact" component={EditContact}/>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="FavoriteList" component={FavoriteList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
