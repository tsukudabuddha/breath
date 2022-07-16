import { Button, StyleSheet } from 'react-native';

import ExerciseView from '../components/Exercise/ExerciseView';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function ExerciseScreen(props: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.route.params.title}</Text>
      <ExerciseView/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 50,
    fontWeight: 'bold'
  }
});
