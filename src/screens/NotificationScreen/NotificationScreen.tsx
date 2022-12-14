import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import hoc from 'components/hoc';
import Button from 'components/Button';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {rowCenter} from 'utils/mixins';
import {ic_arrow_left_white} from 'assets/icons';
import {h1, h5} from 'utils/styles';
import {showToast} from 'utils/Toast';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';
import {theme} from 'utils';
import {notificationState} from 'redux/features/notifications/notificationSlice';
import {NotificationDataResult} from 'types/notification';
import {
  getNotificationSettings,
  updateNotificationSettings,
} from 'redux/features/notifications/notificationAPI';

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(notificationState);

  const [loading, setLoading] = useState<boolean>(false);
  const [activity, setActivity] = useState<NotificationDataResult[]>([]);
  const [reminder, setReminder] = useState<NotificationDataResult[]>([]);

  const methods = {
    compare: (
      a: NotificationDataResult,
      b: NotificationDataResult,
    ) => {
      if (a.key < b.key) {
        return -1;
      }
      if (a.key > b.key) {
        return 1;
      }
      return 0;
    },
    handleSubmit: () => {
      setLoading(true);
      dispatch(updateNotificationSettings(activity.concat(reminder)));
      setLoading(false);
    },
    updateHandler: (
      item: NotificationDataResult,
      type: 'activity' | 'reminder',
    ) => {
      if (type === 'activity') {
        const res = activity.filter(notif => notif != item);
        const store = {...item, value: !item.value};

        setActivity([...res, store].sort(methods.compare));
      }

      if (type === 'reminder') {
        const res = reminder.filter(notif => notif != item);
        const store = {...item, value: !item.value};

        setReminder([...res, store].sort(methods.compare));
      }
    },
  };

  useEffect(() => {
    dispatch(getNotificationSettings());
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (notifications.data.length == 0) return;
      const activityFilter = notifications.data.filter(
        (item: NotificationDataResult) => item.type == 'activity',
      );
      const reminderFilter = notifications.data.filter(
        (item: NotificationDataResult) => item.type == 'reminder',
      );

      setActivity(() => activityFilter.sort(methods.compare));
      setReminder(() => reminderFilter.sort(methods.compare));
    }, [notifications.data]),
  );

  useEffect(() => {
    if (notifications.isUpdateSuccess) {
      showToast({
        title: 'Berhasil',
        type: 'success',
        message: 'Berhasil memperbarui notifikasi',
      });
      navigation.goBack();
    }
  }, [notifications.isUpdateSuccess]);

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: (
          <TouchableOpacity
            style={rowCenter}
            onPress={() => navigation.goBack()}>
            <Image
              source={ic_arrow_left_white}
              style={{
                height: 20,
                width: 20,
                marginLeft: 16,
              }}
            />
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>
              Notifikasi
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={h1}>Aktivitas</Text>
        <Text style={[h5, styles.title]}>
          Notifikasi untuk promo dari kami, nikmati berbagai macam diskon dari
          kami
        </Text>

        {activity.length > 0 &&
          activity.map((item, i) => (
            <CustomSwitch
              key={i}
              label={
                item.key == 'native'
                  ? 'Push Notifications'
                  : item.key == 'sms'
                  ? 'SMS'
                  : 'Email'
              }
              defaultValue={item.value}
              onValueChange={() => methods.updateHandler(item, 'activity')}
            />
          ))}

        <View style={styles.line} />

        <Text style={[h1, {marginTop: 10}]}>Pengingat</Text>
        <Text style={[h5, styles.title]}>Notifikasi untuk penyewaan kamu</Text>

        {reminder.length > 0 &&
          reminder.map((item, i) => (
            <CustomSwitch
              key={i}
              label={
                item.key == 'native'
                  ? 'Push Notifications'
                  : item.key == 'sms'
                  ? 'SMS'
                  : 'Email'
              }
              defaultValue={item.value}
              onValueChange={() => methods.updateHandler(item, 'reminder')}
            />
          ))}
      </View>

      <Button
        _theme="navy"
        onPress={methods.handleSubmit}
        title={'Simpan'}
        isLoading={loading}
      />
    </View>
  );
};

export default hoc(NotificationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: '5%',
    justifyContent: 'space-between',
  },
  title: {fontSize: 12, color: theme.colors.grey5, marginBottom: 10},
  line: {
    borderWidth: 0.5,
    borderColor: theme.colors.grey5,
    marginVertical: 10,
  },
});
