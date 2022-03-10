import React, {useState, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';

export default function RouteComponent() {
  const isLoggedIn = useSelector(state => state.auth.loggedInUser);
  const [logged, setlogged] = useState('');

  useEffect(() => {
    console.log('route ', isLoggedIn);
    // if (!isLoggedIn) {
    //   setlogged(isLoggedIn);
    // }
  }, [isLoggedIn]);
  return (
    <NavigationContainer>
      {/* <HomeNavigator/>      */}
      {isLoggedIn == null ? <AuthNavigator /> : <HomeNavigator />}
      {/* <AuthNavigator /> */}
    </NavigationContainer>
  );
}
