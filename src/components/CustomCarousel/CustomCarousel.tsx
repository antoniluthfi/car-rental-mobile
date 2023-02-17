import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import CarouselButton from './CarouselButton';
import PaginationItem from './PaginationItem';
import React, {Fragment, ReactNode} from 'react';
import {CarouselRenderItem} from 'react-native-reanimated-carousel/lib/typescript/types';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';

interface IProps {
  data: any[];
  renderItem: CarouselRenderItem<any>;
  renderCarouselTitle?: ReactNode;
  autoPlay?: boolean;
  showButtonNavigator?: boolean;
  scrollAnimationDuration?: number;
  progressValueSpace?: number;
  height?: number;
  paginationSize?: number;
  paginationColor?: string;
  /**
   * @prop paginationPosition
   * Define margin to determine top position
   */
  paginationPosition?: number;
  containerStyle?: ViewStyle;
  carouselWidth?: number;
  showScrollDot?: boolean;
  loop?: boolean;
}

const CustomCarousel: React.FC<IProps> = ({
  data,
  renderItem,
  renderCarouselTitle,
  autoPlay = false,
  showButtonNavigator = true,
  scrollAnimationDuration = 1000,
  progressValueSpace = 100,
  height = WINDOW_HEIGHT / 3,
  paginationSize,
  paginationColor = '#344F67',
  paginationPosition,
  containerStyle = {width: '100%', alignItems: 'center'},
  carouselWidth = WINDOW_WIDTH,
  showScrollDot = true,
  loop = true,
}) => {
  const progressValue = useSharedValue<number>(0);
  const ref = React.useRef<ICarouselInstance>(null);

  return (
    <View style={containerStyle}>
      <Carousel
        loop={loop}
        ref={ref}
        width={carouselWidth}
        height={height}
        autoPlay={autoPlay}
        data={data}
        scrollAnimationDuration={scrollAnimationDuration}
        // onSnapToItem={index => console.log('current index:', index)}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        renderItem={renderItem}
      />
      {showScrollDot && !!progressValue && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: progressValueSpace,
            alignSelf: 'center',
          }}>
          {data.map((_, index) => {
            return (
              <PaginationItem
                backgroundColor={paginationColor}
                animValue={progressValue}
                index={index}
                key={index}
                length={data.length}
                size={paginationSize}
                marginTop={paginationPosition}
              />
            );
          })}
        </View>
      )}

      {showButtonNavigator && (
        <Fragment>
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
        </Fragment>
      )}

      {!!renderCarouselTitle && renderCarouselTitle}
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
