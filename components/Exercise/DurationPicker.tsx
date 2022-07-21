import { View, StyleSheet, Pressable, Text, ViewStyle } from "react-native"
import Colors from "../../constants/Colors";
import { ExerciseType } from "../../types/Exercise";

type Props = {
  style?: ViewStyle;
  exercise: ExerciseType;
  handlePress: (selection: number) => void;
  selectedIndex: number;
}

export default function DurationPicker(props: Props) {
  return (
    <View style={[props.style, styles.container]}>
      {/* Duration 1 */}
      <Pressable style={props.selectedIndex == 0 ? styles.selectedButton : styles.deselectedButton} onPress={() => props.handlePress(0)}>
        <Text style={styles.text}>{props.exercise.durationDisplayNames[0]}</Text>
      </Pressable>
      {/* Duration 2 */}
      <Pressable style={props.selectedIndex == 1 ? styles.selectedButton : styles.deselectedButton} onPress={() => props.handlePress(1)}>
        <Text style={styles.text}>{props.exercise.durationDisplayNames[1]}</Text>
      </Pressable>
      {/* Duration 3 */}
      <Pressable style={props.selectedIndex == 2 ? styles.selectedButton : styles.deselectedButton} onPress={() => props.handlePress(2)}>
        <Text style={styles.text}>{props.exercise.durationDisplayNames[2]}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    margin: 15,
    color: 'white'
  },
  selectedButton: {
    backgroundColor: Colors.lightBlue.a,
    borderRadius: 10,
  },
  deselectedButton: {
    backgroundColor: 'lightgray',
    borderRadius: 10
  }
})