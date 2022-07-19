import { useState } from 'react';
import { Button, Dimensions, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ExerciseView from '../components/Exercise/ExerciseView';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Exercise, Exercises } from '../types/Exercise';

export default function ExerciseScreen(props: RootTabScreenProps<'TabOne'>) {
  const [exercise] = useState(Exercises.get(Exercise.calm)); // TODO: Fetch Default

  
  if (exercise !== undefined) {
    return (
      <SafeAreaView style={styles.container}>
        <ExerciseView 
          style={styles.exercise} 
          exercise={exercise}
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
  },
  exercise: {
    flex: 8/10,
    justifyContent: 'flex-start',
  },
});
