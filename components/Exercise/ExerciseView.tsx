import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View, Text, StyleProp, ViewStyle, Appearance, Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withRepeat, cancelAnimation, runOnJS } from 'react-native-reanimated';
import Colors from '../../constants/Colors';
import { ExerciseType } from '../../types/Exercise'
import DurationPicker from './DurationPicker';
import { RootStackScreenProps } from '../../types';
import ProgressBar from '../Shared/ProgressBar';

type Props = {
  style: ViewStyle,
  exercise: ExerciseType,
  parentProps: RootStackScreenProps<'Root'>,
}

const startingWidth = 100;
const maxWidth = Dimensions.get('screen').width * 0.85;
const colorScheme = Appearance.getColorScheme() === 'dark' ? Colors.dark : Colors.light;
const progressBarWidth = Dimensions.get('screen').width * 0.5;

export default function ExerciseView (props: Props) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(0);
  const [exercise, setExercise] = useState(props.exercise);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const innerSize = useSharedValue(startingWidth);

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

    // Breathing Animation
    const sequence = withSequence(
      withTiming(maxWidth, {duration: exercise.inhaleDuration}), // Grow Animation
      withTiming(Platform.OS == "ios" ? startingWidth : startingWidth - 1, {duration: exercise.exhaleDuration} ), // Shrink Animation
    )
    innerSize.value = withRepeat(sequence, iterations, false, () => runOnJS(animationCallback)());
  }

  if (shouldAnimate) {
    startAnimation();
  } else {
    cancelAnimation(innerSize);
    innerSize.value = startingWidth;
  }

  function didSelectHandler(exercise: ExerciseType) {
    setExercise(exercise);
    props.parentProps.navigation.pop();
  }

  function startPauseButtonHandler() {
    setProgressBarValue(0);
    setShouldAnimate(!shouldAnimate);
  }

  const holdDuration = exercise.holdDuration ?? 0;
  const duration = (exercise.inhaleDuration + exercise.exhaleDuration + holdDuration) * iterations;

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      width: innerSize.value,
      height: innerSize.value,
      borderRadius: innerSize.value / 2
    }
  });

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
          <View style={styles.staticCenterView}/>
          <Animated.View style={[styles.animatedCircle, animatedCircleStyle]}/>
        </Pressable>
      </View>
      {/* Progress Bar */}
      <ProgressBar shouldAnimate={shouldAnimate} value={progressBarValue} style={{width: progressBarWidth}} duration={duration}/>
      {/* Duration Picker */}
      <DurationPicker style={styles.durationPicker} handlePress={handleDurationPickerPress} exercise={props.exercise} selectedIndex={selectedDurationIndex}/>
      {/* Start/Pause Button */}
      <View style={[styles.buttonContainer, styles.horizontalStack]}>
        <Pressable style={[styles.button, styles.primary]} onPress={startPauseButtonHandler}>
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
  animatedCircle: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationPicker: {
    width: progressBarWidth,
    margin: 5
  },
  staticCenterView: {
    backgroundColor: Colors.lightBlue.e,
    width: startingWidth,
    height: startingWidth,
    borderRadius: startingWidth / 2,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  text: {
    color: colorScheme.text,
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.1,
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