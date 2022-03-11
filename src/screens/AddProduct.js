import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import {Box, VStack, Icon, useToast} from 'native-base';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {ProductAdd, getProducts} from '../redux/actions';

export default function AddProduct() {
  const [loading, setloading] = useState(false);
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [desc, setdesc] = useState('');
  const [image, setimage] = useState('');
  const toast = useToast();

  const dispatch = useDispatch();
  const AddingProduct = params => dispatch(ProductAdd(params));
  const GetProducts = () => dispatch(getProducts());
  //   const Logout = () => dispatch(logout());

  const handleButtonPress = () => {
    if (name == '') {
      return;
    } else if (price == '') {
      return;
    } else if (desc == '') {
      return;
    } else if (image == '') {
      return;
    }
    // console.log(user);
    setloading(true);
    const params = {
      name,
      price,
      description: desc,
      image,
    };
    AddingProduct(params)
      .then(res => {
        setloading(false);
        setname('');
        setprice('');
        setdesc('');
        setimage('');
        GetProducts();
        toast.show({
          description: 'Successfully added',
        });
      })
      .catch(e => {
        setloading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{backgroundColor: '#f5f3ff'}}
      flex={1}
      contentContainerStyle={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView>
        <Box safeArea flex={1} p="4" w="100%" mx="auto" py="8">
          <FormInput
            lableValue={'Product Name'}
            defvalue={name}
            placeholder="Enter Product Name"
            onChangeText={value => setname(value)}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="title" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />

          <FormInput
            lableValue={'Product Price'}
            defvalue={price}
            placeholder="Enter Product Price"
            keyboardType={'numeric'}
            onChangeText={value => setprice(value)}
            InputLeftElement={
              <Icon
                as={<FontAwesome name="rupee" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />

          <FormInput
            lableValue={'Product Description'}
            defvalue={desc}
            placeholder="Enter Product Description"
            onChangeText={value => setdesc(value)}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="description" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />

          <FormInput
            lableValue={'Product Image'}
            defvalue={image}
            placeholder="Enter Product Image URL"
            onChangeText={value => setimage(value)}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="image" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />

          <VStack mt={10}>
            <FormButton
              title={'Save'}
              onPress={handleButtonPress}
              isLoading={loading}
              _loading={{
                bg: 'amber.400:alpha.70',
                _text: {
                  color: 'coolGray.700',
                },
              }}
              _spinner={{
                color: 'white',
              }}
              isLoadingText="Saving..."
            />
          </VStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
