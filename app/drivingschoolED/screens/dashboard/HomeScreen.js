import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'space-evenly'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '200',
          }}>
          No Classes here yet!
        </Text>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          source={require('../../assets/animations/filesHome.json')}
          autoPlay
          loop
          style={{width: 350, height: 350}}
        />
      </View>
      <TouchableOpacity 
        onPress={() => {
          navigation.navigate('Packages');
        }} activeOpacity={0.7}>
        <Button title={'Get Started'} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
