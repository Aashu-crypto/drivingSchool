import HomeScreen from './dashboard/HomeScreen';
import {useSelector} from 'react-redux';
import React, {useEffect} from 'react';

const Navigator = () => {
  const navigation = useSelector(state => state.screen.screen);
  switch (navigation) {
    case 'MAIN':
      return <HomeScreen />;

    default:
      return <HomeScreen />;
  }
};
export {Navigator};
