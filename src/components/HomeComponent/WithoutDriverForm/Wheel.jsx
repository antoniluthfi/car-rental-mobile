import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  clamp,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const ITEM_SIZE = 80;
const ITEM_COUNT = 12;
const RADIUS = (Dimensions.get('window').width - ITEM_SIZE) / 2;

const colors = {
  background: '#f5f5f5',
  text: '#333333',
  activeText: '#ffffff',
  activeBackground: '#f74b7f',
};

const useScrollHandler = () => {
  const translationY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translationY.value;
    },
    onActive: (event, ctx) => {
      translationY.value = clamp(
        ctx.startY + event.translationY,
        -RADIUS * 2 + ITEM_SIZE / 2,
        ITEM_SIZE / 2,
      );
    },
    onEnd: () => {
      translationY.value = withSpring(
        Math.round(translationY.value / ITEM_SIZE) * ITEM_SIZE,
      );
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translationY.value}],
    };
  });

  return {onGestureEvent, style};
};

const ScrollWheel = () => {
  const translationY = useSharedValue(0); // tambahkan ini

  const {onGestureEvent, style} = useScrollHandler();

  return (
    <View style={styles.container}>
      <View style={styles.mask} />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.scrollWheel, style]}>
          {Array.from({length: ITEM_COUNT}).map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.item,
                {
                  transform: [
                    {
                      rotate: `${index * (360 / ITEM_COUNT)}deg`,
                    },
                  ],
                },
              ]}>
              <Animated.View
                style={[
                  styles.itemInner,
                  {
                    backgroundColor:
                      index ===
                      Math.round(translationY.value / ITEM_SIZE) +
                        ITEM_COUNT / 2 -
                        1
                        ? colors.activeBackground
                        : colors.background,
                  },
                ]}>
                <Text
                  style={[
                    styles.itemText,
                    {
                      color:
                        index ===
                        Math.round(translationY.value / ITEM_SIZE) +
                          ITEM_COUNT / 2 -
                          1
                          ? colors.activeText
                          : colors.text,
                    },
                  ]}>
                  {index + 1}
                </Text>
              </Animated.View>
            </Animated.View>
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  mask: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderRadius: RADIUS,
  },
  scrollWheel: {
    width: ITEM_SIZE,
    height: ITEM_SIZE * ITEM_COUNT,
    overflow: 'hidden',
  },
  item: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  itemInner: {
    width: ITEM_SIZE * 0.8,
    height: ITEM_SIZE * 0.8,
    borderRadius: ITEM_SIZE * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ScrollWheel
