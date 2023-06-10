import React, { Component , createContext} from 'react';
import {Text,View, Alert} from 'react-native';
import * as MediaLibrary from 'expo-media-library'
import { DataProvider } from 'recyclerlistview';
export const AudioContext = createContext();

export class AudioProvider extends Component{
    constructor(props){
        super(props);
        this.state = {
            audioFiles: [],
            permissonError : false,
            dataProvider : new DataProvider((r1,r2)=>r1 !== r2),
            playbackObj : null,
            soundObj : null,
            currentAudio :{},
            isPlaying : false,
            currentAudioIndex: null
        }
    }
    permissionAllert = ()=>{
        Alert.alert("Permission Required","This app needs to read Audio Files!",[{
            text : 'Im Ready!',
            onPress: ()=> this.getPermission()
        },{
            text : 'Cancel',
            onPress: ()=> this.permissionAllert()
        }]);
    }
    getAudioFiles = async ()=>{
        const {dataProvider,audioFiles} = this.state
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first : media.totalCount 
        });

        this.setState({...this.state,
            dataProvider : dataProvider.cloneWithRows([
                ...audioFiles, 
                ...media.assets]),
             audioFiles: [
                ...audioFiles,
                ...media.assets]
        });
    }
    getPermission = async ()=>{
        const permission = await MediaLibrary.getPermissionsAsync()
        if(permission.granted){
            //We want to get all the audio files
            this.getAudioFiles();
        }
        if(!permission.canAskAgain && !permission.granted){
            this.setState({...this.state,permissonError : true});
        }
        if(!permission.granted && permission.canAskAgain){
            const {status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
            if(status === 'denied' && canAskAgain){
                // we are going to display alert that use must allow this permission to work this app

                this.permissionAllert();

            }
            if(status === 'granted'){
                //We want to get all the audio files
                this.getAudioFiles();
            }
            if(status === 'denied' && !canAskAgain){
                //we want to display some error to the user
                this.setState({...this.state, permissonError : true})
            }
        }
    }
    componentDidMount(){
        this.getPermission();
    }
    updateState = (prevState, newState = {}) =>{
        this.setState({...prevState, ... newState})
    }
    render(){
        const {
            audioFiles,
            dataProvider,
            permissonError,
            playbackObj,
            soundObj,
            currentAudio,
            isPlaying,
            currentAudioIndex
        } = this.state;
        if(permissonError) return <View style={{flex : 1,
            justifyContent : 'center',
            alignItems : 'center'}}>
            <Text style={{fontSize:25,textAlign: 'center',color: 'red '}}>it looks like you haven't accept the permission</Text>
        </View>
        return(
            <AudioContext.Provider value={{audioFiles,dataProvider,playbackObj,soundObj,currentAudio,isPlaying,currentAudioIndex,updateState : this.updateState}}>
                {this.props.children}
            </AudioContext.Provider>
        )
    }
}


export default AudioProvider

