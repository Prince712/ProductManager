import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
export default function Register({navigation}) {
  const [phoneNumber, addPhoneNumber] = useState('+918160736295');

  const GetOTP = () => {
    if (phoneNumber && phoneNumber.length > 9) {
      navigation.navigate('OTPScreen', {phoneNumber});
    } else alert('Please enter 10 digit phone number');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={phoneNumber}
        keyboardType={'number-pad'}
        style={{
          height: 50,
          width: 300,
          paddingLeft: 20,
          backgroundColor: 'azure',
          fontSize: 20,
        }}
        placeholder="+91 1234567890"
        onChangeText={text => addPhoneNumber(text)}
      />
      <Pressable
        onPress={GetOTP}
        style={({pressed}) => ({
          ...styles.btnContainer,
          backgroundColor: pressed ? 'white' : 'blue',
        })}>
        <Text style={styles.btnText}>Get OTP!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageStyle: {
    height: 200,
    width: 150,
    resizeMode: 'contain',
    marginBottom: 50,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
});
