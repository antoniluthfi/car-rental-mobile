import CustomCarousel from 'components/CustomCarousel/CustomCarousel';
import {h1, h5} from 'utils/styles';
import {iconCustomSize, WINDOW_WIDTH} from 'utils/mixins';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {theme} from 'utils';
import {useTranslation} from 'react-i18next';
import {
  img_clock,
  img_competitive_price,
  img_key,
  img_maps,
} from 'assets/images';

type DataRender = {
  id: number;
  title: string;
  description: string;
  img: ImageSourcePropType;
};

const WhyChooseUs = () => {
  const {t} = useTranslation();

  const data: DataRender[] = [
    {
      id: 1,
      title: t('Home.whyChooseUs.list_1.subtitle'),
      description: t('Home.whyChooseUs.list_1.description'),
      img: img_clock,
    },
    {
      id: 2,
      title: t('Home.whyChooseUs.list_2.subtitle'),
      description: t('Home.whyChooseUs.list_2.description'),
      img: img_competitive_price,
    },
    {
      id: 3,
      title: t('Home.whyChooseUs.list_3.subtitle'),
      description: t('Home.whyChooseUs.list_3.description'),
      img: img_key,
    },
    {
      id: 4,
      title: t('Home.whyChooseUs.list_4.subtitle'),
      description: t('Home.whyChooseUs.list_4.description'),
      img: img_maps,
    },
  ];

  const renderItem = ({item}: {item: DataRender}) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.img} style={iconCustomSize(113)} />
        <Text style={[h1, styles.title]}>{item.title}</Text>
        <Text style={[h5, styles.description]}>{item.description}</Text>
      </View>
    );
  };

  return (
    <CustomCarousel
      data={data}
      renderCarouselTitle={
        <Text style={[h1, styles.mainTitle]}>
          {t('Home.whyChooseUs.title')}
        </Text>
      }
      renderItem={renderItem}
      // autoPlay
      showButtonNavigator={false}
      scrollAnimationDuration={500}
      progressValueSpace={50}
      height={360}
      paginationSize={7}
      paginationColor="#F1A33A"
      paginationPosition={-30}
    />
  );
};

export default WhyChooseUs;

const styles = StyleSheet.create({
  itemContainer: {
    height: 360,
    width: WINDOW_WIDTH - 60,
    // padding: '10%',
    alignSelf: 'center',
    marginTop: 80,
  },
  mainTitle: {
    fontSize: 21,
    color: theme.colors.navy,
    lineHeight: 31,
    position: 'absolute',
    top: 20,
  },
  title: {
    fontSize: 18,
    lineHeight: 36,
  },
  description: {
    fontSize: 12,
    lineHeight: 24,
    textAlign: 'justify',
  },
});
