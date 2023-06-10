import react from "react";
import { View,StyleSheet,Text } from "react-native";
import * as MediaLibrary from 'expo-media-library'

const Player = () =>{
    const media = async ()=>{
        const a = await MediaLibrary.getPermissionsAsync();
        console.log(a)
    }
    media();
    return(
        <View style={styles.container}>
            <Text>Player</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
});

export default Player;