import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, View, Text, StyleProp, ViewStyle, Appearance } from 'react-native';
import Colors from '../../constants/Colors';
import { RootTabScreenProps } from '../../types';
import { ExerciseType } from '../../types/Exercise'
import DurationPicker from './DurationPicker';

type Props = {
  style: ViewStyle,
  exercise: ExerciseType,
  parentProps: RootTabScreenProps<'TabOne'>,
}

const startingWidth = 100;
const maxWidth = Dimensions.get('screen').width * 0.85;
const colorScheme = Appearance.getColorScheme() === 'dark' ? Colors.dark : Colors.light

export default function ExerciseView (props: Props) {
  const [innerSize] = useState(new Animated.Value(startingWidth));
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(0);
  const [exercise, setExercise] = useState(props.exercise);

  let buttonText = "Start"
  let iterations = props.exercise.durationOptions[selectedDurationIndex];

  if (shouldAnimate) {
    buttonText = "Cancel"
  }

  function handleDurationPickerPress(option: number) {

    setSelectedDurationIndex(option);
  }

  // MARK: Animation
  function startAnimation() {
    function animationCallback() {
      buttonText = "Start";
      setShouldAnimate(false); // Hack? To force change button text
    }
    const growAnimation = Animated.timing(
      innerSize,
      {
        toValue: maxWidth,
        duration: exercise.inhaleDuration,
        useNativeDriver: false
      }
    );
    const shrinkAnimation = Animated.timing(
      innerSize,
      {
        toValue: startingWidth,
        duration: exercise.exhaleDuration,
        useNativeDriver: false
      }
    );
    let sequence = Animated.sequence(
      [growAnimation, shrinkAnimation]
    )
    Animated.loop(sequence, {iterations:iterations}).start(animationCallback);
  }

  if (shouldAnimate) {
    startAnimation();
  } else {
    innerSize.stopAnimation();
    innerSize.setValue(startingWidth);
  }

  function didSelectHandler(exercise: ExerciseType) {
    setExercise(exercise);
    props.parentProps.navigation.pop();
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{exercise.name}</Text>
      {/* Animated Circles */}
      <View style={props.style}>
        <Pressable
          style={styles.outerView}
          onPress={() => setShouldAnimate(!shouldAnimate)}
        >
          <Animated.View style={{
            backgroundColor: 'white',
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1
          }}>
            <View style={styles.staticCenterView}>
            </View>
          </Animated.View>
        </Pressable>
      </View>
      <DurationPicker style={styles.durationPicker} handlePress={handleDurationPickerPress} exercise={props.exercise} selectedIndex={selectedDurationIndex}/>
      {/* Start/Pause Button */}
      <View style={[styles.buttonContainer, styles.horizontalStack]}>
        <Pressable style={[styles.button, styles.primary]} onPress={() => setShouldAnimate(!shouldAnimate)}>
          <Text style={styles.text}>{buttonText}</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.secondary]} onPress={() => props.parentProps.navigation.navigate('Modal', {
          didTapHandler: didSelectHandler
          })}
        >
          <Text style={styles.text}>Change</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationPicker: {
    width: Dimensions.get('screen').width * 0.5,
    marginBottom: 20
  },
  staticCenterView: {
    backgroundColor: Colors.lightBlue.e,
    width: startingWidth,
    height: startingWidth,
    borderRadius: startingWidth / 2,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colorScheme.text,
    fontWeight: '700',
    fontSize: 22,
    letterSpacing: 0.5,
    textAlign: 'center'
  },
  outerView: {
    width: maxWidth,
    height: maxWidth,
    borderRadius: maxWidth / 2,
    justifyContent: 'center',
    backgroundColor: Colors.lightBlue.a,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 50,
    marginTop: 50,
    fontWeight: 'bold',
    color: colorScheme.text
  },
  exercise: {
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    marginBottom: 30,
    backgroundColor: 'rgba(0,0,0,0.0)',
    marginHorizontal: 15
  },
  horizontalStack: {
    flexDirection: 'row-reverse'
  },
  button: {
    height: 60,
    justifyContent: 'center',
    borderRadius: 6,
    margin: 5
  },
  primary: {
    flex: 3/4,
    backgroundColor: Colors.lightBlue.b,
  },
  secondary: {
    flex: 1/4,
    backgroundColor: Colors.lightBlue.c,
  }
});