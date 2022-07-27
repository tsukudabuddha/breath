import { useState } from 'react';
import { Animated, StyleSheet, View, Text, ViewStyle } from 'react-native';
type Props = {
  style: ViewStyle,
  shouldAnimate: boolean,
  duration: number,
  value: number,
}

export default function ProgressBar(props: Props) {
  const [progress] = useState(new Animated.Value(0));
  const [isAnimating, setIsAnimating] = useState(false);
  if (typeof props.style.width !== 'number') {
    return (<Text>Oops, an error has occurred</Text>)
  }
  const width = props.style.width ?? 100
  if (!isAnimating && props.shouldAnimate) {
    progress.setValue(props.value);
    Animated.timing(progress, {
      toValue: width, 
      duration: props.duration, 
      useNativeDriver: false
    }).start();
  } else {
    progress.setValue(props.value);
  }

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.totalProgress}>
        <Animated.View style={[styles.progressBar, {width: progress}]}/>
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