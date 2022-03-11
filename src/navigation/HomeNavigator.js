import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import AddProduct from '../screens/AddProduct';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

export default HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{headerShown: true, headerTitle: 'Add Product'}}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{headerShown: true, headerTitle: 'Your Location'}}
      />
    </Stack.Navigator>
  );
};
