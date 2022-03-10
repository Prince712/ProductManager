import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {Box, Center, Text} from 'native-base';

export default function TotalPrice() {
  const products = useSelector(state => state.product.products);

  const [TotalPrice, setTotalPrice] = useState(0);

  const CalculatePrice = () => {
    if (products && products.length > 0) {
      let Total = products.reduce(function (acc, val) {
        return acc + parseFloat(val.product_price);
      }, 0);
      setTotalPrice(Total);
      console.log(Total);
    }
  };
  useEffect(() => {
    CalculatePrice();
  }, [products]);

  return (
    <Box bg={'violet.800'} width={'100%'} height={50} justifyContent={'center'}>
      <Text color={'#fff'} fontWeight={'medium'} ml={5}>
        Total Amount: <Text fontWeight={'bold'}>{TotalPrice} </Text>
      </Text>
    </Box>
  );
}
