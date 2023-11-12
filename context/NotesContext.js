// NotesContext.js

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

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

  useEffect(() => {
    loadNotes();
  }, []);

  const value = {
    notes,
    setNotes,
    loadNotes,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};
