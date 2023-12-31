

//playing audio
export const play = async (playbackObj,uri)=>{
    try{
        return await playbackObj.loadAsync(
            {uri },
            {shouldPlay : true}
        );
    } catch (error){
        console.log('error inside play helper method',error);
    }

}


//pause audio

export const pause = async (playbackObj)=>{
    try{
        return await playbackObj.setStatusAsync({shouldPlay : false});
    } catch (error){
        console.log('error inside play helper method',error);
    }
}


//resumen audio

export const resumen = async (playbackObj)=>{
    try{
        return await playbackObj.playAsync();
    } catch (error){
        console.log('error inside resumen helper method',error);
    }
}


//select another audio

export const playNext = async (playbackObj,uri)=>{
    try{
        await playbackObj.stopAsync();
        await playbackObj.unloadAsync();
        return await play(playbackObj,uri);
    }catch(error){
        console.log('error inside playNext helper method',error);
    }
}
