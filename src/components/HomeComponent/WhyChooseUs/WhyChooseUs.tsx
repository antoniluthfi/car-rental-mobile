import {h1, h5} from 'utils/styles';
import {
  img_clock,
  img_competitive_price,
  img_key,
  img_maps,
} from 'assets/images';
import {theme} from 'utils';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {iconCustomSize, WINDOW_WIDTH} from 'utils/mixins';
import CustomCarousel from 'components/CustomCarousel/CustomCarousel';

type DataRender = {
  id: number;
  title: string;
  description: string;
  img: ImageSourcePropType;
};

const data: DataRender[] = [
  {
    id: 1,
    title: 'Hemat Waktu',
    description:
      'Sewa mobil online anti ribet, dimana saja dan kapan saja. Pilih jadwal serta jenis mobil dengan mudah dan terpercaya di Get & Ride.',
    img: img_clock,
  },
  {
    id: 2,
    title: 'Harga Kompetitif',
    description:
      'Jangan khawatir! Harga sewa di Get & Ride terjangkau dan dijamin kompetitif.',
    img: img_competitive_price,
  },
  {
    id: 3,
    title: 'Mobil Terbaik',
    description:
      'Get & Ride menyediakan mobil dengan kualitas terbaik dan terjaga kebersihannya. Semua mobil di service secara berkala demi kenyamanan.',
    img: img_key,
  },
  {
    id: 4,
    title: 'Layanan Terbaik',
    description:
      'Menyediakan Driver professional, penerapan protokol kesehatan, dan proteksi kendaraan. Semua mobil di Get & Ride sudah terjamin dengan jaminan asuransi.',
    img: img_maps,
  },
];

const WhyChooseUs = () => {
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
          Mengapa Sewa Mobil di Get&Ride
        </Text>
      }
      renderItem={renderItem}
      // autoPlay
      showButtonNavigator={false}
      scrollAnimationDuration={2000}
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
    width: WINDOW_WIDTH-60,
    // padding: '10%',
    alignSelf: 'center',
    marginTop: 80
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
