import React, { useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

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
  const [innerSize] = useState(new Animated.Value(startingWidth));

  function startAnimation() {

    const animations = [
      Animated.timing(
        innerSize,
        {
          toValue: maxWidth,
          duration: 4000,
          useNativeDriver: false
        }
      ),
      Animated.timing(
        innerSize,
        {
          toValue: startingWidth,
          duration: 6000,
          useNativeDriver: false
        }
      )
    ]

    Animated.sequence(animations).start()
    
    console.log("tap")
  }

  return (
    <Pressable style={styles.container} onPress={startAnimation}>
      <Animated.View style={{
          backgroundColor: 'blue',
          width: innerSize,
          height: innerSize,
          borderRadius: innerSize,
          zIndex: 1
        }}>
      </Animated.View>
      <View
        style={styles.outerView}
      >
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerView: {
    width: maxWidth,
    height: maxWidth,
    borderRadius: maxWidth / 2,
    justifyContent: 'center',
    backgroundColor: 'blue',
    opacity: 0.5,
    position: 'absolute'
  }
});