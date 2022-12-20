import {ic_check2, ic_error2, ic_promo} from 'assets/icons';
import {View, Image, Text, StyleSheet} from 'react-native';
import {iconCustomSize} from 'utils/mixins';
import {colors, h1, h5} from 'utils/styles';

type Props = {
  item: any;
};

const MyInboxCard: React.FC<Props> = ({item}) => {
  const notifIcon = (
    type: 'payment-success' | 'promo-special' | 'payment-expired',
  ) => {
    switch (type) {
      case 'payment-success':
        return (
          <Image
            source={ic_check2}
            style={[iconCustomSize(17), {marginRight: 5}]}
          />
        );
      case 'promo-special':
        return (
          <Image
            source={ic_promo}
            style={[iconCustomSize(17), {marginRight: 5}]}
          />
        );
      case 'payment-expired':
        return (
          <Image
            source={ic_error2}
            style={[iconCustomSize(17), {marginRight: 5}]}
          />
        );
      default:
        return;
    }
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <View style={{flexDirection: 'row'}}>
          {notifIcon(item?.type)}
          <Text style={[h1, {fontSize: 14, lineHeight: 17}]}>
            {item?.title}
          </Text>
        </View>
        <Text style={[h5, {fontSize: 10, lineHeight: 12}]}>
          {item?.timestamp}
        </Text>
      </View>
      <Text style={[h5, styles.subtitle]}>{item?.subtitle}</Text>
      <Text style={[h5, styles.message]}>{item?.message}</Text>
      <View style={styles.lineBreak} />
    </View>
  );
};

export default MyInboxCard;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 15,
    color: colors.gray400,
    marginBottom: 8,
  },
  message: {fontSize: 12, lineHeight: 18, marginBottom: 15},
  lineBreak: {
    borderBottomColor: 'rgba(173, 162, 162, 0.5)',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
