import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { HomeStack,MyClassesStack,ProfileStack } from './StackNavigation';
import { Color } from '../../config/GlobalStyles';
const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="home"
                color={focused && Color.appDefaultColor}
                size={30}
              />
            </View>
          ),
          

          tabBarActiveTintColor: Color.appDefaultColor,
        }}
      />
      <Tab.Screen
        name="MyClassesStack"
        component={MyClassesStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="shopping-cart"
                color={focused && Color.appDefaultColor}
                size={26}
              />
            </View>
          ),
          tabBarActiveTintColor: Color.appDefaultColor,
          tabBarButton: props => <TouchableRipple {...props} />,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="user-circle-o"
                color={focused && Color.appDefaultColor}
                size={26}
              />
            </View>
          ),
          tabBarActiveTintColor: Color.appDefaultColor,
          tabBarButton: props => <TouchableRipple {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
