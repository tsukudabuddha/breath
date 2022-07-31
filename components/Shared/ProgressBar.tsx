import { useState } from 'react';
import {StyleSheet, View, Text, ViewStyle } from 'react-native';
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
type Props = {
  style: ViewStyle,
  shouldAnimate: boolean,
  duration: number,
  value: number,
}

export default function ProgressBar(props: Props) {
  const [isAnimating, setIsAnimating] = useState(false);
  const progress = useSharedValue(0);
  if (typeof props.style.width !== 'number') {
    return (<Text>Oops, an error has occurred</Text>)
  }
  const width = props.style.width ?? 100
  if (!isAnimating && props.shouldAnimate) {
    progress.value = withTiming(width, { duration: props.duration });
  } else {
    cancelAnimation(progress);
    progress.value = 0;
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: progress.value
    }
  })

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.totalProgress}>
        <Animated.View style={[styles.progressBar, animatedStyle]}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 5
  },
  progressBar: {
    backgroundColor: 'red',
    height: 5,
    zIndex: -1
  },
  totalProgress: {
    backgroundColor: 'gray',
    height: 5,
    alignSelf: 'stretch',
    zIndex: 0
  }
})