import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';
import AppNavigator from './app/navigation/appNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { AudioProvider } from './app/context/AudioProvider';
import AudioListItem from './app/components/AudioListItem';
export default function App() {
  const [sound, setSound] = useState();
  return (
    <AudioProvider>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </AudioProvider>

  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
