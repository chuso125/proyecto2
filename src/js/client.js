
import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import '../styles/index.scss';

import v4 from 'uuid-v4';
import {  todoNotes } from './reducers/todos';
import {  notes } from './reducers/notes';
import { visibilityFilter } from './reducers/visibility';
import { Todo, getVisibleTodos, TodoList, AddTodo, TodoNotesList, AddTodoNote } from './presentational/todosVisual';
import { Note, AddNote, NotesList } from './presentational/notesVisual';
import { GeneralFooter, getVisibleElements, Search } from './presentational/filterVisual';
import undoable from 'redux-undo';
import { ActionCreators } from 'redux-undo';


const { Component } = React;

const todoApp = combineReducers({
  todoNotes,
  visibilityFilter,
  notes
});

const loadState = () => {
  try{
    let result = JSON.parse(localStorage.getItem('sate'));; 
    return result ? {past: [], present: result, future: []} : undefined;
  }catch(err){
    return undefined;
  }
}
const saveState = (state) => {
  try{
    localStorage.setItem('sate', JSON.stringify(state.present));
  }catch(err){

  }
}


const store = createStore(undoable(todoApp), loadState());

const TodosApp = ({ todoNotes, visibilityFilter, notes }) => (
  <div>
    <div>
      <div class="generalFilter">
        <GeneralFooter
          currentVisibilityFilter={ visibilityFilter }
          onFilterClicked={
            (filter) => {
              store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                payload: { 
                  visibilityFilter: filter,
                  search: ''
                }
              });
            }
          } />
      </div>
      <div class="search">
        <Search
          currentVisibilityFilter={ visibilityFilter }
          setSearch={
            (search) => {
              store.dispatch({
                type: 'SET_SEARCH',
                payload: {
                  search: search,
                  visibilityFilter: visibilityFilter.visibilityFilter
                }
              })
            }
          } />
        </div>
    </div>
    <div class="clear"></div>
    <div>
      <div class="addNote">
        <AddTodoNote
          onAddNote={
            (title) => {
              store.dispatch({
                type: 'ADD_TODO_NOTE',
                payload: {
                  id: v4(),
                  title: title,
                  visibilityFilter: 'SHOW_ALL',
                  color: '#FFFF00',
                  deleted: false,
                  createdAt: Date(),
                  modifiedAt: Date()
                }
              });
            }
          }>Agregar Nota de todos</AddTodoNote>
      </div>
      <div class="addNote">
        <AddNote
          onAddNote={
            (title) => {
              store.dispatch({
                type: 'ADD_NOTE',
                payload: {
                  id: v4(),
                  title: title,
                  color: '#FFFF00',
                  text: "",
                  deleted: false,
                  createdAt: Date(),
                  modifiedAt: Date()
                }
              });
            }
          }>Agregar Nota</AddNote>
        </div>
        <button class="addNote" onClick={
          () => {
            store.dispatch(ActionCreators.undo());
          }
      }>undo</button>
      </div>
      <div class="clear"></div>
    <TodoNotesList 
      todoNotes={ getVisibleElements(todoNotes, visibilityFilter, 'TODO') }
      onAddTodo={
          (text,noteId) => {
            store.dispatch({
              type: 'ADD_TODO',
              payload: {
                id: v4(),
                text: text,
                noteId: noteId
              }
            });
          }
        }
      setDeleted={
        (deleted, noteId) => {
          store.dispatch({
            type: 'SET_NOTE_TODO_DELETED',
            payload: {
              deleted: deleted,
              noteId: noteId
            }
          });
        }
      }
      onTodoClicked={
        (todo, noteId) => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            payload: {
              id: todo.id,
              noteId: noteId
            }
          });
       }
      }
      onDelete={
        (todo, noteId) => {
          store.dispatch({
            type: 'DELETE_TODO',
            payload: {
              id: todo.id,
              noteId: noteId
            }
          });
        }
      }
      onFilterClicked={
        (filter, noteId) => {
          store.dispatch({
            type: 'SET_TODO_VISIBILITY_FILTER',
            payload: { 
              noteId: noteId,
              visibilityFilter: filter 
            }
          });
        }
      } 
      setColor={
        (color, noteId) => {
          store.dispatch({
            type: 'SET_COLOR',
            payload: {
              color: color,
              noteId: noteId
            }
          });
        }
      }
      setModifiedAt={
        (date, noteId) => {
          store.dispatch({
            type: 'SET_TODO_NOTE_MODIFIED_AT',
            payload: {
              modifiedAt: date,
              noteId: noteId
            }
          });
        }
      }/>

    <NotesList 
      notes={ getVisibleElements(notes,visibilityFilter, 'SHOW_NOTE') } 
      setColor={
        (color, noteId) => {
          store.dispatch({
            type: 'SET_NOTE_COLOR',
            payload: {
              color: color,
              noteId: noteId
            }
          });
        }
      }
      setText={
        (text, noteId) => {
          store.dispatch({
            type: 'SET_NOTE_TEXT',
            payload: {
              text: text,
              noteId: noteId
            }
          });
        }
      }
      setDeleted={
        (deleted, noteId) => {
          store.dispatch({
            type: 'SET_NOTE_DELETED',
            payload: {
              deleted: deleted,
              noteId: noteId
            }
          });
        }
      }
      setModifiedAt={
        (date, noteId) => {
          store.dispatch({
            type: 'SET_MODIFIED_AT',
            payload: {
              modifiedAt: date,
              noteId: noteId
            }
          });
        }
      }/>
  </div>
);


const render = () => {
  ReactDOM.render(
    <TodosApp
      { ...store.getState().present } />,
    document.getElementById('root')
  );
    console.log(store.getState());

 };

render();
store.subscribe(render);

store.subscribe(() => {
  saveState(store.getState());
});
