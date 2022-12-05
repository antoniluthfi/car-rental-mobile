import {
  ic_document_active,
  ic_document_inactive,
  ic_home_active,
  ic_home_inactive,
  ic_message_active,
  ic_message_inactive,
  ic_profile_active,
  ic_profile_inactive,
} from 'assets/icons';
import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import theme from 'utils/theme';

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (title === 'Home') {
      return active ? (
        <Image source={ic_home_active} style={styles.icon} />
      ) : (
        <Image source={ic_home_inactive} style={styles.icon} />
      );
    }
    if (title === 'My Booking') {
      return active ? (
        <Image
          source={ic_document_active}
          style={styles.icon}
          resizeMode="contain"
        />
      ) : (
        <Image source={ic_document_inactive} style={styles.icon} />
      );
    }
    if (title === 'My Inbox') {
      return active ? (
        <Image
          source={ic_message_active}
          style={styles.icon}
          resizeMode="contain"
        />
      ) : (
        <Image source={ic_message_inactive} style={styles.icon} />
      );
    }
    if (title === 'My Profile') {
      return active ? (
        <Image
          source={ic_profile_active}
          style={styles.icon}
          resizeMode="contain"
        />
      ) : (
        <Image source={ic_profile_inactive} style={styles.icon} />
      );
    }
    return <Image source={ic_home_active} style={styles.icon} />;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 35,
    flex: 1,
  },
  text: active => ({
    fontSize: 10,
    color: active ? theme.colors.navy : theme.colors.text.secondary,
    marginTop: 4,
  }),
  icon: {
    height: 25,
    width: 25,
  },
});
