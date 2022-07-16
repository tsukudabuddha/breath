import { StyleSheet, View, Text } from 'react-native';
type Props = {
  count: number
  total: number
}

export default function ProgressBar(props: Props) {
  return (
    <View style={{backgroundColor: 'red'}}/>
  )
}