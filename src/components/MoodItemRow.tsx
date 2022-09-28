import {format} from 'date-fns';
import React, {useCallback} from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import {PanGestureHandler} from 'react-native-gesture-handler';
import Reanimated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAppContext} from '../App.provider';
import {theme} from '../theme';
import {MoodOptionWithTimeStamp} from '../types';

const DATE_FORMAT = "d MMM, yyyy 'at' hh:mm ";

type MoodItemRowProps = {
  mood: MoodOptionWithTimeStamp;
};

const width = Dimensions.get('window').width;
const maxSwipe = width / 2;

export default function MoodItemRow({mood}: MoodItemRowProps) {
  const appContext = useAppContext();
  const translateX = useSharedValue(0);

  const handleDeleteMood = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.handleDeleteMood(mood);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.handleDeleteMood, mood]);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: event => {
      if (event.translationX > maxSwipe) {
        translateX.value = withTiming(
          width,
          {duration: 100},
          finished => finished && runOnJS(handleDeleteMood)(),
        );
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} activeOffsetX={20}>
      <Reanimated.View style={[styles.row, cardStyle]}>
        <Text style={styles.moodText}>
          {mood.mood.emoji} {mood.mood.description}
        </Text>
        <Text style={styles.timestampText}>
          {format(new Date(mood.timestamp), DATE_FORMAT)}
        </Text>
      </Reanimated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 10,
    backgroundColor: theme.colorWhite,
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  moodText: {
    fontSize: 20,
    color: theme.colorPurple,
    fontWeight: 'bold',
  },
  timestampText: {
    color: theme.colorLavender,
  },
  deleteText: {
    color: theme.colorBlue,
  },
});
