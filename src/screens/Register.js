import React from 'react';
import { View, Text,Button} from 'react-native';

export default function Register({navigation}) {
  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <Text> Hi i am Register</Text>
      <Button title='Go to Home' onPress={()=> navigation.goBack()}/>
     </View>
  );
}