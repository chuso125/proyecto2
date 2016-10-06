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
  <div class="title">
    { title }
  </div>
);

const NotesList = ({ notes, setColor, setText, setDeleted, setModifiedAt }) => (
  <span class="notes">
    {
      notes.map(note => (
        <div
          class="note"
          style={ {backgroundColor: note.color }}
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
    <div class="clear"></div>
  </span>
);

const Delete = ({ setDeleted}) => (
  <div class="fa fa-close delete" onClick={ setDeleted }></div>
);

const TextEditor = ({ text, noteId, setText, setModifiedAt }) => {
  let input;
  return(
  <textarea 
  class="textEditor" 
  defaultValue={text} 
  ref={ node => input = node } 
    onChange={ 
      () => {
        setText(input.value, noteId );
        setModifiedAt(Date(), noteId); 
      } 
    }></textarea>
  );
}

const ColorPicker = ({ color, noteId, setColor, setModifiedAt }) => {
  let input;
  return(
  <input class="color" type="color" defaultValue={color} ref={ node => input = node } 
    onChange={ 
      () => {
        setColor(input.value, noteId );
        setModifiedAt(Date(), noteId); 
      } 
    }/>
  );
}

export { Note, AddNote, NotesList };