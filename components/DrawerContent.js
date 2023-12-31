import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Swipeable } from 'react-native-gesture-handler';
import { useRef } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { useNotes } from "../context/NotesContext"; // Update the path
import { TrashIcon } from 'react-native-heroicons/solid';

const DrawerContent = ({ navigation }) => {
  const { notes, setNotes } = useNotes();
  
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const swipeableRefs = new Map();
 
 

  const clearAllNotes = async () => {
    setNotes([]);
    await AsyncStorage.setItem('@notes', JSON.stringify([]));
  };

  
  const deleteNote = async (noteId) => {
    const filteredNotes = notes.filter(note => note.id !== noteId);
    setNotes(filteredNotes);
    await AsyncStorage.setItem('@notes', JSON.stringify(filteredNotes));
  
    if (selectedNoteId === noteId) {
      setSelectedNoteId(null); // Add this line
    }
  };

 

  const renderRightActions = (noteId, index) => {
    return (
      <TouchableOpacity onPress={() => {
        deleteNote(noteId);
        swipeableRefs.get(index)?.close(); // Close swipeable when deleting
      }} style={{ backgroundColor: 'red', justifyContent: 'center' , }}>
        <Text style={{ color: 'white', padding: 20 }}>Delete</Text>
      </TouchableOpacity>
    );
  };
  ;

  return (
    <View className="bg-neutral-800 h-full"
    >
        
        <SafeAreaView className="mx-  ">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-3xl mx-2 font-bold  text-white p-2">Notes</Text>
            <TouchableOpacity className="rounded-full bg-yellow-600 mx-4 p-2"
            onPress={clearAllNotes
}
            
            >
              <TrashIcon size={24} color="white" />

            </TouchableOpacity>

            </View>
            <ScrollView className=""
            contentContainerStyle={{paddingBottom : 30}}>
                <View className="flex flex-col justify-between mb-2 rounded-2xl  mx-2 bg-neutral-900 overflow-hidden">
      {notes.map((note, index) => (
       <Swipeable
       key={note.id}
       ref={ref => {
         
       }}
       onSwipeableClose={() => swipeableRefs.delete(index)} // Cleanup ref
       renderRightActions={() => renderRightActions(note.id, index)}
       friction={100}
       rightThreshold={1}
     >
        <TouchableOpacity className={selectedNoteId === note.id ? " rounded-xl py-3  border-b-2 bg-yellow-600 border-neutral-800 " : " rounded-xl mx-4 py-3  border-b-2 border-neutral-800 "}
        key={index} onPress={() => {
          setSelectedNoteId(note.id); // Update the selected note ID
          navigation.navigate('NoteScreen', { selectedNote: note });
        }}
        >
          <Text className="text-white font-bold text-m mx-3 text"
          >{note.title.length > 30 ? note.title.substring(0,30) + "..." : note.title}</Text>
           <Text className={selectedNoteId === note.id ? "text-neutral-100 text-s mx-3 text" : "text-neutral-200 text-s mx-3 text" }>
          {note.content.length > 27 ? note.content.substring(0,27) + "..." : note.content}</Text>
         
        </TouchableOpacity>
        </Swipeable>
        
      ))}
        </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default DrawerContent;
