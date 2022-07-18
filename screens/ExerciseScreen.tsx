import { useState } from 'react';
import { Button, Dimensions, Pressable, StyleSheet } from 'react-native';

import ExerciseView from '../components/Exercise/ExerciseView';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Exercise, Exercises } from '../types/Exercise';
import { ExerciseType } from '../types/ExerciseType';

export default function ExerciseScreen(props: RootTabScreenProps<'TabOne'>) {
  const [exercise, setExercise] = useState(Exercises.get(Exercise.calm));
  if (exercise !== undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{exercise.name}</Text>
        <ExerciseView style={styles.exercise} exercise={exercise}/>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.text}>Press Me</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <Text>{"OOPS"}</Text> // TODO: Add some kind of real error state + logging
    )
  }
}

function fetchFavorite(setExercise: React.Dispatch<React.SetStateAction<ExerciseType | undefined>>) {
  // TODO: Fetch favorite exercise

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1/10,
    fontSize: 22,
    marginBottom: 50,
    marginTop: 50,
    fontWeight: 'bold'
  },
  exercise: {
    flex: 8/10,
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    marginBottom: 30
  },
  button: {
    backgroundColor: 'blue',
    height: 60,
    width: Dimensions.get('screen').width * 0.85,
    justifyContent: 'center',
    borderRadius: 6,
    opacity: 0.75
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 22,
    letterSpacing: 0.5,
    textAlign: 'center'
  },
});
