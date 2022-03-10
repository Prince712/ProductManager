import React from 'react';
import { View, Text,Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

export default function Home({navigation}) {
  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <Text> Hi i am home</Text>
      <Icon name='md-menu' size={30} color={'red'}/>
      <Button title='Go to Register' onPress={()=> navigation.navigate('Register')}/>
     </View>
  );
}
