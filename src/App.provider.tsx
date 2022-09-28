import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, PropsWithChildren, useContext} from 'react';
import {MoodOptionType, MoodOptionWithTimeStamp} from './types';

type AppData = {
  moodList: MoodOptionWithTimeStamp[];
};

const dataKey = 'my-app-data';

const setAppData = async (appData: AppData) => {
  try {
    const result = await AsyncStorage.setItem(dataKey, JSON.stringify(appData));
  } catch {}
};

const getAppData = async () => {
  try {
    const result = await AsyncStorage.getItem(dataKey);
    if (result) {
      return JSON.parse(result);
    }
    return null;
  } catch {}
};

type AppContextType = {
  moodList: MoodOptionWithTimeStamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
  handleDeleteMood: (mood: MoodOptionWithTimeStamp) => void;
};

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => undefined,
});

export const AppProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimeStamp[]>([]);
  const handleSelectMood = useCallback((mood: MoodOptionType) => {
    setMoodList(list => {
      const newMoodList = [...list, {mood, timestamp: Date.now()}];
      setAppData({moodList: newMoodList});
      return newMoodList;
    });
  }, []);

  const handleDeleteMood = useCallback((mood: MoodOptionWithTimeStamp) => {
    setMoodList(current => {
      const newMoodList = current.filter(m => m.timestamp !== mood.timestamp);
      setAppData({moodList: newMoodList});
      return newMoodList;
    });
  }, []);

  useEffect(() => {
    const fetchAppData = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moodList);
      }
    };
    fetchAppData();
  }, []);

  return (
    <AppContext.Provider value={{moodList, handleSelectMood, handleDeleteMood}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
