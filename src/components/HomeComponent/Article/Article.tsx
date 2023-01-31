import useLangSelector from 'utils/useLangSelector';
import {boxShadow} from 'utils/mixins';
import {h1, h3, h5} from 'utils/styles';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {img_prasasti} from 'assets/images';

type DataRender = {
  title: string;
  description: string;
};

const Article: React.FC = () => {
  const t = useLangSelector().Home;

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
          <Text style={[h3, styles.readMore]}>Read More</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[h1, styles.title]}>{t.articleTitle}</Text>
      <FlatList horizontal data={t.articleList} renderItem={renderItem} />
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
