import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import {
  img_carousel_2,
  img_carousel_3,
  img_carousel_4,
} from 'assets/images';
import {theme} from 'utils';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {Image, StyleSheet, View, ImageSourcePropType} from 'react-native';

type CarouselRenderItem = {
  id: number;
  img: ImageSourcePropType;
};

const carouselItems: CarouselRenderItem[] = [
  {
    id: 1,
    img: img_carousel_2,
  },
  {
    id: 2,
    img: img_carousel_3,
  },
  {
    id: 2,
    img: img_carousel_4,
  },
];

const CarouselHero: React.FC = () => {
  const renderItem = ({item}: {item: CarouselRenderItem}) => {
    return (
      <View style={styles.itemContainer}>
        <View
          style={{
            width: '100%',
            overflow: 'hidden',
            borderRadius: 10,
          }}>
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
      carouselWidth={WINDOW_WIDTH * (90 / 100)}
      data={carouselItems}
      renderItem={renderItem}
      autoPlay
      showButtonNavigator={false}
      scrollAnimationDuration={2000}
      height={120}
      paginationSize={7}
      paginationColor="#F1A33A"
      paginationPosition={5}
      progressValueSpace={30}
    />
  );
};

export default CarouselHero;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    marginTop: 20,
    alignItems: 'center',
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
  image: {width: '100%', height: '100%', resizeMode: 'contain'},
});
