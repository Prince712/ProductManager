import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Button,
  Platform,
} from 'react-native';

import {Styles} from './Styles';
import colors from '../utils/Colors';
import CustomTextInput from '../components/CustomTextInput';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../redux/actions';
const OTPScreen = function ({
  route: {
    params: {phoneNumber},
  },
  navigation,
}) {
  const [otpArray, setOtpArray] = useState(['', '', '', '']);
  const [submittingOtp, setSubmittingOtp] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirm, setConfirm] = useState(null);

  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fivthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);

  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  const dispatch = useDispatch();
  const RegisterUser = params => dispatch(registerUser(params));

  useEffect(() => {
    signInWithPhoneNumber();
  }, []);

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

      setConfirm(confirmation);
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  const confirmCode = async () => {
    try {
      const code = otpArray.join('');
      const response = await confirm.confirm(code);
      console.log(response);
      if (response) {
        RegisterUser({phoneNumber});
        //   navigation.navigate('Home');
      }
    } catch (e) {
      navigation.navigate('Register');
      alert(JSON.stringify(e));
    }
  };
  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fivthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
          setSubmittingOtp(false);
        }
      }
    };
  };

  const onOtpKeyPress = index => {
    return ({nativeEvent: {key: value}}) => {
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } else if (index === 5) {
          fivthTextInputRef.current.focus();
        }
        if (Platform.os == 'Android' && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = '';
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };

  return (
    <View style={styles.container}>
      <Text>Enter OTP sent to your{' ' + phoneNumber}</Text>
      <View style={[Styles.row, Styles.mt12,]}>
        {[
          firstTextInputRef,
          secondTextInputRef,
          thirdTextInputRef,
          fourthTextInputRef,
          fivthTextInputRef,
          sixthTextInputRef,
        ].map((textInputRef, index) => (
          <CustomTextInput
            containerStyle={[Styles.fill, Styles.mr12]}
            value={otpArray[index]}
            onKeyPress={onOtpKeyPress(index)}
            onChangeText={onOtpChange(index)}
            keyboardType={'numeric'}
            maxLength={1}
            style={[styles.otpText, Styles.centerAlignedText]}
            autoFocus={index === 0 ? true : undefined}
            refCallback={refCallback(textInputRef)}
            key={index}
          />
        ))}
      </View>
      {errorMessage ? (
        <Text
          style={[Styles.negativeText, Styles.mt12, Styles.centerAlignedText]}>
          {errorMessage}
        </Text>
      ) : null}

      <Button
        type={'fill'}
        title={'Submit'}
        style={[Styles.mt24,styles.submitButtonText]}
        onPress={() => confirmCode()}
        disabled={submittingOtp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
    paddingTop: 130,
  },
  submitButtonText: {
    color: '#fff',
    marginTop:20
  },
  otpText: {
    // color: colors.BLUE,
    fontSize: 18,
    width: '100%',
  },
});

export default OTPScreen;
