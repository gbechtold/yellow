'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Note {
  _id: string;
  title: string;
  content: { [key: string]: string };
  type: string;
  createdAt: string;
  updatedAt: string;
}

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({
    title: '',
    content: { text: '' },
    type: 'Allgemein'
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewNote(prev => ({
      ...prev,
      [name]: name === 'content' ? { text: value } : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/notes', newNote);
      setNewNote({
        title: '',
        content: { text: '' },
        type: 'Allgemein'
      }); // Reset form
      fetchNotes(); // Refresh the list of notes
    } catch (error) {
      console.error('Error adding new note:', error);
    }
  };

  return (
    <div className="container">
      <h1>Notizen</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newNote.title}
          onChange={handleInputChange}
          placeholder="Titel"
          required
        />
        <input
          type="text"
          name="content"
          value={newNote.content.text}
          onChange={handleInputChange}
          placeholder="Inhalt"
          required
        />
        <select
          name="type"
          value={newNote.type}
          onChange={handleInputChange}
        >
          <option value="Allgemein">Allgemein</option>
          <option value="Produkt">Produkt</option>
          <option value="Unternehmen">Unternehmen</option>
        </select>
        <button type="submit">Notiz hinzufügen</button>
      </form>
      {notes.length > 0 ? (
        notes.map(note => (
          <div className="note" key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content.text}</p> 
          </div>
        ))
      ) : (
        <p>Keine Notizen gefunden.</p>
      )}
      <style jsx>{`
        .container {
          padding: 20px;
          background-color: #f0f0f0; // Hellgrauer Hintergrund für bessere Sichtbarkeit
        }
        h1 {
          margin: 0 0 10px 0;
          color: #000;
        }
        form {
          margin-bottom: 20px;
        }
        input, select {
          display: block;
          margin: 10px 0;
          padding: 8px;
          color: #000;
          width: 300px; // Feste Breite für alle Formular-Elemente
        }

        button {
          display: block;
          margin: 10px 0;
          padding: 8px;
          color: #eee;
          background-color: #000;
          width: 300px; // Feste Breite für alle Formular-Elemente
        }

        .note {
          background-color: #ffeb3b; /* Gelbe Farbe, typisch für Post-its */
          padding: 15px;
          margin: 10px 0;
          color: #000; /* Schwarze Schriftfarbe für gute Lesbarkeit */
          border-radius: 8px;
          width: 300px; /* Feste Breite */
          height: 200px; /* Feste Breite */
          box-shadow: 5px 5px 10px rgba(0,0,0,0.1); /* Schatten für einen leicht erhöhten Effekt */
         
      }
      
        .note h3 {
          margin: 0 0 10px 0;
          color: #000;
        }
        .note p {
          margin: 0;
          color: #ccc;
        }
      `}</style>
    </div>
  );
};

export default NotesPage;
