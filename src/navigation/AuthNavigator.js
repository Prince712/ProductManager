import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Register from '../screens/Register';
import OTPScreen from '../screens/OTPScreen';

const Stack = createNativeStackNavigator();

export default AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
