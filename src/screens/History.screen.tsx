import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useAppContext} from '../App.provider';
import MoodItemRow from '../components/MoodItemRow';

export const History: React.FC = () => {
  const {moodList} = useAppContext();
  return (
    <ScrollView style={styles.container}>
      {moodList.map(mood => (
        <MoodItemRow key={mood.timestamp} mood={mood} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
