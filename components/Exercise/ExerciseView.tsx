import React, { useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { ExerciseType } from '../../types/ExerciseType';

type Props = {
  style: ViewStyle,
  exercise: ExerciseType
}

const startingWidth = 100;
const maxWidth = Dimensions.get('screen').width * 0.85;

export default function ExerciseView (props: Props) {
  const [centerText, setCenterText] = useState("Inhale");
  const [innerSize] = useState(new Animated.Value(startingWidth));

  function growCompletion() {
    setCenterText("Exhale")
    shrinkAnimation()
  }

  function shrinkCompletion() {
    // TODO: Check if the breathwork is over
    setCenterText("Inhale")
  }

  /// Inhale Animation
  function growAnimation() {
    Animated.timing(
      innerSize,
      {
        toValue: maxWidth,
        duration: props.exercise.inhaleDuration,
        useNativeDriver: false
      }
    ).start(growCompletion);
  }

  /// Exhale Animation
  function shrinkAnimation() {
    Animated.timing(
      innerSize,
      {
        toValue: startingWidth,
        duration: props.exercise.exhaleDuration,
        useNativeDriver: false
      }
    ).start(shrinkCompletion);
  }

  function startAnimation() {
    growAnimation()
  }

  return (
    <Pressable style={props.style} onPress={startAnimation}>
      <View
        style={styles.outerView}
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
            <Text style={styles.text}>{centerText}</Text>
          </View>
        </Animated.View>
      </View>
    </Pressable>
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
  }
});