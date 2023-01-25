import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ImageSourcePropType,
} from 'react-native';
import {h1, h5} from 'utils/styles';
import {img_carousel_1} from 'assets/images';
import {theme} from 'utils';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';

type CarouselRenderItem = {
  id: number;
  title: string;
  description: string;
  img: ImageSourcePropType;
};

const carouselItems: CarouselRenderItem[] = [
  {
    id: 1,
    title: 'Get & Ride - Rental dan Sewa Mobil di Bali',
    description:
      'Rasakan pengalaman rental dan sewa mobil di Bali dengan mudah, terpercaya, dan ga pake ribet hanya di Get & Ride.',
    img: img_carousel_1,
  },
  {
    id: 2,
    title: 'Get & Ride - Rental dan Sewa Mobil di Bali',
    description:
      'Rasakan pengalaman rental dan sewa mobil di Bali dengan mudah, terpercaya, dan ga pake ribet hanya di Get & Ride.',
    img: img_carousel_1,
  },
];

const CarouselHero: React.FC = () => {
  const renderItem = ({item}: {item: CarouselRenderItem}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={{width: '50%', padding: 5}}>
          <Text style={[h1, styles.title]}>{item.title}</Text>
          <Text style={[h5, styles.description]}>{item.description}</Text>
        </View>
        <View style={{width: '50%', overflow: 'hidden'}}>
          <Image source={item.img} resizeMode="cover" style={styles.image} />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={carouselItems}
      horizontal
      renderItem={renderItem}
      pagingEnabled
    />
  );
};

export default CarouselHero;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 350,
    marginTop: 20,
    height: 100,
    marginRight: 5,
    borderRadius: 5
  },
  title: {
    color: theme.colors.white,
    fontSize: 13,
  },
  description: {
    color: theme.colors.white,
    fontSize: 10,
  },
  image: {width: '100%', height: '100%'}
});
