import React, { useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { ExerciseType } from '../../types/Exercise'
import DurationPicker from './DurationPicker';

type Props = {
  style: ViewStyle,
  exercise: ExerciseType
  
}

const startingWidth = 100;
const maxWidth = Dimensions.get('screen').width * 0.85;

export default function ExerciseView (props: Props) {
  const [innerSize] = useState(new Animated.Value(startingWidth));
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(0);

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
        duration: props.exercise.inhaleDuration,
        useNativeDriver: false
      }
    );
    const shrinkAnimation = Animated.timing(
      innerSize,
      {
        toValue: startingWidth,
        duration: props.exercise.exhaleDuration,
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

  return (
    <View>
      {/* Title */}
      <Text style={styles.title}>{props.exercise.name}</Text>
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
      {/* Start/Pause Button */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => setShouldAnimate(!shouldAnimate)}>
          <Text style={styles.text}>{buttonText}</Text>
        </Pressable>
      </View>
      <DurationPicker handlePress={handleDurationPickerPress} exercise={props.exercise} selectedIndex={selectedDurationIndex}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  staticCenterView: {
    backgroundColor: 'red',
    width: startingWidth,
    height: startingWidth,
    borderRadius: startingWidth / 2,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
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
    backgroundColor: 'blue',
    opacity: 0.5,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 50,
    marginTop: 50,
    fontWeight: 'bold'
  },
  exercise: {
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    marginBottom: 30,
    backgroundColor: 'rgba(0,0,0,0.0)'
  },
  button: {
    backgroundColor: 'blue',
    height: 60,
    width: Dimensions.get('screen').width * 0.85,
    justifyContent: 'center',
    borderRadius: 6,
    opacity: 0.75
  }
});