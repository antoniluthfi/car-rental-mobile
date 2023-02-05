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
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';

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
        <View style={{width: '50%', padding: 10}}>
          <Text style={[h1, styles.title]}>{item.title}</Text>
          <Text style={[h5, styles.description]}>{item.description}</Text>
        </View>
        <View style={{width: '50%', overflow: 'hidden', borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
          <Image source={item.img} resizeMode="cover" style={styles.image} />
        </View>
      </View>
    );
  };

  return (
    <CustomCarousel
      containerStyle={{
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
      }}
      data={carouselItems}
      renderItem={renderItem}
      autoPlay
      showButtonNavigator={false}
      scrollAnimationDuration={2000}
      progressValueSpace={20}
      height={120}
      paginationSize={7}
      paginationColor="#F1A33A"
      paginationPosition={5}
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
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 10,
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
