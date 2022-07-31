import { useState } from 'react';
import { Appearance, StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ExerciseView from '../components/Exercise/ExerciseView';
import { Text } from '../components/Themed';
import Colors from '../constants/Colors';
import { RootStackScreenProps } from '../types';
import { Exercise, Exercises } from '../types/Exercise';

const colorScheme = Appearance.getColorScheme() === 'dark' ? Colors.dark : Colors.light; // TODO: addChangeListener

export default function ExerciseScreen(props: RootStackScreenProps<'Root'>) {
  const [exercise] = useState(Exercises.get(Exercise.calm)); // TODO: Fetch Default

  if (exercise !== undefined) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
        backgroundColor={colorScheme.background}
        />
        <ExerciseView 
          style={styles.exercise} 
          exercise={exercise}
          parentProps={props}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <Text>{"OOPS"}</Text> // TODO: Add some kind of real error state + logging
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorScheme.background
  },
  exercise: {
    flex: 1
  },
});
