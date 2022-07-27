import { Animated, StyleSheet, View, Text } from 'react-native';
type Props = {
  progress: Animated.Value,
  width?: number
}

export default function ProgressBar(props: Props) {
  const additionalContainerStyling = {width: props.width ?? 100}
  return (
    <View style={[styles.container, additionalContainerStyling]}>
      <View style={styles.totalProgress}>
        <Animated.View style={[styles.progressBar, {width: props.progress}]}/>
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