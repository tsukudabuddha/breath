import React, { useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, View, Text } from 'react-native';

type Props = {
  // style: React.CSSProperties
}

type Exercise = {
  inhaleDuration: number
  exhaleDuration: number
  holdDuration: number
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

  function growAnimation() {
    Animated.timing(
      innerSize,
      {
        toValue: maxWidth,
        duration: 4000,
        useNativeDriver: false
      }
    ).start(growCompletion);
  }

  function shrinkAnimation() {
    Animated.timing(
      innerSize,
      {
        toValue: startingWidth,
        duration: 6000,
        useNativeDriver: false
      }
    ).start(shrinkCompletion);
  }

  return (
    <Pressable style={styles.container} onPress={growAnimation}>
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
    letterSpacing: 0.5
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