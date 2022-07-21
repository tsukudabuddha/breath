import { FlatList, Pressable, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { RootStackScreenProps } from "../../types";
import { Exercises, ExerciseType } from "../../types/Exercise";

export default function ExerciseList(props: RootStackScreenProps<'Modal'>) {
  const data = Array.from(Exercises.values());

  const renderItem = ({ item }) => {
    if ('name' in item) {
      return (
        <Pressable style={styles.button} onPress={() => props.route.params.didTapHandler(item)}>
          <Text style={styles.text}>{item.name}</Text>
        </Pressable>
      )
    } else {
      return (<Text>Oops</Text>)
    }
  }
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: Colors.lightBlue.d,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginHorizontal: 30,
    marginVertical: 5

  },
  text: {
    fontSize: 18,
    // color: 'white',
    fontWeight: '800'
  }
})