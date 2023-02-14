import {boxShadow} from 'utils/mixins';
import {h1, h3, h5} from 'utils/styles';
import {img_prasasti} from 'assets/images';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type DataRender = {
  title: string;
  description: string;
};

const Article: React.FC = () => {
  const {t} = useTranslation();
  const articleList = [
    {
      title: 'Favorite Car Rental Destinations in Bali',
      description:
        "Several destination places most visited in Bali are, Kuta Beach, Tanah Lot Temple, Garuda Wisnu Kencana (GWK), and Uluwatu Island. Apart from being strategic and easy to reach, its natural and cultural beauty is also interesting. As in the GWK area, foreign tourists can enjoy several types of Balinese art dances every day. Next is Tanah Lot Temple, which is unique and beautiful since it is located on a large rock on the seafront. On the other hand, to enjoy the panorama, you can eat at several restaurants or cafes around Uluwatu Beach while waiting for the sunset. It is indeed proven that Bali keeps developing and has a very strong attraction for vacations, that's why tourists are never bored to visit the Island of the Gods",
    },
    {
      title: 'Fuel Saving Driving Tips',
      description:
        'Saving fuel when renting a car for traveling is certainly one of our ways to save more, right? You can start changing it from the way you normally drive, such as not pressing the pedal too deep, because this is one of the triggers for your gasoline to be more wasteful or you can adjust the ECO indicator to save more.',
    },
    {
      title: 'Spending Holiday Time with Family in Bali Safari and Marine Park',
      description:
        'This might be the best place to visit with your children! There are around 120 species of animals here, and for those of you who come here, not only enjoy the atmosphere, but also have an adventure and learn. In addition, Bali Safari and Marine Park is also a wildlife conservation area in Indonesia. ',
    },
    {
      title: 'SAffordable and Reliable Rental Car in Bali',
      description:
        "Renting a car is the right choice for an easy and cheap travel solution in Bali. You can enjoy more benefits, especially if you rent it at Get&Ride! Lots of car choices, you are allowed to bring pets, and you can be delivered and picked up by our driver too. It's really practical! Come on, book directly via Get&Ride now!",
    },
  ];

  const renderItem = ({item}: {item: DataRender}) => {
    return (
      <TouchableOpacity
        style={[
          boxShadow('#000', {height: 1, width: 2}, 3.27, 0.24),
          styles.boxWrapper,
        ]}>
        <Image source={img_prasasti} style={styles.thumbnailImage} />
        <View style={{padding: 10}}>
          <Text style={[h1]}>{item.title}</Text>
          <Text style={[h5, styles.description]}>
            {item.description.length > 100
              ? `${item.description.slice(0, 100)}...`
              : item.description}
          </Text>
          <Text style={[h3, styles.readMore]}>{t('carDetail.learnMore')}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[h1, styles.title]}>{t('Home.articleTitle')}</Text>
      <FlatList horizontal data={articleList} renderItem={renderItem} />
    </View>
  );
};

export default Article;

const styles = StyleSheet.create({
  container: {
    paddingLeft: '5%',
  },
  title: {marginTop: 20, fontSize: 21, marginBottom: 10},
  boxWrapper: {
    marginRight: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    width: 300,
  },
  thumbnailImage: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 300,
    height: 200,
  },
  description: {fontSize: 12, marginTop: 5},
  readMore: {fontSize: 13, marginTop: 10},
});
