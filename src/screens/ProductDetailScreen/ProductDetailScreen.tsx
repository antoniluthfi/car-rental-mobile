import {Button, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {RootRouteProps} from 'types/navigator';
import {useNavigation} from '@react-navigation/native';
import hoc from 'components/hoc';

const ProductDetailScreen = () => {
  const route = useRoute<RootRouteProps<'Detail'>>();
  const navigation = useNavigation();

  return (
    <View>
      <Text>DetailScreen{route.params.userId}</Text>
      <Button
        title="navigate"
        onPress={() => navigation.navigate('ProductDetail', {productId: '1'})}
      />
    </View>
  );
};

export default hoc(ProductDetailScreen);
