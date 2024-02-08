import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStack} from '../RootStackScreen';
import {Color} from '../../config/GlobalStyles';
import {MyClassesStack} from '../RootStackScreen';
import {ProfileStack} from '../RootStackScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Color.appDefaultColor,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{padding: 5}}>
              <Icon name="home" size={30} color={focused ? '#fff' : null} />
            </View>
          ),

          tabBarActiveTintColor: "#fff",
        }}
      />
      <Tab.Screen
        name="My Classes"
        component={MyClassesStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{padding: 5}}>
              <MaterialIcon
                name="class"
                size={26}
                color={focused ? '#fff' : null}
              />
            </View>
          ),
          tabBarActiveTintColor: "#fff",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{padding: 5}}>
              <Icon name="user" size={26} color={focused ? '#fff' : null} />
            </View>
          ),
          tabBarActiveTintColor: "#fff",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
