import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../dashboard/HomeScreen';
import MyClasses from '../myclasses/MyClasses';
import Profile from '../profile/Profile';
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MyClassesStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MyClasses"
          component={MyClasses}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };
  const ProfileStack= () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MyClasses"
          component={Profile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

export {HomeStack,MyClassesStack,ProfileStack}

const styles = StyleSheet.create({});
