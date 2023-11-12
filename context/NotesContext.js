import React, { createContext, useState, useContext } from 'react';

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  return (
    <NotesContext.Provider value={{ notes, setNotes, selectedNoteId, setSelectedNoteId }}>
      {children}
    </NotesContext.Provider>
  );
};
