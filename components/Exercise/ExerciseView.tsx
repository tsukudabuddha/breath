import React, { useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
  style: React.CSSProperties
}

type Exercise = {
  inhaleDuration: number
  exhaleDuration: number
  holdDuration: number

}

export default function ExerciseView (props: Props) {
  const maxWidth = Dimensions.get('screen').width * 0.85;
  const startingWidth = 50;
  const [innerSize] = useState(new Animated.Value(startingWidth));

  function startAnimation() {

    const animations = [
      Animated.timing(
        innerSize,
        {
          toValue: maxWidth,
          duration: 1000,
          useNativeDriver: false
        }
      ),
      Animated.timing(
        innerSize,
        {
          toValue: 50,
          duration: 1000,
          useNativeDriver: false
        }
      )
    ]

    Animated.sequence(animations).start()
    
    console.log("tap")
  }

  const outerViewStyle = {
    height: maxWidth,
    width: maxWidth,
    borderRadius: maxWidth
  }

  return (
    <Pressable style={styles.container} onPress={startAnimation}>
      <View
        style={{...styles.animatedContainer}}
      >
        <Animated.View style={{
          backgroundColor: 'red',
          width: innerSize,
          height: innerSize,
          borderRadius: innerSize 
        }}>
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue'
  },
  animatedContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
  }
});