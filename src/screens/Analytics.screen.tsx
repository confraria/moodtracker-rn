import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {VictoryPie, VictoryTheme} from 'victory-native';
import {useAppContext} from '../App.provider';
import {MoodOptionWithTimeStamp} from '../types';

export const Analytics: React.FC = () => {
  const {moodList} = useAppContext();

  const data = useMemo(() => {
    const map = moodList.reduce((m, item) => {
      const key = item.mood.emoji;
      m[key] = (m[key] || 0) + 1;
      return m;
    }, {} as Record<MoodOptionWithTimeStamp['mood']['emoji'], number>);
    return Object.entries(map).map(([emoji, count]) => ({emoji, count}));
  }, [moodList]);
  return (
    <View style={styles.container}>
      <VictoryPie
        x="emoji"
        y="count"
        labelPosition="centroid"
        style={{
          labels: {fontSize: 24},
        }}
        labelRadius={({radius}) => (radius as number) * 0.6}
        theme={VictoryTheme.material}
        data={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
});
