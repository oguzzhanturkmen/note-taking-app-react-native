import { View, Text, SafeAreaView, ScrollView , TouchableOpacity} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { TextInput } from 'react-native'
import { Bars3CenterLeftIcon, PencilSquareIcon } from 'react-native-heroicons/solid'
import { useState, useRef, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


const AUTOSAVE_INTERVAL_MS = 2000; // Autosave interval in milliseconds

export default function NoteScreen({ navigation, route}) {
    const [notes, setNotes] = useState([]); // Array of notes
    const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' });
    const headingInputRef = useRef();
    const noteInputRef = useRef();
    const [enterPressed, setEnterPressed] = useState(false);
    const [isNoteModified, setIsNoteModified] = useState(false);
  
    useEffect(() => {
        loadNotes();
        addNewNote();
      }, []);
    
      useEffect(() => {
        loadNotes();
        const selectedNote = route.params?.selectedNote; // Get the selected note from drawer
        if (selectedNote) {
          setCurrentNote(selectedNote);
          setIsNoteModified(false);
        } else {
          addNewNote();
        }
      }, [route.params?.selectedNote]);

      useEffect(() => {
        // Autosave interval setup
        
          if (isNoteModified) {
            saveCurrentNote();
          }
        
    
       
      }, [currentNote, isNoteModified]); 
      

      const loadNotes = async () => {
        try {
          const savedNotes = await AsyncStorage.getItem('@notes');
          if (savedNotes !== null) {
            setNotes(JSON.parse(savedNotes));
          }
        } catch (e) {
          console.log('Failed to load notes', e);
        }
      };
    
      const saveNotes = async () => {
        try {
          await AsyncStorage.setItem('@notes', JSON.stringify(notes));
          console.log('Notes saved');
          console.log(notes);
          setIsNoteModified(false);
        } catch (e) {
          console.log('Failed to save notes', e);
        }
      };
    
      const addNewNote = () => {
        if (isNoteModified) {
          saveCurrentNote();
        }
        setCurrentNote({ id: Date.now().toString(), title: '', content: '' });
        setIsNoteModified(false);
      };
    
      
const saveCurrentNote = () => {
  if (currentNote.id && isNoteModified) {
    if(currentNote.title === '' && currentNote.content === '') {
      return;
    }
    const updatedNotes = notes.filter(note => note.id !== currentNote.id);
    const newNotes = [...updatedNotes, currentNote];
    setNotes(newNotes);
    saveNotes(newNotes);  // Save to AsyncStorage
    setIsNoteModified(false);  // Reset the modification flag
    console.log('Note saved');
  }
};
    
      const selectNote = (noteId) => {
        // Save the current note before switching
        saveCurrentNote();
    
        const note = notes.find(n => n.id === noteId);
        if (note) {
          setCurrentNote(note);
        }
      };

   
  const handleHeadingChange = (text) => {
    if (!enterPressed) {
        setCurrentNote({ ...currentNote, title: text })
        
      }

      setEnterPressed(false);
        setIsNoteModified(true);
  };
  
  const handleContentChange = (text) => {
    if (currentNote.content !== text) {
      setCurrentNote({ ...currentNote, content: text });
      setIsNoteModified(true);
    }
  };

  // Handle key press on heading input
  const handleHeadingKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter') {
      setEnterPressed(true);
      noteInputRef.current.focus();
    }
    
    }
    const handleMenuPress = () => {
        saveCurrentNote();
        saveNotes();
        navigation.toggleDrawer();
      };



  return (
        <View className="flex-1 bg-neutral-800">
        <SafeAreaView className="flex-1 ">
            <StatusBar style="light" />
            <View className="flex flex-row items-center justify-between px-5 py-2">
                <TouchableOpacity onPress={handleMenuPress}>
            <Bars3CenterLeftIcon  size={34} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={addNewNote}>
            <PencilSquareIcon size={34} color="white" />
            </TouchableOpacity>
            </View>
            
            <TextInput
            
             className="text-4xl  mx-6 mt-3 mb-2 font-bold  text-white "
             ref={headingInputRef} // Attach the ref to the heading input
             value={currentNote.title}
             onChangeText={handleHeadingChange}
             onKeyPress={handleHeadingKeyPress}
            blurOnSubmit={false}
           
            multiline={true}
             />
           
           
            <TextInput 
            multiline={true} 
            className="text-lg  mx-7 my-3 font-light  text-white "
            ref={noteInputRef} // Attach the ref to the note input
            value={currentNote.content}
            onChangeText={handleContentChange}

            />
           
      </SafeAreaView>
   </View>  
  )
}