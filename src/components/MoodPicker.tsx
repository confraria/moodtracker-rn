import React, {useCallback, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {theme} from '../theme';
import {MoodOptionType} from '../types';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const moodOptions = [
  {emoji: '🧑‍💻', description: 'studious'},
  {emoji: '🤔', description: 'pensive'},
  {emoji: '😊', description: 'happy'},
  {emoji: '🥳', description: 'celebratory'},
  {emoji: '😤', description: 'frustrated'},
] as const;

const imgSrc = require('../../assets/butterflies.png');

type MoodPickerProps = {
  handleSelectMood: (m: MoodOptionType) => void;
};

export const MoodPicker: React.FC<MoodPickerProps> = ({handleSelectMood}) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = useState(false);

  const handleSelect = useCallback(() => {
    if (selectedMood) {
      handleSelectMood(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [handleSelectMood, selectedMood]);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      transform: [
        {
          scale: selectedMood ? withTiming(1) : withTiming(0.8),
        },
      ],
    }),
    [selectedMood],
  );

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imgSrc} />
        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonText}>Choose another!</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you right now</Text>
      <View style={styles.itemSelector}>
        {moodOptions.map(o => (
          <View key={o.description}>
            <Pressable
              onPress={() => setSelectedMood(o)}
              style={[
                styles.moodItem,
                o.emoji === selectedMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text style={styles.moodText}>{o.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {selectedMood?.emoji === o.emoji ? o.description : ' '}
            </Text>
          </View>
        ))}
      </View>

      <ReanimatedPressable
        style={[styles.button, buttonStyle]}
        disabled={!selectedMood}
        onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </ReanimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: theme.colorPurple,
    borderWidth: 3,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 260,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: theme.colorPurple,
    padding: 10,
    alignItems: 'center',
    width: 150,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: theme.fontFamilyRegular,
    color: theme.colorWhite,
  },
  title: {
    textAlign: 'center',
    color: theme.colorBlue,
    fontSize: 24,
    fontFamily: theme.fontFamilyBold,
  },
  itemSelector: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  moodText: {
    fontSize: 25,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
});
