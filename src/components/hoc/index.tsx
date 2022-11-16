import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  StyleSheet,
  StatusBarStyle,
} from 'react-native';
import theme from 'utils/theme';

const hoc =
  (
    Comp: any,
    statusBarColor?: string,
    translucent?: boolean,
    barStyle?: StatusBarStyle,
  ) =>
  ({children, ...props}: any) => {
    return (
      <>
        <StatusBar
          barStyle={barStyle || 'dark-content'}
          backgroundColor={statusBarColor || theme.colors.navBar.bar}
          translucent={translucent || false}
        />
        <SafeAreaView style={styles.container}>
          <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Comp {...props}>{children}</Comp>
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>
      </>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grey9,
  },
});

export default hoc;
