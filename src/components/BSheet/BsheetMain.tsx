import BottomSheet, {WINDOW_HEIGHT, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {toggleBSheet, utilsState} from 'redux/features/utils/utilsSlice';
import {useAppDispatch, useAppSelector} from 'redux/hooks';

const BsheetMain = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isClose, setIsClose] = useState(false);
  const dispatch = useAppDispatch();

  const isShowBsheet = useAppSelector(utilsState);

  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log('handleSheetChanges', index);
      if (index === -1) {
        dispatch(toggleBSheet(false));
      }
    },
    [isShowBsheet.isShowBSHeet],
  );

  // renders
  return (
    <View style={[styles.container, {height: WINDOW_HEIGHT}]}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}>
        <View style={styles.contentContainer}>
          {isShowBsheet?.contentBsheet && isShowBsheet?.contentBsheet}
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    // backgroundColor: 'grey',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position: 'absolute',
    // bottom: 0,
    width: WINDOW_WIDTH,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BsheetMain;
