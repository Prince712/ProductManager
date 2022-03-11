import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Text,
  ScrollView,
  Spinner,
  HStack,
  Heading,
  Center,
  Fab,
  Icon,
  Box,
  IconButton,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts, logout} from '../redux/actions';
import ProductItem from '../components/ProductItem';
import TotalPrice from '../components/TotalPrice';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const GetProducts = () => dispatch(getProducts());
  const Logout = () => dispatch(logout());

  const loading = useSelector(state => state.product.loading);
  const products = useSelector(state => state.product.products);
  // const [loading, setloading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      await GetProducts().then(() => {});
    };
    getData();
  }, []);

  useEffect(() => {
    console.log('route ', products);
  }, [loading, products]);

  const LogoutUser = () => {
    Logout();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={LogoutUser}
          icon={
            <Icon as={AntDesign} name="logout" size="sm" color="violet.500" />
          }
          title={'edit'}
        />
      ),
    });
  }, [navigation]);

  if (loading) {
    return (
      <Center flex={1} px="3">
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Center>
    );
  }

  return (
    <Box flex={1} alignItems={'flex-start'} safeArea pt={0} mt={0}>
      {products ? (
        <FlatList
          style={{marginTop: -40}}
          data={products}
          renderItem={item => <ProductItem data={item.item} navigation={navigation} />}
          keyExtractor={item => item.product_id}
        />
      ) : (
        <View style={styles.centerText}>
          <Text>No Data found :(</Text>
        </View>
      )}

      <TotalPrice />

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('AddProduct')}
        style={styles.touchableOpacityStyle}>
        <AntDesign
          name="plus"
          size={20}
          style={{fontWeight: 'bold'}}
          color={'#ffffff'}
        />
      </TouchableOpacity>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  centerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 55,
    borderRadius: 40,
    backgroundColor: '#8b5cf6',
    elevation: 7,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
});
