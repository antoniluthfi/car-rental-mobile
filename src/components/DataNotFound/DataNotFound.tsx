import {ic_not_found} from 'assets/icons';
import {Image, StyleSheet, Text, View} from 'react-native';
import {h1} from 'utils/styles';

const DataNotFound: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={[h1, {marginBottom: 5}]}>Data Not Found</Text>
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
