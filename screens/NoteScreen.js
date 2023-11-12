import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { TextInput } from 'react-native'
import { Bars3CenterLeftIcon, PencilSquareIcon } from 'react-native-heroicons/solid'
import { useState, useRef } from 'react'

export default function NoteScreen() {
    const [heading, setHeading] = useState('');
    const [note, setNote] = useState('');
    const [enterPressed, setEnterPressed] = useState(false);
    // Creating refs for the heading and note TextInputs
    const headingInputRef = useRef();
    const noteInputRef = useRef();
  
    

     // Handle heading text change
  const handleHeadingChange = (text) => {
    if (!enterPressed) {
      setHeading(text);
    }
    setEnterPressed(false);
  };

  // Handle key press on heading input
  const handleHeadingKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter') {
      setEnterPressed(true);
      noteInputRef.current.focus();
    }
    }



  return (
        <View className="flex-1 bg-neutral-800">
        <SafeAreaView className="flex-1 ">
            <StatusBar style="light" />
            <View className="flex flex-row items-center justify-between px-4 py-2">
            <Bars3CenterLeftIcon  size={34} color="white" />
            <PencilSquareIcon size={34} color="white" />
            </View>
            
            <TextInput
            
             className="text-4xl  mx-6 mt-3 mb-2 font-bold  text-white "
             ref={headingInputRef} // Attach the ref to the heading input
             value={heading}
             onChangeText={handleHeadingChange}
             onKeyPress={handleHeadingKeyPress}
            blurOnSubmit={false}
           
            multiline={true}
             />
           
           
            <TextInput 
            multiline={true} 
            className="text-lg  mx-7 my-3 font-light  text-white "
            ref={noteInputRef} // Attach the ref to the note input
            value={note}
            onChangeText={setNote}

            />
           
      </SafeAreaView>
   </View>  
  )
}