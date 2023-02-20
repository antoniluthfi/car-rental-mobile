import {h1} from 'utils/styles';
import {ic_not_found} from 'assets/icons';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

const DataNotFound: React.FC = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={[h1, {marginBottom: 5}]}>{t('global.data_not_found')}</Text>
      <Image source={ic_not_found} style={{width: '80%', height: 150}} />
    </View>
  );
};

export default DataNotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
