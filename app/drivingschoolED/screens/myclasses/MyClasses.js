import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {Color} from '../../config/GlobalStyles';

const MyClasses = () => {
  const [selected, setSelected] = useState('');
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        enableSwipeMonths={true}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: Color.appDefaultColor,
          selectedDayTextColor: '#ffffff',
          todayTextColor: Color.appDefaultColor,
          dayTextColor: '#000',
          textDisabledColor: '#b6c1cd',
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
          },
        }}
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{justifyContent: 'space-evenly', flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/img/myclassesCar2.png')}
              style={{width: 300, height: 150}}
            />
            <Text style={{color: '#000'}}>No Classes Here Yet!</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text>Contact your Insrtuctor to </Text>
            <Text>Start Your Class !</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyClasses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
});
