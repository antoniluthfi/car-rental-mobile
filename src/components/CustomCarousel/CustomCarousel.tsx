import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {CarouselRenderItem} from 'react-native-reanimated-carousel/lib/typescript/types';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';
import CarouselButton from './CarouselButton';
import PaginationItem from './PaginationItem';

interface IProps {
  data: any[];
  renderItem: CarouselRenderItem<any>;
  carouselTitle?: string;
}

const CustomCarousel: React.FC<IProps> = ({
  data,
  renderItem,
  carouselTitle,
}) => {
  const progressValue = useSharedValue<number>(0);
  const ref = React.useRef<ICarouselInstance>(null);

  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <Carousel
        // loop
        ref={ref}
        width={WINDOW_WIDTH}
        height={WINDOW_HEIGHT / 3}
        // autoPlay
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={index => console.log('current index:', index)}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        renderItem={renderItem}
      />
      {!!progressValue && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 100,
            alignSelf: 'center',
          }}>
          {data.map((_, index) => {
            return (
              <PaginationItem
                backgroundColor="#344F67"
                animValue={progressValue}
                index={index}
                key={index}
                length={data.length}
              />
            );
          })}
        </View>
      )}

      <CarouselButton
        iconName="arrowleft"
        onPress={() => {
          ref.current?.scrollTo({count: -1, animated: true});
        }}
      />
      <CarouselButton
        iconName="arrowright"
        onPress={() => {
          ref.current?.scrollTo({count: 1, animated: true});
        }}
      />

      {!!carouselTitle && (
        <View style={styles.carouselTitleContainer}>
          <Text style={{fontWeight: 'bold'}}>{carouselTitle}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  carouselTitleContainer: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 20,
    top: 20,
  },
});
