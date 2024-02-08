import {useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import TabNavigation from './navigation/TabNavigation';
import Packages from './dashboard/Packages';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './dashboard/HomeScreen';
import MyClasses from './myclasses/MyClasses';
import Profile from './profile/Profile';
import {Color, FontFamily} from '../config/GlobalStyles';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Color.appDefaultColor, // Set your header background color here
        },
        headerTintColor: '#fff', // This sets the color of the back button and title
        headerTitleStyle: {
          fontFamily: FontFamily.Montserrat,
          fontSize: 35,
          flex: 1,
        },
        headerTitleAlign: 'center',
        title: 'DriverEd',
      }}>
      <Stack.Screen name="MAIN" component={HomeScreen} />
      <Stack.Screen name="Packages" component={Packages} />
      
    </Stack.Navigator>
  );
};

const MyClassesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Color.appDefaultColor, // Set your header background color here
        },
        headerTintColor: '#fff', // This sets the color of the back button and title
        headerTitleStyle: {
          fontFamily: FontFamily.Montserrat,
          fontSize: 35,
          flex: 1,
        },
        headerTitleAlign: 'center',
        title: 'DriverEd',
      }}>
      <Stack.Screen name="MyClasses" component={MyClasses} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Color.appDefaultColor, // Set your header background color here
        },
        headerTintColor: '#fff', // This sets the color of the back button and title
        headerTitleStyle: {
          fontFamily: FontFamily.Montserrat,
          fontSize: 35,
          flex: 1,
        },
        headerTitleAlign: 'center',
        title: 'DriverEd',
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MyClasses" component={MyClasses} />
    </Stack.Navigator>
  );
};

export {HomeStack, MyClassesStack, ProfileStack};

const Navigator = () => {
  const navigation = useSelector(state => state.screen.screen);
  switch (navigation) {
    case 'MAIN':
      return <TabNavigation />;

    default:
      return <TabNavigation />;
  }
};
export {Navigator};
