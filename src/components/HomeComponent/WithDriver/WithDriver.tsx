import Button from 'components/Button';
import useLangSelector from 'utils/useLangSelector';
import {ic_wa_2} from 'assets/icons';
import {
  View,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
} from 'react-native';
import {img_with_driver_guide_1, img_with_driver_guide_2} from 'assets/images';
import {theme} from 'utils';
import {h5} from 'utils/styles';

type GuideItem = {
  id: number;
  description: string;
  img: ImageSourcePropType;
};

const WithDriver: React.FC = () => {
  const lang = useLangSelector();

  const guideList = [
    {
      id: 1,
      description:
        'Jika anda memilih sewa mobil “Dengan Supir” maka anda akan dialihkan ke Whatsapp',
      img: img_with_driver_guide_1,
    },
    {
      id: 2,
      description:
        'Setelah anda memilih waktu dan tanggal, anda akan memilih mobil yang tersedia beserta driver',
      img: img_with_driver_guide_2,
    },
    {
      id: 3,
      description:
        'Setelah anda memilih mobil, anda akan menerima invoice untuk sewa mobil anda',
      img: img_with_driver_guide_1,
    },
  ];

  const renderItem = ({item}: {item: GuideItem}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.img} resizeMode="contain" style={styles.image} />
        </View>

        <Text style={[h5, styles.description]}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={guideList} horizontal renderItem={renderItem} />

      <Button
        _theme="navy"
        title={lang.Home.daily.continue_to_whatsapp}
        onPress={() => {}}
        styleWrapper={{
          marginTop: 40,
        }}
        rightIcon={ic_wa_2}
      />
    </View>
  );
};

export default WithDriver;

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  imageContainer: {
    width: 170,
    height: 170,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey4,
    justifyContent: 'center',
  },
  image: {
    width: '70%',
    height: '70%',
    alignSelf: 'center',
  },
  itemContainer: {
    width: 170,
    marginRight: 10
  },
  description: {marginVertical: 10, fontSize: 14},
});
