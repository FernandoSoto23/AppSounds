import react from "react";
import { View,StyleSheet} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AudioList from "../screens/AudioList";
import Player from "../screens/Player";
import PlayList from "../screens/PlayList";
import { Ionicons ,FontAwesome5,MaterialIcons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


const AppNavigator = () =>{
    return <Tab.Navigator>
        <Tab.Screen name='AudioList' component={AudioList} options={{
            tabBarIcon : ({color,size})=>(<Ionicons name="headset" size={size} color={color}/>)
        }} />
        <Tab.Screen name='Player' component={Player} options={{
            tabBarIcon : ({color,size})=>(<FontAwesome5 name="compact-disc" size={size} color={color} />)
        }}/>
        <Tab.Screen name='PlayList' component={PlayList} options={{
            tabBarIcon : ({color,size})=>(<MaterialIcons name="my-library-music" size={size} color={color} />)
        }}/>
        
    </Tab.Navigator>
}

export default AppNavigator;