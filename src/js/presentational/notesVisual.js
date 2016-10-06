import React from 'react';
import ReactDOM from 'react-dom';

const AddNote = ({ onAddNote, children }) => {
  let input;

  return (
    <div>
      <input type="text" ref={ node => input = node } placeholder={ children } onKeyDown={
          (e) => { 
            if(e.keyCode == 13){
              onAddNote(input.value);
              input.value = "";
            }
          }
        }/>
    </div>
  );
}

const Note = ({ title }) => (
  <li>
    { title }
  </li>
);

const NotesList = ({ notes, setColor, setText, setDeleted, setModifiedAt }) => (
  <ul>
    {
      notes.map(note => (
        <div
          key={ note.id } >
            <Note
              title={ note.title } />
            <ColorPicker
                setColor={ setColor }
                color={ note.color }
                setModifiedAt={ setModifiedAt }
                noteId={ note.id }/>
            <TextEditor
                setText={ setText }
                text={ note.text }
                setModifiedAt={ setModifiedAt }
                noteId={ note.id }/>
            <Delete
                setDeleted={ () => setDeleted(true, note.id ) }/>
        </div>
      ))
    }
  </ul>
);

const Delete = ({ setDeleted}) => (
  <button onClick={ setDeleted }>X</button>
);

const TextEditor = ({ text, noteId, setText, setModifiedAt }) => {
  let input;
  return(
  <input type="text" defaultValue={text} ref={ node => input = node } 
    onChange={ 
      () => {
        setText(input.value, noteId );
        setModifiedAt(Date(), noteId); 
      } 
    }/>
  );
}

const ColorPicker = ({ color, noteId, setColor, setModifiedAt }) => {
  let input;
  return(
  <input type="color" defaultValue={color} ref={ node => input = node } 
    onChange={ 
      () => {
        setColor(input.value, noteId );
        setModifiedAt(Date(), noteId); 
      } 
    }/>
  );
}

export { Note, AddNote, NotesList };